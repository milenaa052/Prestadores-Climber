import { Request, Response } from "express"
import { cnpj } from "cpf-cnpj-validator"
import ProviderModel from "../models/ProviderModel.js"

export const getProviders = async (req: Request, res: Response) => {
    const providers = await ProviderModel.findAll();
    return res.status(200).send(providers);
}

export const getProviderById = async (req: Request<{id: string}>, res: Response) => {
    const provider = await ProviderModel.findByPk(req.params.id);
    return res.status(200).json(provider);
}

export const createProvider = async (req: Request, res: Response) => {
    try {
        const { 
            addressId,
            name, 
            cnpjProvider, 
            phone,
            email, 
            password,
            photUrl,
            biography,
            linkedin,
            instagram,
            validatedEmail,
            emailValidationToken,
            savedLogin
        } = req.body;
    
        if(!name || !cnpjProvider || !phone || !email || !password) {
            return res.status(400)
                .json({error: "All fields are required"})
        }

        if (!cnpj.isValid(cnpjProvider)) {
            return res.status(400)
                .json({error: "invalid or non-existent CNPJ"})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(email)) {
            return res.status(400)
                .json({ error: "Invalid email" })
        }

        const validatePasswordLevel =  ProviderModel.validatePasswordLevel(password)
        if (!validatePasswordLevel.validate) {
            return res.status(400).json({ 
                error: "Password too weak",
                details: validatePasswordLevel.requirements
            })
        }

        const provider = await ProviderModel.create({ 
            addressId,
            name, 
            cnpj: cnpjProvider, 
            phone,
            email, 
            password,
            photUrl,
            biography,
            status: "ACTIVE",
            linkedin,
            instagram,
            validatedEmail,
            emailValidationToken,
            savedLogin
        });

        return res.status(201).json(provider);

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const updateProvider = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const loggedInProvider = res.locals.user.idProvider;
        const idProviderUpdate = Number(req.params.id);

        if (Number(loggedInProvider) !== idProviderUpdate) {
            return res.status(403).json({ error: "You do not have permission to edit this user" })
        }

        const { 
            addressId,
            name, 
            cnpjProvider, 
            phone,
            email, 
            currentPassword, 
            newPassword,
            photUrl,
            biography,
            status,
            linkedin,
            instagram,
            validatedEmail,
            emailValidationToken,
            savedLogin
        } = req.body;

        if(!name || !cnpjProvider || !phone || !status) {
            return res.status(400)
                .json({error: "All fields are required"})
        }

        if (status !== 'ACTIVE' && status !== 'INACTIVE') {
            return res.status(400).json({ error: "Invalid status. Must be 'ACTIVE' or 'INACTIVE'." });
        }

        const provider = await ProviderModel.findByPk(req.params.id);
        if(!provider) {
            return res.status(404)
                .json({error: "Provider not found"})
        }

        if (email && email !== provider.email) {
            return res.status(400).json({ message: "Changing the email is not allowed." })
        }

        if (!cnpj.isValid(cnpjProvider)) {
            return res.status(400)
                .json({error: "invalid or non-existent CNPJ"})
        }

        provider.addressId = addressId;
        provider.name = name;
        provider.cnpj = cnpjProvider;
        provider.phone = phone;
        provider.photUrl = photUrl;
        provider.biography = biography;
        provider.status = status;
        provider.linkedin = linkedin;
        provider.instagram = instagram;
        provider.validatedEmail = validatedEmail;
        provider.emailValidationToken = emailValidationToken;
        provider.savedLogin = savedLogin;

        if (currentPassword && newPassword) {
            const correctPassword = await provider.validatePassword(currentPassword)

            if (!correctPassword) {
                return res.status(401).json({ error: "Incorrect current password" })
            }

            const validatePasswordLevel = ProviderModel.validatePasswordLevel(newPassword)

            if (!validatePasswordLevel.validate) {
                return res.status(400).json({ 
                    error: "Password too weak",
                    details: validatePasswordLevel.requirements
                })
            }

            provider.password = newPassword;
        }

        await provider.save();

        return res.status(200).json(provider);

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}
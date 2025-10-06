import { Request, Response } from "express"
import { cpf } from "cpf-cnpj-validator"
import ContractorModel from "../models/ContractorModel.js"

export const getContractor = async (req: Request, res: Response) => {
    const contractors = await ContractorModel.findAll();
    return res.status(200).send(contractors);
}

export const getContractorById = async (req: Request<{id: string}>, res: Response) => {
    const contractors = await ContractorModel.findByPk(req.params.id);
    return res.status(200).json(contractors);
}

export const createContractor = async (req: Request, res: Response) => {
    try {
        const { 
            addressId,
            name, 
            cpfContractor, 
            phone,
            email, 
            password,
            photUrl,
            validatedEmail,
            emailValidationToken,
            savedLogin
        } = req.body;
    
        if(!name || !cpfContractor || !phone || !email || !password) {
            return res.status(400)
                .json({error: "All fields are required"})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(email)) {
            return res.status(400)
                .json({ error: "Invalid email" })
        }

        const validatePasswordLevel =  ContractorModel.validatePasswordLevel(password)
        if (!validatePasswordLevel.validate) {
            return res.status(400).json({ 
                error: "Password too weak",
                details: validatePasswordLevel.requirements
            })
        }

        if (!cpf.isValid(cpfContractor)) {
            return res.status(400)
                .json({error: "invalid or non-existent CPF"})
        }

        const contractors = await ContractorModel.create({ 
            addressId,
            name, 
            cpf: cpfContractor, 
            phone,
            email,
            password,
            photUrl,
            status: "ACTIVE",
            validatedEmail,
            emailValidationToken,
            savedLogin
        });

        return res.status(201).json(contractors);

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const updateContractor = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const loggedInContractor = res.locals.user.idContractor
        const idContractorUpdate = Number(req.params.id)

        if (Number(loggedInContractor) !== idContractorUpdate) {
            return res.status(403).json({ error: "You do not have permission to edit this user" })
        }

        const { 
            addressId,
            name, 
            cpfContractor, 
            phone,
            email, 
            currentPassword, 
            newPassword,
            photUrl,
            status,
            validatedEmail,
            emailValidationToken,
            savedLogin
        } = req.body;

        if(!name || !cpfContractor || !phone || !status) {
            return res.status(400)
                .json({error: "All fields are required"})
        }

        if (status !== 'ACTIVE' && status !== 'INACTIVE') {
            return res.status(400).json({ error: "Invalid status. Must be 'ACTIVE' or 'INACTIVE'." });
        }

        const contractors = await ContractorModel.findByPk(req.params.id);
        if(!contractors) {
            return res.status(404)
                .json({error: "Contractor not found"})
        }

        if (email && email !== contractors.email) {
            return res.status(400).json({ message: "Changing the email is not allowed." })
        }

        if (!cpf.isValid(cpfContractor)) {
            return res.status(400)
                .json({error: "invalid or non-existent CPF"})
        }

        contractors.addressId = addressId;
        contractors.name = name;
        contractors.cpf = cpfContractor;
        contractors.phone = phone;
        contractors.photUrl = photUrl;
        contractors.status = status;
        contractors.validatedEmail = validatedEmail;
        contractors.emailValidationToken = emailValidationToken;
        contractors.savedLogin = savedLogin;

        if (currentPassword && newPassword) {
            const correctPassword = await contractors.validatePassword(currentPassword);
            if (!correctPassword) {
                return res.status(401).json({ error: "Incorrect current password" })
            }

            const validatePasswordLevel = ContractorModel.validatePasswordLevel(newPassword);
            if (!validatePasswordLevel.validate) {
                return res.status(400).json({ 
                    error: "Password too weak",
                    details: validatePasswordLevel.requirements
                })
            }

            contractors.password = newPassword;
        }

        await contractors.save();

        return res.status(200).json(contractors);

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}
import { Request, Response } from "express"
import AdminModel from "../models/AdminModel.js"

export const getAdmin = async (req: Request, res: Response) => {
    const admin = await AdminModel.findAll();
    return res.status(200).send(admin);
};

export const getAdminById = async (req: Request<{ id: string }>, res: Response) => {
    const admin = await AdminModel.findByPk(req.params.id);
    return res.status(200).json(admin);
};

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { name, phone, email, password } = req.body;

        if (!name || !phone || !email || !password) {
            return res.status(400)
                .json({ error: "All fields are required" })
        };

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(email)) {
            return res.status(400)
                .json({ error: "Invalid email" })
        };

        const validatePasswordLevel = AdminModel.validatePasswordLevel(password)
        if (!validatePasswordLevel.validate) {
            return res.status(400).json({
                error: "Password too weak",
                details: validatePasswordLevel.requirements
            });
        };

        const admin = await AdminModel.create({
            name,
            phone,
            email,
            password,
            status: "ACTIVE"
        });

        return res.status(201).json(admin);
    } catch (error) {
        return res.status(500).json("Internal server error " + error);
    }
}

export const updateAdmin = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const loggedInAdmin = res.locals.user.idAdmin;
        const idAdminUpdate = Number(req.params.id);

        if (Number(loggedInAdmin) !== idAdminUpdate) {
            return res.status(403).json({ error: "You do not have permission to edit this user" })
        };

        const {
            name,
            phone,
            email,
            currentPassword,
            newPassword,
            status
        } = req.body;

        if (!name || !phone) {
            return res.status(400)
                .json({ error: "All fields are required" })
        };

        if (status !== 'ACTIVE' && status !== 'INACTIVE') {
            return res.status(400).json({ error: "Invalid status. Must be 'ACTIVE' or 'INACTIVE'." });
        }

        const admin = await AdminModel.findByPk(req.params.id);

        if (!admin) {
            return res.status(404)
                .json({ error: "Admin not found" })
        };

        if (email && email !== admin.email) {
            return res.status(400).json({ message: "Changing the email is not allowed." })
        };

        admin.name = name;
        admin.phone = phone;
        admin.status = status;

        if (currentPassword && newPassword) {
            const correctPassword = await admin.validatePassword(currentPassword);

            if (!correctPassword) {
                return res.status(401).json({ error: "Incorrect current password" })
            };

            const validatePasswordLevel = AdminModel.validatePasswordLevel(newPassword);

            if (!validatePasswordLevel.validate) {
                return res.status(400).json({
                    error: "Password too weak",
                    details: validatePasswordLevel.requirements
                });
            };

            admin.password = newPassword;
        }

        await admin.save();
        await admin.reload();

        return res.status(200).json(admin);

    } catch (error) {
        return res.status(500).json("Internal server error " + error);
    }
}
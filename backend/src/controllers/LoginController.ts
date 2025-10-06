import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import AdminModel from "../models/AdminModel.js"
import ContractorModel from "../models/ContractorModel.js"
import ProviderModel from "../models/ProviderModel.js"
import { generateTokenAdmin, generateTokenContractor, generateTokenProvider } from "../utils/jwt.js"

dotenv.config();

type UserRole = "admin" | "contractor" | "provider";

interface AuthenticatedUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    token: string;
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        const userAdmin = await AdminModel.findOne({ where: { email } });
        if (userAdmin) {
            const valid = await userAdmin.validatePassword(password);
            if (!valid) return res.status(401).json({ error: "Invalid credentials" });

            const token = generateTokenAdmin(userAdmin);

            const authenticated: AuthenticatedUser = {
                id: userAdmin.idAdmin,
                name: userAdmin.name,
                email: userAdmin.email,
                role: "admin",
                token
            };

            return res.status(200).json({
                mensagem: "Login successfully",
                ...authenticated
            });
        }

        const userContractor = await ContractorModel.findOne({ where: { email } });
        if (userContractor) {
            const valid = await userContractor.validatePassword(password);
            if (!valid) return res.status(401).json({ error: "Invalid credentials" });

            const token = generateTokenContractor(userContractor);

            const authenticated: AuthenticatedUser = {
                id: userContractor.idContractor,
                name: userContractor.name,
                email: userContractor.email,
                role: "contractor",
                token
            };

            return res.status(200).json({
                mensagem: "Login successfully",
                ...authenticated
            });
        }

        const userProvider = await ProviderModel.findOne({ where: { email } });
        if (userProvider) {
            const valid = await userProvider.validatePassword(password);
            if (!valid) return res.status(401).json({ error: "Invalid credentials" });

            const token = generateTokenProvider(userProvider);

            const authenticated: AuthenticatedUser = {
                id: userProvider.idProvider,
                name: userProvider.name,
                email: userProvider.email,
                role: "provider",
                token
            };

            return res.status(200).json({
                mensagem: "Login successfully",
                ...authenticated
            });
        }

        return res.status(404).json({ error: "User not found" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error " + error });
    }
};

export const loggedinUser = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token not provided or poorly formatted" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token not provided" })
    }

    const secret = process.env.JWT_SECRETS as string;

    if (!secret) {
        return res.status(500).json({ error: "JWT secret not configured" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        
        return res.status(200).json({
            mensagem: "User successfully authenticated",
            user: decoded
        });
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
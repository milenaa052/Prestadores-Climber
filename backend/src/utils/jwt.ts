import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import AdminModel from "../models/AdminModel.js"
import ContractorModel from "../models/ContractorModel.js"
import ProviderModel from "../models/ProviderModel.js"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRETS as string
const JWT_EXPIRES_IN = "7d"

export const generateTokenAdmin = (admin: AdminModel): string => {
    const payload = {
        role: "admin",
        idAdmin: admin.idAdmin,
        name: admin.name,
        email: admin.email
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const generateTokenContractor = (contractor: ContractorModel): string => {
    const payload = {
        role: "contractor",
        idContractor: contractor.idContractor,
        name: contractor.name,
        email: contractor.email
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const generateTokenProvider = (provider: ProviderModel): string => {
    const payload = {
        role: "provider",
        idProvider: provider.idProvider,
        name: provider.name,
        email: provider.email
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) 
}
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import AdminModel from "../models/AdminModel.js"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRETS as string
const JWT_EXPIRES_IN = "7d"

export const generateTokenAdmin = (admin: AdminModel): string => {
    const payload = {
        idAdmin: admin.idAdmin,
        name: admin.name,
        email: admin.email
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) 
}
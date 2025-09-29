import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import AdminModel from "../models/AdminModel.js"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRETS
const JWT_EXPIRES_IN = "7d"

export const generateToken = (Admin)=> {
    const payload = {
        idAdmin: Admin.idAdmin,
        name: Admin.name,
        email: Admin.email,
        AdminType: Admin.type
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET) 
}
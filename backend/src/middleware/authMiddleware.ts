import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized access - Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access - Token missing" });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ error: "Unauthorized access - Invalid token" });
    }
};import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized access - Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access - Token missing" });
    }

    try {
        const decoded = verifyToken(token);
        req.Admin = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ error: "Unauthorized access - Invalid token" });
    }
};
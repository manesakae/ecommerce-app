import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decode;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }
}
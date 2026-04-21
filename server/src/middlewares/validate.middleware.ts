import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err: any) {
            res.status(400).json({
                message: "Validation failed",
                errors: err.errors,
            });
        }
    };
};
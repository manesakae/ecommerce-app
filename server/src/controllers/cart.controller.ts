import { Request, Response } from "express";
import { getCart, saveCart } from "../services/cart.service";

export const getUserCart = async (req: Request, res: Response) => {
    try {
        const cart = await getCart(req.user.id as string);
        res.json(cart);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
};

export const updateUserCart = async (req: Request, res: Response) => {
    try {
        const cart = await saveCart(req.user.id as string, req.body.items);
        res.json(cart);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

import { Request, Response } from "express";
import { createProduct, getProducts, getProduct } from './../services/product.service';

export const create = async (req: Request, res: Response) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const products = await getProducts(req.query);
        res.json(products);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const product = await getProduct(req.params.id as string);
        res.json(product);
    } catch (err: any) {
        res.status(404).json({ message: err.message })
    }
}
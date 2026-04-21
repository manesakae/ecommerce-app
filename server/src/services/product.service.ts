import { Product } from "../models/product.model";

export const createProduct = async (data: any) => {
    const product = await Product.create(data);
    return product;
}

export const getProducts = async (query: any) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.category) {
        filter.category = query.category;
    }
    if (query.minPrice && query.maxPrice) {
        filter.price = {
            $gte: Number(query.minPrice),
            $lte: Number(query.maxPrice)
        };
    }
    const products = await Product.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Product.countDocuments(filter);
    return {
        products,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
}

export const getProduct = async (id: string) => {
    const product = await Product.findById(id);
    return product;
}
import { Cart } from "../models/cart.model";

export const getCart = async (userId: string) => {
    return await Cart.findOne({ user: userId });
};

export const saveCart = async (userId: string, items: any[]) => {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
        cart.items = items;
        await cart.save();
    } else {
        cart = await Cart.create({ user: userId, items });
    }

    return cart;
};

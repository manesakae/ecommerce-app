import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        items: [
            {
                productId: String,
                name: String,
                price: Number,
                quantity: Number,
            }
        ]
    },
    { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);

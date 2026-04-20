import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        category: { type: String },
        description: { type: String }
    }
);

export const Product = mongoose.model("Product", productSchema);
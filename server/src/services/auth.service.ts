import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";


export const registerUser = async (data: any) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
}

export const loginUser = async (email: string, password: string) => {
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    //check is password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }
    // generate token
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET as string, { expiresIn: "1d" }
    )
    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            name: user.name
        }
    }
}
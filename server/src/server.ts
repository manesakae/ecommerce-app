import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"]
// }));

app.use(cors());

app.use(express.json());

app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

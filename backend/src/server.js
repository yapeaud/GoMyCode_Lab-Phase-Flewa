import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import flewaRoutes from "./routes/flewa.route.js";

import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // autorise les cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", flewaRoutes);


app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port http://localhost:${PORT}`); 
    connectDB();  
});
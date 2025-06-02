import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port http://localhost:${PORT}`); 
    connectDB();  
});
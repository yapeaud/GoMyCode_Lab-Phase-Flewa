import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getFlewaToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", protectRoute, getFlewaToken);

export default router;
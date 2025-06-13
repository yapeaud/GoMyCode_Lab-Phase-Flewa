import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyDjavoues, sendDjavoueRequest, acceptDjavoueRequest, getDjavoueRequests, getOutgoingDjavoueReqs } from "../controllers/user.controller.js";

const router = express.Router();

// appliquer l'intergiciel d'authentification à tous les itinéraires
router.use(protectRoute);

router.get('/', getRecommendedUsers);
router.get("/djavoues", getMyDjavoues);

router.post("/djavoue-request/:id", sendDjavoueRequest);
router.put("/djavoue-request/:id/accept", acceptDjavoueRequest);

router.get("/djavoue-requests", getDjavoueRequests);
router.get("/outgoing-djavoue-requests", getOutgoingDjavoueReqs);

export default router;
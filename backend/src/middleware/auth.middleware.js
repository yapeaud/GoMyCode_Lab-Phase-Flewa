import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const protectRoute = async (req, res, next) => {
    try { 
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Non autorisé - Aucun jeton fourni"});
        }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({message: "Non autorisé - Jeton invalide"});
        }

        const user = await User.findById(decode.userID).select("-password");

        if(!user){
            return res.status(401).json({message: "Non autorisé - Utilisateur introuvable"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Erreur dans le middleware protectRoute", error);
        res.status(500).json({message: "Erreur interne du serveur"});
        
    }
}
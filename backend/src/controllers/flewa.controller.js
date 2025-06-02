import { generateFlewaToken } from "../lib/flewa.js";

export const getFlewaToken = async (req, res)=> {
    try {
        const token = generateFlewaToken(req.user.id);

        res.status(200).json({ token });
    } catch (error) {
        console.log("Erreur dans le contrôleur getFleawaToken:", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
}
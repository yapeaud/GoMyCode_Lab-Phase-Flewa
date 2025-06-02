
import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.FLEWA_API_KEY;
const apiSecret = process.env.FLEWA_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("Flewa API key or secret is not defined. Please check your environment variables.");

}

const flewaClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertFlewaUser = async (userData) => {
    try {
        await flewaClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("Erreur d'insertion de l'utilisateur Flewa:", error);

    }
};

export const generateFlewaToken = (userId) => {
    try {
        // s'assurer que userId est une chaîne de caractères
        const userIdStr = userId.toString();
        return flewaClient.createToken(userIdStr);
    } catch (error) {
        console.error("Erreur lors de la generation du token:", error);
    }
};

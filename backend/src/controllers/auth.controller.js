import { upsertFlewaUser } from "../lib/flewa.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Le mot de passe doit avoir au moins 6 caractères" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "L'adresse email est invalide" });
        }

        const exitingUser = await User.findOne({ email });

        if (exitingUser) {
            return res.status(400).json({ message: "L'email existe déjà, veuillez utiliser un autre email." });
        }

        const idx = Math.floor(Math.random() * 100) + 1; // Générer un nombre aléatoire entre 1 et 100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePicture: randomAvatar
        })

        try {
            await upsertFlewaUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePicture || "",
            });
            console.log(`L'utilisateur Flewa créé pour ${newUser.fullName}`);
        } catch (error) {
            console.log("Erreur lors de la création de l'utilisateur Flewa:", error);
        }

        const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prévenir les attaques XSS
            secure: process.env.NODE_ENV === "production", // 
            sameSite: "strict"// prévenir les attaques CSRF
        });

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.log("Erreur dans le contrôleur d'inscription:", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Email incorrect" });
        }

        const isPasswordCorrect = await user.matchPassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        };

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prévenir les attaques XSS
            secure: process.env.NODE_ENV === "production", // 
            sameSite: "strict"// prévenir les attaques CSRF
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Erreur dans le contrôleur de connexion:", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la connexion." });

    }
};
export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Deconnexion avec success" });
};

export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const { fullName, bio, location } = req.body;

        if (!fullName || !bio || !location) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !location && "location"
                ].filter(Boolean),
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true,
        }, { new: true });

        if(!updatedUser) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        try {
            await upsertFlewaUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePicture || "",
            });
            console.log(`L'utilisateur Flewa mis à jour pour ${updatedUser.fullName}`);
        } catch (flewaError) {
            console.log("Erreur lors de la mise à jour de l'utilisateur Flewa:", flewaError);
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.log("Onboarding erreur:", error);
        res.status(500).json({ message: "Erreur interne du serveur." });

    }
};
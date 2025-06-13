import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, //exclure l'utilisateur actuel
                { _id: { $nin: currentUser.djavoues } }, // exclure les amis de l'utilisateur actuel
                { isOnboarded: true },
            ],
        });
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Erreur dans le contrôle getRecommendedUsersr", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
};

export const getMyDjavoues = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("djavoues")
            .populate("djavoues", "fullName profilePicture");

        res.status(200).json(user.djavoues);
    } catch (error) {
        console.error("Erreur dans le contrôle getMyDjavoues ", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
};

export const sendDjavoueRequest = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        // éviter d'envoyer une demande à soi-même
        if (myId === recipientId) {
            return res.status(400).json({ message: "Vous ne pouvez pas vous envoyer de demande d'amitié à vous-même" });
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Destinataire non trouvé" });
        }

        // vérifier si l'utilisateur est déjà ami
        if (recipient.djavoues.includes(myId)) {
            return res.status(400).json({ message: "Vous êtes déjà ami avec cet utilisateur" });
        }

        // vérifier si une demande existe déjà
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId },
            ],
        });

        if (existingRequest) {
            return res
                .status(400)
                .json({ message: "Une demande d'amitié existe déjà entre vous et cet utilisateur" });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(friendRequest);
    } catch (error) {
        console.error("Erreur dans le contrôleur sendDjavoueRequest", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
};

export const acceptDjavoueRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Demande d'amitié introuvable" });
        }

        // Vérifier que l'utilisateur actuel est le destinataire
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à accepter cette demande d'amitié" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // ajouter chaque utilisateur au tableau d'amis de l'autre
        // $addToSet : ajoute des éléments à un tableau uniquement s'ils n'existent pas déjà.
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { djavoues: friendRequest.recipient },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { djavoues: friendRequest.sender },
        });

        res.status(200).json({ message: "Demande d'amitié acceptée" });
    } catch (error) {
        console.log("Erreur dans le contrôleur acceptFriendRequest", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
};

export const getDjavoueRequests = async (req, res) => {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePicture");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePicture");

        res.status(200).json({ incomingReqs, acceptedReqs });
    } catch (error) {
        console.log("Erreur dans le contrôleur getDjavoueRequests", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
};

export const getOutgoingDjavoueReqs = async (req, res) => {
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePicture");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("Erreur dans le contrôleur getOutgoingDjavoueReqs", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
};
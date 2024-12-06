const Chat = require("../models/Chat");

// const getChats = async (req, res) => {
//     try {
//         const chats = await Chat.find({});
//         res.status(200).json(chats);
//     } catch (error) {
//         console.error("Error fetching chats:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// const createChat = async (req, res) => {
//     try {
//         const { firstName, lastName } = req.body;
//         if (!firstName || !lastName) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         const newChat = new Chat({ firstName, lastName });
//         await newChat.save();
//         res.status(201).json(newChat);
//     } catch (error) {
//         console.error("Error creating chat:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// const deleteChat = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedChat = await Chat.findByIdAndDelete(id);
//         if (!deletedChat) {
//             return res.status(404).json({ message: "Chat not found" });
//         }

//         res.status(204).send();
//     } catch (error) {
//         console.error("Error deleting chat:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// const getChat = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const chat = await Chat.findById(id);
//         if (!chat) {
//             return res.status(404).json({ message: "Chat not found" });
//         }

//         res.status(200).json(chat);
//     } catch (error) {
//         console.error("Error fetching chat:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// const editChat = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const updatedChat = await Chat.findByIdAndUpdate(id, req.body, {
//             new: true,
//         });
//         if (!updatedChat) {
//             return res.status(404).json({ message: "Chat not found" });
//         }

//         res.status(200).json(updatedChat);
//     } catch (error) {
//         console.error("Error editing chat:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

const getChats = async (req, res) => {
    try {
        const chats = await Chat.find({});
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createChat = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const newChat = new Chat({ firstName, lastName });
        newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteChat = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChat = await Chat.findByIdAndDelete(id);
        res.send({ message: "Chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getChat = async (req, res) => {
    const { id } = req.params;
    try {
        const chat = await Chat.findById(id);
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editChat = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            id,
            req.body,
            { new: true} 
        );
        res.send(updatedChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getChats, createChat, deleteChat, editChat, getChat };

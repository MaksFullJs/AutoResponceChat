const Message = require("../models/Message");
const Chat = require("../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;


const createMessage = async (req, res) => {
    try {
        const { chatId, sender, text } = req.body;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        const newMessage = new Message({
            chatId,
            sender,
            text,
        });
        const savedMessage = await newMessage.save();
        chat.messages.push(savedMessage._id);
        await chat.save();
        res.json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await Message.find({ chatId: new ObjectId(id) });
        res.status(201).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findById(id);
        res.json(message);
    } catch (error) {
        res.json({ error: error.message });
    }
};

const editMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMessage = await Message.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.send(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createMessage, getMessages, getMessage, editMessage };

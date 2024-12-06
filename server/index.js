const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Chat = require("./models/Chat");
const Message = require("./models/Message");
const { getRandomQuote } = require("./randomQuote/quote");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);
app.use("/api", messageRoutes);

const url =
    "mongodb+srv://root:rootUser@cluster0.flxlo.mongodb.net/ChatProject?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to MongoDB Atlas!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err.message);
    });

const server = createServer(app);

const io = new Server(server, { cors: "http://localhost:3000" });

const PORT = process.env.PORT || 5020;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

io.on("connection", (socket) => {
    console.log("new connection:", socket.id);

    socket.on("sendRespondToHelloMessage", (chat, message) => {
        setTimeout(async () => {
            try {
                const quoteRes = message || getRandomQuote();
                const currChat = await Chat.findById(chat._id);
                const botMessage = new Message({
                    chatId: chat._id,
                    sender: "bot",
                    text: quoteRes,
                });
                const savedBotMessage = await botMessage.save();
                if (currChat) {
                    currChat.messages.push(savedBotMessage._id);
                    await currChat.save();
                }
                socket.emit("newMessage", savedBotMessage, chat);
            } catch (err) {
                console.error(
                    "Error creating or sending message:",
                    err.message
                );
            }
        }, 3000);
    });

    socket.on("sendAutoMessage", (chat) => {
        setTimeout(async () => {
            try {
                const quoteRes = getRandomQuote();
                const currChat = await Chat.findById(chat._id);
                const botMessage = new Message({
                    chatId: chat._id,
                    sender: "bot",
                    text: quoteRes,
                });
                const savedBotMessage = await botMessage.save();
                if (currChat) {
                    currChat.messages.push(savedBotMessage._id);
                    await currChat.save();
                }
                socket.emit("newMessage", savedBotMessage, chat);
            } catch (err) {
                console.error(
                    "Error creating or sending message:",
                    err.message
                );
            }
        }, 3000);
    });
});

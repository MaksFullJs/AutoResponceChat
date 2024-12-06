const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/chat/:id/messages", messageController.createMessage);

router.get("/chat/:id/messages", messageController.getMessages);

router.get("/chat/message/:id", messageController.getMessage);

router.put("/chat/message/:id", messageController.editMessage);

module.exports = router;

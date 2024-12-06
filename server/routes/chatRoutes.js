const express = require('express');
const chatController = require('../controllers/chatController')

const router = express.Router();

router.get('/chats', chatController.getChats);

router.post('/chats', chatController.createChat)

router.delete('/chat/:id', chatController.deleteChat)

router.get('/chat/:id', chatController.getChat)

router.put('/chat/:id', chatController.editChat)

module.exports = router;
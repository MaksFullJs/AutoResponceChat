const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: String, required: true },
    text: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
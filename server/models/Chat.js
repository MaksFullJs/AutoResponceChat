const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
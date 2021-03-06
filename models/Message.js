const mongoose = require('mongoose');
const { SUPERVISOR, HOUSE_CAPTAIN, COORDINATOR, EVENT_COORDINATOR, PARTICIPANT } = require('../utils/strings');

const MessageSchema =  new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true
        },
        receiver: {
            type: String,
            required: true,
            enum: [SUPERVISOR, HOUSE_CAPTAIN, COORDINATOR, EVENT_COORDINATOR, PARTICIPANT]
        },
        text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
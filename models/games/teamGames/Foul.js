const mongoose = require('mongoose');

const FoulSchema = new mongoose.Schema(
    {
        time: {
            type: String,
            required: true
        },
        byPlayer: {
            type: mongoose.Types.ObjectId,
            ref: 'Player',
            required: true
        },
        eventId: {
            type: mongoose.Types.ObjectId,
            refPath: 'onModel'
        }
    }
)

const Foul = mongoose.model('Foul', FoulSchema);
module.exports = Foul;
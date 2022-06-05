const mongoose = require('mongoose');

const FoulSchema = new mongoose.Schema(
    {
        time: {
            type: Date,
            required: true
        },
        byPlayer: {
            type: mongoose.Types.ObjectId,
            ref: 'Player',
            required: true
        }
    }
)

const Foul = mongoose.model('Foul', FoulSchema);
module.exports = Foul;
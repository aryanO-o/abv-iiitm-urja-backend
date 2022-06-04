const mongoose = require('mongoose');

const FoulSchema = new mongoose.Schema(
    {
        time: {
            type: 'string',
            required: true
        },
        byJersey: {
            type: Number,
            required: true
        }
    }
)

const Foul = mongoose.model('Foul', FoulSchema);
module.exports = Foul;
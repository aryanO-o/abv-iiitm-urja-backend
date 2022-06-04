const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema(
    {
        jerseyNo: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        }
    }
)

const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;
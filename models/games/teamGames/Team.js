const mongoose = require('mongoose');
const Player = require('../Player');

const TeamSchema = new mongoose.Schema(
    {
        players: [{
            type: mongoose.Types.ObjectId,
            ref: 'Player'
        }],
        houseName: {
            type: String,
            required: true
        }
    }
)

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
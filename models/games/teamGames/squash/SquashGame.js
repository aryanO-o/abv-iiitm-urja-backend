const mongoose = require('mongoose');
const Team = require('../Team');

const SquashGameSchema = mongoose.Schema(
    {
        sets: [{
            type: mongoose.Types.ObjectId,
            ref: 'Goal'
        }],
        teamA: {
            type: mongoose.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        teamB: {
            type: mongoose.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        winner: {
            type: mongoose.Types.ObjectId,
            ref: 'Team'
        },
        teamAScore: Number,
        teamBScore: Number
        
    }
)

const SquashGame = mongoose.model('SquashGame', SquashGameSchema);
module.exports = SquashGame;
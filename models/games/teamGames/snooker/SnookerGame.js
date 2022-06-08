const mongoose = require('mongoose');
const Team = require('../Team');

const SnookerGameSchema = mongoose.Schema(
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

const SnookerGame = mongoose.model('SnookerGame', SnookerGameSchema);
module.exports = SnookerGame;
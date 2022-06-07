const mongoose = require('mongoose');
const Team = require('../Team');

const LawnTennisGameSchema = mongoose.Schema(
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

const LawnTennisGame = mongoose.model('LawnTennisGame', LawnTennisGameSchema);
module.exports = LawnTennisGame;
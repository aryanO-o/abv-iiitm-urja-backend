const mongoose = require('mongoose');
const Team = require('../Team');

const VolleyballGameSchema = mongoose.Schema(
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

const VolleyballGame = mongoose.model('VolleyballGame', VolleyballGameSchema);
module.exports = VolleyballGame;
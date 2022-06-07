const mongoose = require('mongoose');
const Team = require('../Team');

const TableTennisGameSchema = mongoose.Schema(
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

const TableTennisGame = mongoose.model('TableTennisGame', TableTennisGameSchema);
module.exports = TableTennisGame;
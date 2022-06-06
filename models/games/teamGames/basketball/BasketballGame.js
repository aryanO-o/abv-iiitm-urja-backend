const mongoose = require('mongoose');
const Team = require('../Team');
const Basket = require('./Basket');

const BasketballGameSchema = mongoose.Schema(
    {
        baskets: [{
            type: mongoose.Types.ObjectId,
            ref: 'Basket'
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

const BasketballGame = mongoose.model('BasketballGame', BasketballGameSchema);
module.exports = BasketballGame;
const mongoose = require('mongoose');
const Team = require('../Team');
const Basket = require('./Basket');

const BasketballGameSchema = mongoose.Schema(
    {
        basket: [{
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
        }
    }
)

const BasketballGame = mongoose.model('BasketballGame', BasketballGameSchema);
module.exports = BasketballGame;
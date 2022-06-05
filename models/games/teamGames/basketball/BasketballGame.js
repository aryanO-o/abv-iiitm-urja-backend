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

//TODO: add team a score and team B score because i need to give the facility to set final scores without entering minor details.

const BasketballGame = mongoose.model('BasketballGame', BasketballGameSchema);
module.exports = BasketballGame;
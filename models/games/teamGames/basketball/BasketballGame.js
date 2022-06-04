const mongoose = require('mongoose');
const Team = require('../Team');
const Basket = require('./Basket');

const BasketballGameSchema = mongoose.Schema(
    {
        game_id:{
            type: String
        },
        basket: {
            type: [Basket]
        },
        teamA: {
            type: Team,
            required: true
        },
        teamB: {
            type: Team,
            required: true
        },
        winner: {
            type: String
        }
    }
)

const BasketballGame = mongoose.model('BasketballGame', BasketballGameSchema);
module.exports = BasketballGame;
const mongoose = require('mongoose');
const GameInfo = require('./GameInfo');
const Team = require('./teamGames/Team');

const GameSchema = new mongoose.Schema(
    {
        gameName: String,
        gameTitle: String,
        winningTeam: String,
        gameInfo: {
            type: mongoose.Types.ObjectId,
            ref: 'GameInfo'
        },
        game_id:{
            type: mongoose.Types.ObjectId,
            refPath: 'onModel'
        },
    }
)

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;
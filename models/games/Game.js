const mongoose = require('mongoose');
const GameInfo = require('./GameInfo');
const Team = require('./teamGames/Team');

const GameSchema = new mongoose.Schema(
    {
        gameName: String,
        gameTitle: String,
        gameInfo: GameInfo,
        winningTeam: String
    }
)

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;
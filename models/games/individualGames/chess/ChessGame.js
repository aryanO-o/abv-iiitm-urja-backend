const mongoose = require('mongoose');

const ChessGameSchema = mongoose.Schema(
    {
        playerA:{
            type: String,
            required: true
        },
        playerB:{
            type: String,
            required: true
        },
        winner:{
            type: String
        }
    }
)


const ChessGame = mongoose.model('ChessGame', ChessGameSchema);
module.exports = ChessGame;
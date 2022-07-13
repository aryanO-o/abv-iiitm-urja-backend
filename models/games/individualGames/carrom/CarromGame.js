const mongoose = require('mongoose');

const CarromGameSchema = mongoose.Schema(
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


const CarromGame = mongoose.model('CarromGame', CarromGameSchema);
module.exports = CarromGame;
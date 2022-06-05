const mongoose = require('mongoose');

const BasketSchema = new mongoose.Schema(
    {
        points:{
            type: Number,
            required: true
        },
        byTeam: {
            type: mongoose.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        byPlayer: {
            type: mongoose.Types.ObjectId,
            ref: 'Player',
            required: true
        },
        time: {
            type: Date,
            required: true
        }
    }
)

const Basket = mongoose.model('Basket', BasketSchema);
module.exports = Basket;
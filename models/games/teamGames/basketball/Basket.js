const mongoose = require('mongoose');

const BasketSchema = new mongoose.Schema(
    {
        points:{
            type: Number,
            required: true
        },
        byTeam: {
            type: String,
            required: true
        },
        byJersey: {
            type: Number,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    }
)

const Basket = mongoose.model('Basket', BasketSchema);
module.exports = Basket;
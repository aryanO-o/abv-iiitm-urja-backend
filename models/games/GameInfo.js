const mongoose = require('mongoose');

const GameInfoSchema = new mongoose.Schema(
    {
        date_and_time: {
            type: Date
        },
        scorer: {
            type: String,
        },
        referee: {
            type: String,
        },
        venue: {
            type: String,
        }
    }
)

const GameInfo = mongoose.model('GameInfo', GameInfoSchema);
module.exports = GameInfo;
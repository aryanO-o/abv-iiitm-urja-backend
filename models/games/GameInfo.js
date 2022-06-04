const mongoose = require('mongoose');

const GameInfoSchema = new mongoose.Schema(
    {
        timings: {
            type: String,
        },
        date: {
            type: String,
        },
        scorer_college_id: {
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
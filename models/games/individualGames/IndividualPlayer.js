const mongoose = require('mongoose');

const IndividualPlayerSchema = new mongoose.Schema(
    {
        jerseyNo: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        time: {
            type: Date,
        }
    }
)

const IndividualPlayer = mongoose.model('IndividualPlayer', IndividualPlayerSchema);
module.exports = IndividualPlayer;
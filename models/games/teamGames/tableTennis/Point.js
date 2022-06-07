const mongoose = require('mongoose');

const TableTennisPointSchema = new mongoose.Schema(
    {
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
        setId: {
            type: mongoose.Types.ObjectId,
            ref: 'Set',
            required: true
        }
    }
)

const TableTennisPoint = mongoose.model('TableTennisPoint', TableTennisPointSchema);
module.exports = TableTennisPoint;
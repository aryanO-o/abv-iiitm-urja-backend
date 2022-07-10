const mongoose = require('mongoose');

const CricketGameSchema = mongoose.Schema(
    {
        teamA: {
            type: mongoose.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        teamB: {
            type: mongoose.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        winner: {
            type: mongoose.Types.ObjectId,
            ref: 'Team'
        },
        teamAScore: String,
        teamBScore: String
    }
)

const CricketGame = mongoose.model('CricketGame', CricketGameSchema);
module.exports = CricketGame
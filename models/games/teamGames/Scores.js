const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema(
    {
        teamAScore: String,
        teamBScore: String,
    }
)

const Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;
const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema(
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
        time: {
            type: String,
            required: true
        },
        eventId: {
            type: mongoose.Types.ObjectId,
            ref: 'FootballGame',
            required: true
        }
    }
)

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;
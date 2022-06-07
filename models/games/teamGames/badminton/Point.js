const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema(
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

const Point = mongoose.model('Point', PointSchema);
module.exports = Point;
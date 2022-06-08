const mongoose = require('mongoose');
const Team = require('../Team');

const VolleyballSetSchema = mongoose.Schema(
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
        teamASetScore: Number,
        teamBSetScore: Number,
        eventId: {
            type: mongoose.Types.ObjectId,
            refPath: 'onModel',
            required: true
        }
        
    }
)

const VolleyballSet = mongoose.model('VolleyballSet', VolleyballSetSchema);
module.exports = VolleyballSet;
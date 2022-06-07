const mongoose = require('mongoose');
const Team = require('../Team');

const TableTennisSetSchema = mongoose.Schema(
    {
        points: [{
            type: mongoose.Types.ObjectId,
            ref: 'Point'
        }],
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

const TableTennisSet = mongoose.model('TabeTennisSet', TableTennisSetSchema);
module.exports = TableTennisSet;
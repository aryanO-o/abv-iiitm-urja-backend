const Set = require("../../../../models/games/teamGames/snooker/Set")
const { default: mongoose } = require("mongoose");
const { addSetToSnookerGame, removeSetFromSnookerGame, updateTeamScores } = require("./snooker");

exports.addSet = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    //     eventId: "",
    // }

    const { teamA, teamB, eventId } = req.body;

    try{
        const set = await new Set({
            teamA: teamA,
            teamB: teamB,
            eventId: eventId,
            teamASetScore: 0,
            teamBSetScore: 0
        })
        const savedSet = await set.save();
        
        req.set_id = savedSet._id;
        const addedSetToSnookerGame = await addSetToSnookerGame(req, res);

        res.json({
            savedSet,
            addedSetToSnookerGame
        })
    }
    catch(err) {
        res.status(500).json({
            message: "yaha wala mongodb error: " + err.message
        })
    }
}

exports.removeSet = async (req, res) => {

    //expected data from frontend
    // {
    //     set_id: ""
    // }

    try {
        const deletedSet = await Set.findByIdAndDelete(req.params.set_id);
        req.body.eventId = deletedSet.eventId;
        const snookerGameAfterDeletingSet = await removeSetFromSnookerGame(req, res);
             
        res.json({
            deletedSet,
            snookerGameAfterDeletingSet
        });
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateSet = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     set_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const set = await Set.findOneAndUpdate(
            {
                _id: req.params.set_id,
            },
            {
                $set: {
                    teamA: teamA,
                    teamB: teamB
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.json(set);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}


exports.getSet = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: ""
    // }

    try {
        const set = await Set.find({_id: req.params.set_id});
        res.json(set)
    }
    catch (err){
        res.status(500).json({message: "mongodb error: " + err.message});
    }
    
}

exports.getAllSetsOfEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     eventId:""
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)

    try {
        const sets = await Set.find({eventId: eventId});
        res.json(sets);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}


exports.setWinnerOfSet = async  (req, res) => {
    //expected data from frontend
    // {
    //     set_id:"",
    //     teamASetScore: "",
    //     teamBSetScore: ""
    // }
    const{teamASetScore, teamBSetScore} = req.body;

    try{
        const set = await Set.findOneAndUpdate(
            {_id: req.params.set_id},
            {
                $set: {
                    teamASetScore: teamASetScore,
                    teamBSetScore: teamBSetScore,
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
        if(teamASetScore > teamBSetScore){
            const afterSettingWinnerOfSet = await Set.findOneAndUpdate(
                {
                    _id: req.params.set_id
                },
                {
                    $set: {
                        winner: set.teamA
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            req.body.byTeam = set.teamA;
            req.body.eventId = set.eventId;
            req.changeInPoints = Number(1)
            const snookerGameAfterUpdatedScores= await updateTeamScores(req, res);


            res.json({afterSettingWinnerOfSet, snookerGameAfterUpdatedScores})
        }
        else if(teamASetScore < teamBSetScore){
            const afterSettingWinnerOfSet = await Set.findOneAndUpdate(
                {
                    _id: req.params.set_id
                },
                {
                    $set: {
                        winner: set.teamB
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            req.body.byTeam = set.teamB;
            req.body.eventId = set.eventId;
            req.changeInPoints = Number(1)
            const snookerGameAfterUpdatedScores= await updateTeamScores(req, res);


            res.json({afterSettingWinnerOfSet, snookerGameAfterUpdatedScores})
        }
        else{
            res.json({
                message: "cannot set two winners."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: " mongodb error: " + err
        })
    }
}

exports.allSetsWonByTeamInEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     byTeam: ""
    //     eventId: ""
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)
    const byTeam = mongoose.Types.ObjectId(req.body.byTeam)
    try {
        const sets = await Set.find({winner: byTeam, eventId: eventId});
        res.json({
            noOfSets: sets.length,
            sets: sets
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}



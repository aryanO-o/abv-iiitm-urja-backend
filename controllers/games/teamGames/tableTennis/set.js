const Set = require("../../../../models/games/teamGames/tableTennis/Set");
const { default: mongoose } = require("mongoose");
const { addSetToTableTennisGame, removeSetFromTableTennisGame, updateTeamScores } = require("./tableTennis");

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
        const addedSetToTableTennisGame = await addSetToTableTennisGame(req, res);

        res.json({
            savedSet,
            addedSetToTableTennisGame
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
        const TableTennisGameAfterDeletingSet = await removeSetFromTableTennisGame(req, res);
             
        res.json({
            deletedSet,
            TableTennisGameAfterDeletingSet
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

exports.addPointToSet = async (req, res) => {
    //expected data from frontend
    // {
    //     setId: "",
    //     point_id: "",
    // }

    const {setId} = req.body;
    const point_id = req.point_id
    try {
        const result = await Set.findOneAndUpdate({_id: setId},
            {
                $push:{
                    points: point_id,
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
        return result;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removePointFromSet = async (req, res) => {
    //expected data from frontend
    // {
    //     setId: "",
    //     point_id: "",
    // }

    const {setId} = req.body;
    
    try {
        const set = await Set.findOneAndUpdate(
            {
                _id: setId,
            },
            {
                $pull: {
                    points: req.params.point_id
                }
            },
            {
                new: true
            }
        )

        return set;
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

exports.updateTeamScoresOfSet = async (req, res) => {
    //expected data from frontend
    // {
    //     changeInPoints: ""
    //     byTeam: ""
    //     setId: ""
    // }
    const { byTeam} = req.body;
    const setId = req.body.setId;
    
    try {
        const set = await Set.find({_id: setId});
        
        const scoreOfA = set[0].teamASetScore;

        const scoreOfB = set[0].teamBSetScore;
        if(set[0].teamA.toString() == byTeam)
        {
            const updatedSet = await Set.findOneAndUpdate(
                {
                    _id: setId,
                },
                {
                    $set: {
                        teamASetScore:  scoreOfA + Number(req.changeInPoints)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            return updatedSet;
        }else if(set[0].teamB.toString() == byTeam)
        {
            const updatedSet = await Set.findOneAndUpdate(
                {
                    _id: setId,
                },
                {
                    $set: {
                        teamBSetScore: scoreOfB + Number(req.changeInPoints)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            return updatedSet;
        }
        else return "this team is not in the set"
    }
    catch (err) {
        res.status(500).json({
            message: "ye wala mongodb error: " + err.message
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
            const tableTennisGameAfterUpdatedScores= await updateTeamScores(req, res);


            res.json({afterSettingWinnerOfSet, tableTennisGameAfterUpdatedScores})
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
            const tableTennisGameAfterUpdatedScores= await updateTeamScores(req, res);


            res.json({afterSettingWinnerOfSet, tableTennisGameAfterUpdatedScores})
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



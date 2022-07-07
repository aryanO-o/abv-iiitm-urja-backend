//TODO: jab volleyball game delete hoga to usse related sets and points bhi delete krne he
const { default: mongoose } = require("mongoose");
const SnookerGame = require("../../../../models/games/teamGames/snooker/SnookerGame");

exports.createSnookerGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const snookerGame = await new SnookerGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedSnookerGame = await snookerGame.save();

        res.json(savedSnookerGame);
    }
    catch (err) {
        res.status(500).json({
            message: "yahi wala mongodb error: " + err.message
        })
    }
}

exports.updateSnookerGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const snookerballGame = await SnookerGame.findOneAndUpdate(
            {
                _id: req.params.event_id,
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

        res.json(snookerballGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllSnookerGames = async (req, res) =>{
    
    try {
        const result = await SnookerGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.addSetToSnookerGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const set_id = req.set_id
    try {
        const snookerGame = await SnookerGame.findOneAndUpdate({_id: eventId},
            {
                $push:{
                    sets: set_id,
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
        return snookerGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeSetFromSnookerGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const snookerGame = await SnookerGame.findOneAndUpdate(
            {
                _id: eventId,
            },
            {
                $pull: {
                    sets: req.params.set_id
                }
            },
            {
                new: true
            }
        )

        return snookerGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateTeamScores = async (req, res) => {
    //expected data from frontend
    // {
    //     changeInPoints: ""
    //     byTeam: ""
    //     eventId: ""
    // }
    const { byTeam} = req.body;
    const eventId = req.body.eventId;
    
    try {
        const snookerGame = await SnookerGame.find({_id: eventId});
        
        const scoreOfA = snookerGame[0].teamAScore;

        const scoreOfB = snookerGame[0].teamBScore;
        if(snookerGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await SnookerGame.findOneAndUpdate(
                {
                    _id: eventId,
                },
                {
                    $set: {
                        teamAScore:  scoreOfA + Number(req.changeInPoints)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            return updatedGame;
        }else if(snookerGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await SnookerGame.findOneAndUpdate(
                {
                    _id: eventId,
                },
                {
                    $set: {
                        teamBScore: scoreOfB + Number(req.changeInPoints)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            return updatedGame;
        }
        else return "this team is not in the event"
    }
    catch (err) {
        res.status(500).json({
            message: "ye wala mongodb error: " + err.message
        })
    }
}

exports.setWinner = async  (req, res) => {
    //expected data from frontend
    // {
    //     event_id:"",
    //     teamAScore: "",
    //     teamBScore: ""
    // }
    const{teamAScore, teamBScore} = req.body;

    try{
        const snookerGame = await SnookerGame.findOneAndUpdate(
            {_id: req.params.event_id},
            {
                $set: {
                    teamAScore: teamAScore,
                    teamBScore: teamBScore,
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.json(snookerGame);
        // if(teamAScore > teamBScore){
        //     const afterSettingWinner = await SnookerGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: snookerGame.teamA
        //             }
        //         },
        //         {
        //             new: true,
        //             runValidators: true
        //         }
        //     )
        //     res.json(afterSettingWinner)
        // }
        // else if(teamAScore < teamBScore){
        //     const afterSettingWinner = await SnookerGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: snookerGame.teamB
        //             }
        //         },
        //         {
        //             new: true,
        //             runValidators: true
        //         }
        //     )
        //     res.json(afterSettingWinner)
        // }
        // else{
        //     res.json({
        //         message: "cannot set two winners."
        //     })
        // }
    }
    catch (err) {
        res.status(500).json({
            message: " mongodb error: " + err
        })
    }
}

exports.getSnookerGameById = async (req, res) => {
    try {
        let result = await SnookerGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
//TODO: jab squash game delete hoga to usse related sets and points bhi delete krne he
const { default: mongoose } = require("mongoose");
const SquashGame = require("../../../../models/games/teamGames/squash/SquashGame");

exports.createSquashGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const squashGame = await new SquashGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedSquashGame = await squashGame.save();

        res.json(savedSquashGame);
    }
    catch (err) {
        res.status(500).json({
            message: "yahi wala mongodb error: " + err.message
        })
    }
}

exports.updateSquashGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const squashGame = await SquashGame.findOneAndUpdate(
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

        res.json(squashGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllSquashGames = async (req, res) =>{
    
    try {
        const result = await SquashGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.addSetToSquashGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const set_id = req.set_id
    try {
        const squashGame = await SquashGame.findOneAndUpdate({_id: eventId},
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
        return squashGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeSetFromSquashGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const squashGame = await SquashGame.findOneAndUpdate(
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

        return squashGame;
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
        const squashGame = await SquashGame.find({_id: eventId});
        
        const scoreOfA = squashGame[0].teamAScore;

        const scoreOfB = squashGame[0].teamBScore;
        if(squashGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await SquashGame.findOneAndUpdate(
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
        }else if(squashGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await SquashGame.findOneAndUpdate(
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
        const squashGame = await SquashGame.findOneAndUpdate(
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

        res.json(squashGame);
        // if(teamAScore > teamBScore){
        //     const afterSettingWinner = await SquashGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: squashGame.teamA
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
        //     const afterSettingWinner = await SquashGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: squashGame.teamB
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

exports.getSquashGameById = async (req, res) => {
    try {
        let result = await SquashGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.deleteSquashGame = async (req, res) => {
    try{
        let result = await SquashGame.findOneAndDelete({_id: req.params.eventId});
        res.json(result);
    }catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
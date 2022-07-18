//TODO: jab volleyball game delete hoga to usse related sets and points bhi delete krne he
const { default: mongoose } = require("mongoose");
const VolleyballGame = require("../../../../models/games/teamGames/volleyball/VolleyballGame");

exports.createVolleyballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const volleyballGame = await new VolleyballGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedVolleyballGame = await volleyballGame.save();

        res.json(savedVolleyballGame);
    }
    catch (err) {
        res.status(500).json({
            message: "yahi wala mongodb error: " + err.message
        })
    }
}

exports.updateVolleyvallGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const volleyballGame = await VolleyballGame.findOneAndUpdate(
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

        res.json(volleyballGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllVolleyballGames = async (req, res) =>{
    
    try {
        const result = await VolleyballGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.addSetToVolleyballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const set_id = req.set_id
    try {
        const volleyballGame = await VolleyballGame.findOneAndUpdate({_id: eventId},
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
        return volleyballGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeSetFromVolleyballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const volleyballGame = await VolleyballGame.findOneAndUpdate(
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

        return volleyballGame;
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
        const volleyballGame = await VolleyballGame.find({_id: eventId});
        
        const scoreOfA = volleyballGame[0].teamAScore;

        const scoreOfB = volleyballGame[0].teamBScore;
        if(volleyballGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await VolleyballGame.findOneAndUpdate(
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
        }else if(volleyballGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await VolleyballGame.findOneAndUpdate(
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
        const volleyballGame = await VolleyballGame.findOneAndUpdate(
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
        res.json(volleyballGame);
        // if(teamAScore > teamBScore){
        //     const afterSettingWinner = await VolleyballGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: volleyballGame.teamA
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
        //     const afterSettingWinner = await VolleyballGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: volleyballGame.teamB
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

exports.getVolleyballGameById = async (req, res) => {
    try {
        let result = await VolleyballGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.deleteVolleyballGame = async (req, res) => {
    try{
        let result = await VolleyballGame.findOneAndDelete({_id: req.params.eventId});
        res.json(result);
    }catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
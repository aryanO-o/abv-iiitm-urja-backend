//TODO: jab football game delete ho like jab fest end ho jae to dhyan rakhna he ki usse related sare goals bhi delete ho jae

const FootballGame = require('../../../../models/games/teamGames/football/FootballGame')

exports.createFootballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const footballGame = await new FootballGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedfootballGame = await footballGame.save();

        res.json(savedfootballGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateFootballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const footballGame = await FootballGame.findOneAndUpdate(
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

        res.json(footballGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllFootBallGames = async (req, res) =>{
    
    try {
        const result = await FootballGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.addGoalToFootballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     goal_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const goal_id = req.goal_id
    try {
        const footballGame = await FootballGame.findOneAndUpdate({_id: eventId},
            {
                $push:{
                    goals: goal_id,
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
        return footballGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeGoalFromFootballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     goal_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const footballGame = await FootballGame.findOneAndUpdate(
            {
                _id: eventId,
            },
            {
                $pull: {
                    goals: req.params.goal_id
                }
            },
            {
                new: true
            }
        )

        return footballGame;
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
        const footballGame = await FootballGame.find({_id: eventId});
        
        const scoreOfA = footballGame[0].teamAScore;

        const scoreOfB = footballGame[0].teamBScore;
        if(footballGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await FootballGame.findOneAndUpdate(
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
        }else if(footballGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await FootballGame.findOneAndUpdate(
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
        const footballGame = await FootballGame.findOneAndUpdate(
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

        res.json(footballGame)
        // if(teamAScore > teamBScore){
        //     const afterSettingWinner = await FootballGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: footballGame.teamA
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
        //     const afterSettingWinner = await FootballGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: footballGame.teamB
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

exports.getFootballGameById = async (req, res) => {
    try {
        let result = await FootballGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.deleteFootballGame = async (req, res) => {
    try{
        let result = await FootballGame.findOneAndDelete({_id: req.params.eventId});
        res.json(result);
    }catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

const BadmintonGame = require('../../../../models/games/teamGames/badminton/BadmintonGame')
//TODO: jab badminton game delete hoga to usse related sets and points bhi delete krne he
const { default: mongoose } = require("mongoose");

exports.createBadmintonGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const badmintonGame = await new BadmintonGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedbadmintonGame = await badmintonGame.save();

        res.json(savedbadmintonGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateBadmintonGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const badmintonGame = await BadmintonGame.findOneAndUpdate(
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

        res.json(badmintonGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllBadmintonGames = async (req, res) =>{
    
    try {
        const result = await BadmintonGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.addSetToBadmintonGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const set_id = req.set_id
    try {
        const badmintonGame = await BadmintonGame.findOneAndUpdate({_id: eventId},
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
        return badmintonGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeSetFromBadmintonGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const badmintonGame = await BadmintonGame.findOneAndUpdate(
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

        return badmintonGame;
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
        const badmintonGame = await BadmintonGame.find({_id: eventId});
        
        const scoreOfA = badmintonGame[0].teamAScore;

        const scoreOfB = badmintonGame[0].teamBScore;
        if(badmintonGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await BadmintonGame.findOneAndUpdate(
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
        }else if(badmintonGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await BadmintonGame.findOneAndUpdate(
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
        const badmintonGame = await BadmintonGame.findOneAndUpdate(
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
        if(teamAScore > teamBScore){
            const afterSettingWinner = await BadmintonGame.findOneAndUpdate(
                {
                    _id: req.params.event_id
                },
                {
                    $set: {
                        winner: badmintonGame.teamA
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            res.json(afterSettingWinner)
        }
        else if(teamAScore < teamBScore){
            const afterSettingWinner = await BadmintonGame.findOneAndUpdate(
                {
                    _id: req.params.event_id
                },
                {
                    $set: {
                        winner: badmintonGame.teamB
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            res.json(afterSettingWinner)
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
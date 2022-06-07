//TODO: jab lawnTennis game delete hoga to usse related sets and points bhi delete krne he
const { default: mongoose } = require("mongoose");
const LawnTennisGame = require("../../../../models/games/teamGames/lawnTennis/LawnTennisGame");

exports.createLawnTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const lawnTennisGame = await new LawnTennisGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedlawnTennisGame = await lawnTennisGame.save();

        res.json(savedlawnTennisGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateLawnTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const lawnTennisGame = await LawnTennisGame.findOneAndUpdate(
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

        res.json(lawnTennisGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllLawnTennisGames = async (req, res) =>{
    
    try {
        const result = await LawnTennisGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.addSetToLawnTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const set_id = req.set_id
    try {
        const lawnTennisGame = await LawnTennisGame.findOneAndUpdate({_id: eventId},
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
        return lawnTennisGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeSetFromLawnTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const lawnTennisGame = await LawnTennisGame.findOneAndUpdate(
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

        return lawnTennisGame;
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
        const lawnTennisGame = await LawnTennisGame.find({_id: eventId});
        
        const scoreOfA = lawnTennisGame[0].teamAScore;

        const scoreOfB = lawnTennisGame[0].teamBScore;
        if(lawnTennisGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await LawnTennisGame.findOneAndUpdate(
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
        }else if(lawnTennisGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await LawnTennisGame.findOneAndUpdate(
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
        const lawnTennisGame = await LawnTennisGame.findOneAndUpdate(
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
            const afterSettingWinner = await LawnTennisGame.findOneAndUpdate(
                {
                    _id: req.params.event_id
                },
                {
                    $set: {
                        winner: lawnTennisGame.teamA
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
            const afterSettingWinner = await LawnTennisGame.findOneAndUpdate(
                {
                    _id: req.params.event_id
                },
                {
                    $set: {
                        winner: lawnTennisGame.teamB
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
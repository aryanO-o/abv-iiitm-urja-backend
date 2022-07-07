//TODO: jab tt game delete hoga to usse related sets and points bhi delete krne he
const { default: mongoose } = require("mongoose");
const TableTennisGame = require("../../../../models/games/teamGames/tableTennis/TableTennisGame");

exports.createTableTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const tableTennisGame = await new TableTennisGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedtableTennisGame = await tableTennisGame.save();

        res.json(savedtableTennisGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateTableTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const tableTennisGame = await TableTennisGame.findOneAndUpdate(
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

        res.json(tableTennisGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllTableTennisGames = async (req, res) =>{
    
    try {
        const result = await TableTennisGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.addSetToTableTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const set_id = req.set_id
    try {
        const tableTennisGame = await TableTennisGame.findOneAndUpdate({_id: eventId},
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
        return tableTennisGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeSetFromTableTennisGame = async (req, res) => {
    //expected data from frontend
    // {
    //     set_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const tableTennisGame = await TableTennisGame.findOneAndUpdate(
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

        return tableTennisGame;
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
        const tableTennisGame = await TableTennisGame.find({_id: eventId});
        
        const scoreOfA = tableTennisGame[0].teamAScore;

        const scoreOfB = tableTennisGame[0].teamBScore;
        if(tableTennisGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await TableTennisGame.findOneAndUpdate(
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
        }else if(tableTennisGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await TableTennisGame.findOneAndUpdate(
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
        const tableTennisGame = await TableTennisGame.findOneAndUpdate(
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
        res.json(tableTennisGame)
        // if(teamAScore > teamBScore){
        //     const afterSettingWinner = await TableTennisGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: tableTennisGame.teamA
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
        //     const afterSettingWinner = await TableTennisGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: tableTennisGame.teamB
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

exports.getTableTennisGameById = async (req, res) => {
    try {
        let result = await TableTennisGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
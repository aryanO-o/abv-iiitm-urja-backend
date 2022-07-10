const CricketGame = require('../../../../models/games/teamGames/cricket/CricketGame')

exports.createCricketGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const cricketGame = await new CricketGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: "0/0",
            teamBScore: "0/0",
        })

        const savedCricketGame = await cricketGame.save();

        res.json(savedCricketGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllCricketGames = async (req, res) =>{
    
    try {
        const result = await CricketGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
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
        const cricketGame = await CricketGame.findOneAndUpdate(
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

        res.json(cricketGame)
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

exports.getCricketGameById = async (req, res) => {
    try {
        let result = await CricketGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
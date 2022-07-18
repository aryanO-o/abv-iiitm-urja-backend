// update final scores
//  add basket in game, remove basket from game
// create basketball game, remove basketball game, update basketballgame, getBasketball games
//TODO: jab basketball game delete ho like jab fest end ho jae to dhyan rakhna he ki usse related sare baskets bhi delete ho jae

const BasketballGame = require("../../../../models/games/teamGames/basketball/BasketballGame");
const { getTeamById } = require("../team");

exports.addBasketToBasketballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     basket_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    const basket_id = req.basket_id
    try {
        const basketballGame = await BasketballGame.findOneAndUpdate({_id: eventId},
            {
                $push:{
                    baskets: basket_id,
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
        return basketballGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeBasketFromBasketballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     basket_id: "",
    //     eventId: "",
    // }

    const { eventId} = req.body;
    
    try {
        const basketballGame = await BasketballGame.findOneAndUpdate(
            {
                _id: eventId,
            },
            {
                $pull: {
                    baskets: req.params.basket_id
                }
            },
            {
                new: true
            }
        )

        return basketballGame;
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.createBasketballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: "",
    //     teamB: ""
    // }


    const {teamA, teamB} = req.body;
    try {
        const basketballGame = await new BasketballGame({
            teamA: teamA,
            teamB: teamB,
            teamAScore: 0,
            teamBScore: 0,
        })

        const savedBasketballGame = await basketballGame.save();

        res.json(savedBasketballGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateBasketballGame = async (req, res) => {
    //expected data from frontend
    // {
    //     teamA: ""
    //     teamB: ""
    //     event_id: ""
    // }

    const {teamA, teamB} = req.body;
    try {
        const basketballGame = await BasketballGame.findOneAndUpdate(
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

        res.json(basketballGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getAllBasketBallGames = async (req, res) =>{
    
    try {
        let result = await BasketballGame.find();
        res.json(result);
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
        const basketballGame = await BasketballGame.find({_id: eventId});
        
        const scoreOfA = basketballGame[0].teamAScore;

        const scoreOfB = basketballGame[0].teamBScore;
        if(basketballGame[0].teamA.toString() == byTeam)
        {
            const updatedGame = await BasketballGame.findOneAndUpdate(
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
        }else if(basketballGame[0].teamB.toString() == byTeam)
        {
            const updatedGame = await BasketballGame.findOneAndUpdate(
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
        const basketballGame = await BasketballGame.findOneAndUpdate(
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

        res.json(basketballGame)
        // if(teamAScore > teamBScore){
        //     const afterSettingWinner = await BasketballGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: basketballGame.teamA
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
        //     const afterSettingWinner = await BasketballGame.findOneAndUpdate(
        //         {
        //             _id: req.params.event_id
        //         },
        //         {
        //             $set: {
        //                 winner: basketballGame.teamB
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

exports.getBasketballGameById = async (req, res) => {
    try {
        let result = await BasketballGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.deleteBasketballGame = async (req, res) => {
    try{
        let result = await BasketballGame.findOneAndDelete({_id: req.params.eventId});
        res.json(result);
    }catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}


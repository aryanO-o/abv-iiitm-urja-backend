const CarromGame = require('../../../../models/games/individualGames/carrom/CarromGame');

exports.createCarromGame = async (req, res) => {
    //expected data from frontend
    // {
    //     playerA: "",
    //     playerB: ""
    //     winner: ""
    // }


    const {playerA, playerB, winner} = req.body;
    try {
        const carromGame = await new CarromGame({
            playerA: playerA,
            playerB: playerB,
            winner: winner
        })

        const savedCarromGame = await carromGame.save();

        res.json(savedCarromGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateCarromGame = async (req, res) => {
    //expected data from frontend
    // {
    //     playerA: ""
    //     playerB: ""
    //     event_id: ""
    //     winner: ""
    // }

    const {playerA, playerB, winner} = req.body;
    try {
        const carromGame = await CarromGame.findOneAndUpdate(
            {
                _id: req.params.event_id,
            },
            {
                $set: {
                    playerA: playerA,
                    playerB: playerB,
                    winner: winner
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.json(carromGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}


exports.getAllCarromGames = async (req, res) =>{
    
    try {
        let result = await CarromGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getCarromGameById = async (req, res) => {
    try {
        let result = await CarromGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
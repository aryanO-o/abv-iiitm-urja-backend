const ChessGame = require('../../../../models/games/individualGames/chess/ChessGame');


exports.createChessGame = async (req, res) => {
    //expected data from frontend
    // {
    //     playerA: "",
    //     playerB: ""
    //     winner: ""
    // }


    const {playerA, playerB, winner} = req.body;
    try {
        const chessGame = await new ChessGame({
            playerA: playerA,
            playerB: playerB,
            winner: winner
        })

        const savedChessGame = await chessGame.save();

        res.json(savedChessGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateChessGame = async (req, res) => {
    //expected data from frontend
    // {
    //     playerA: ""
    //     playerB: ""
    //     event_id: ""
    //     winner: ""
    // }

    const {playerA, playerB, winner} = req.body;
    try {
        const chessGame = await ChessGame.findOneAndUpdate(
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

        res.json(chessGame);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}


exports.getAllChessGames = async (req, res) =>{
    
    try {
        let result = await ChessGame.find();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getChessGameById = async (req, res) => {
    try {
        let result = await ChessGame.findOne({_id: req.params.eventId});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
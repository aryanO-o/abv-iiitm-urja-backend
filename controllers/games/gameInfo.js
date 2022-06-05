const GameInfo = require("../../models/games/GameInfo")

exports.createGameInfo = async (req, res) => {
    //expected data from frontend
    // {
    //     date_and_time: "",
    //     scorer: "",
    //     referee: "",
    //     venue: "",
    // }

    const {date_and_time, scorer, venue,referee} = req.body;

    try {
        const gameInfo = await new GameInfo(
            {
                date_and_time: new Date(date_and_time),
                scorer: scorer,
                referee: referee,
                venue: venue
            }
        );
        const result = await gameInfo.save();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateGameInfo = async (req, res) => {
    //expected data from frontend
    // {
    //     gameInfo_id: "",
    //     date_and_time: "",
    //     scorer: "",
    //     referee: "",
    //     venue: "",
    // }
    const {date_and_time, scorer, venue,referee} = req.body;

    try{
        const result = await GameInfo.findOneAndUpdate(
            {
                _id: req.params.gameInfo_id
            },
            {
                $set: {
                    date_and_time: new Date(date_and_time),
                    scorer: scorer,
                    referee: referee,
                    venue: venue
                }
            },
            {
                new: true,
            }
        )

        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getGameInfo = async (req,res) => {
    //expected data from frontend
    // {
    //     gameInfo_id: req.params.gameInfo_id
    // }

    try {
        const result = await GameInfo.find({_id: req.params.gameInfo_id});
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.deleteGameInfo = (req, res) => {
    //expected data from frontend
    // {
    //     gameInfo_id: req.params.gameInfo_id
    // }

    GameInfo.findByIdAndDelete(req.params.gameInfo_id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    })
}
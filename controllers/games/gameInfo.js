const GameInfo = require("../../models/games/GameInfo")

exports.createGameInfo = async (req, res) => {
    //expected data from frontend
    // {
        // date_and_time: "",
        // scorer: "",
        // referee: "",
        // venue: "",
        // inGameDetails: "",
    // }

    const {date_and_time, scorer, venue,referee, inGameDetails} = req.body;

    try {
        const gameInfo = await new GameInfo(
            {
                date_and_time: new Date(date_and_time),
                scorer: scorer,
                referee: referee,
                venue: venue,
                inGameDetails: inGameDetails,
            }
        );
        const result = await gameInfo.save();
        return result;
        // res.json(result);
        // console.log(result);
        // console.log("iske bad chal rha hu.");
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
    //     inGameDetails: "",
    // }
    const {date_and_time, scorer, venue,referee, inGameDetails} = req.body;

    try{
        const result = await GameInfo.findOneAndUpdate(
            {
                _id: req.gameInfoId
            },
            {
                $set: {
                    date_and_time: new Date(date_and_time),
                    scorer: scorer,
                    referee: referee,
                    venue: venue,
                    inGameDetails: inGameDetails,
                }
            },
            {
                new: true,
                runValidators: true,
            }
        )
        return result;
        // res.json(result);

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
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.deleteGameInfo = async (req, res) => {
    //expected data from frontend
    // {
    //     gameInfo_id: req.params.gameInfo_id
    // }

    try{
        const result = await GameInfo.findByIdAndDelete(req.gameInfo_id)
        return result;
    }
    catch (err) {
        res.status(500).json({
            message: "yaha wali error mongodb error: " + err.message
        })
    }    
}

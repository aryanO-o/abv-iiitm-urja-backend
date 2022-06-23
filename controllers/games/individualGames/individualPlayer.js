const IndividualPlayer = require("../../../models/games/individualGames/IndividualPlayer")


exports.addIndividualPlayer = async (req, res) => {
    //expected data from frontend
    // {
    //     jerseyNo,
    //     name,
    // }
    try{
        const {jerseyNo, name} = req.body;
        const individualPlayer = await new IndividualPlayer({
            jerseyNo: jerseyNo,
            name: name,
        })

        const savedIndividualPlayer = await individualPlayer.save();
        res.json(savedIndividualPlayer);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removePlayer = (req, res) => {
    //expected data from frontend
    // {
    //     player_id: ""
    // }

    IndividualPlayer.findByIdAndDelete(req.params.player_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(err.code).json({
            message: "mongodb error: " + err.message
        })
    })
}

exports.updateIndividualPlayer = async (req, res) => {
    //expected data from frontend
    // {
    //     jerseyNo: "",
    //     name: ""
    // }

    const {jerseyNo, name} = req.body;
    try{
        const player = await IndividualPlayer.findOneAndUpdate(
            {
                _id: req.params.player_id,
            },
            {
                $set: {
                    jerseyNo: `${jerseyNo}`,
                    name: `${name}`
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.json(player);
    }
    catch(err){
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }

}

exports.getAllPlayers = (req, res) => {
    IndividualPlayer.find({})
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    })
}

exports.setTime = (req, res) =>{
    //expected data from frontend
    // {
    //     player_id: ,
    //     time:,
    // }

    try {
        const result = await IndividualPlayer.findOneAndUpdate(
            {
                _id: req.params.player_id,
            },
            {
                $set: {
                    time: req.body.time,
                }
            },
            {
                new: true,
                runValidators: true
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

exports.getPlayersSortedByTime = (req, res) => {
    
}
// individual baskets
// team scores
// baskets information

const Player = require('../../models/games/Player')

//add player remove player update player get player

exports.addPlayer = async (req, res) => {
    //expected data from frontend
    // {
    //     jerseyNo: "",
    //     name: ""
    // }

    const {jerseyNo, name} = req.body;
    try{
        const player = await new Player(
            {
                jerseyNo: `${jerseyNo}`,
                name: `${name}`
            }
        )

        const savedPlayer = await player.save();
        res.json(savedPlayer);
        return savedPlayer;
    }
    catch(err){
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

    Player.findByIdAndDelete(req.params.player_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(err.code).json({
            message: "mongodb error: " + err.message
        })
    })
}

exports.updatePlayer = async (req, res) => {
    //expected data from frontend
    // {
    //     jerseyNo: "",
    //     name: ""
    // }

    const {jerseyNo, name} = req.body;
    try{
        const player = await Player.findOneAndUpdate(
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
    Player.find({})
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    })
}
//add basket, remove basket, update basket, get baskets of team

const Basket = require("../../../../models/games/teamGames/basketball/Basket");

exports.addBasket = async (req, res) => {
    //expected data from frontend
    // {
    //     points: "",
    //     team_id: "",
    //     player_id: "",
    //     time: ""
    // }

    const {points, byTeam, byPlayer, time} = req.body;

    try{
        const basket = await new Basket({
            points: points,
            byTeam: byTeam,
            byPlayer: byPlayer,
            time: time
        })
        const savedBasket = await basket.save();
        res.json(savedBasket);
    }
    catch(err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.removeBasket = async (req, res) => {

    //expected data from frontend
    // {
    //     basket_id: ""
    // }

    try {
        const deletedBasket = await Basket.findByIdAndDelete(req.params.basket_id);
        res.json(deletedBasket);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.updateBasket = async (req, res) => {
    //expected data from frontend
    // {
    //     basket_id: "",
    //     points: "",
    //     byTeam: "",
    //     byPlayer: "",
    // }

    const { points, byTeam, byPlayer} = req.body;

    try {
        const basket = await Basket.findOneAndUpdate(
            {
                _id: req.params.basket_id,
            },
            {
                $set: {
                    points: points,
                    byTeam: byTeam,
                    byPlayer: byPlayer
                }
            },
            {
                new: true
            }
        )

        res.json(basket);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getBasket = async (req, res) => {
    //expected data from frontend
    // {
    //     basket_id: ""
    // }

    try {
        const basket = await Basket.find({_id: req.params.basket_id});
        res.json(basket)
    }
    catch (err){
        res.status(500).json({message: "mongodb error: " + err.message});
    }
    
}
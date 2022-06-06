//add basket, remove basket, update basket, get baskets of team
// allBasketsOfEvent, allBasketsByTeamInEvent, allBasktesByTeam, allBasketsByPlayer, allBasktesByPlayerInEvent
// noOfBasketsbyTeam, noOfBasketsbyPlayer
//TODO: update basket hata hi dia kyuki uske sath team scores update krne wala glick tha.

const { default: mongoose } = require("mongoose");
const Basket = require("../../../../models/games/teamGames/basketball/Basket");
const BasketballGame = require("../../../../models/games/teamGames/basketball/BasketballGame");
const { addBasketToBasketballGame, removeBasketFromBasketballGame, updateTeamScores } = require("./basketball");

exports.addBasket = async (req, res) => {
    //expected data from frontend
    // {
    //     points: "",
    //     byTeam: "",
    //     byPlayer: "",
    //     eventId: "",
    //     time: ""
    // }

    const {points, byTeam, byPlayer, time, eventId} = req.body;

    try{
        const basket = await new Basket({
            points: points,
            byTeam: byTeam,
            byPlayer: byPlayer,
            time: time,
            eventId: eventId
        })
        const savedBasket = await basket.save();
        
        req.basket_id = savedBasket._id;
        const addedBasketToBasketballGame = await addBasketToBasketballGame(req, res);
        req.event_id = eventId;
        req.changeInPoints = savedBasket.points
        const updatingScores = await updateTeamScores(req, res);

        res.json({
            addedBasket: savedBasket,
            addedBasketToBasketballGame,
            basketballGameNow: updatingScores
        })
    }
    catch(err) {
        res.status(500).json({
            message: "yaha wala mongodb error: " + err.message
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
        req.body.eventId = deletedBasket.eventId;
        req.body.byTeam = deletedBasket.byTeam;
        const BasketballGameAfterDeletingBasket = await removeBasketFromBasketballGame(req, res);
        req.changeInPoints = deletedBasket.points * -1;
        const updatingScores = await updateTeamScores(req,res);
        

        
        res.json({
            deletedBasket: deletedBasket,
            BasketballGameAfterDeletingBasket,
            basketballGameNow: updatingScores
        });
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

// exports.updateBasket = async (req, res) => {
//     //expected data from frontend
//     // {
//     //     basket_id: "",
//     //     points: "",
//     //     byTeam: "",
//     //     byPlayer: "",
//     //     time: "",
//     // }

//     const { points, byTeam, byPlayer, time} = req.body;

//     try {
//         const basket = await Basket.findOneAndUpdate(
//             {
//                 _id: req.params.basket_id,
//             },
//             {
//                 $set: {
//                     points: points,
//                     byTeam: byTeam,
//                     byPlayer: byPlayer,
//                     time: time
//                 }
//             },
//             {
//                 new: true
//             }
//         )

//         res.json(basket);
//     }
//     catch (err) {
//         res.status(500).json({
//             message: "mongodb error: " + err.message
//         })
//     }
// }

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

exports.getAllBasketsOfEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     eventId:""
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)

    try {
        const baskets = await Basket.find({eventId: eventId});
        res.json(baskets);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allBasketsByTeamInEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     eventId: "",
    //     byTeam: "",
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)
    const byTeam = mongoose.Types.ObjectId(req.body.byTeam)

    try {
        const baskets = await Basket.find({eventId: eventId, byTeam: byTeam});
        res.json({
            noOfBaskets: baskets.length,
            baskets: baskets
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allBasketsByTeam = async (req, res) => {
    //expected data from frontend
    // {
    //     byTeam: ""
    // }

    const byTeam = mongoose.Types.ObjectId(req.body.byTeam)
    try {
        const baskets = await Basket.find({byTeam: byTeam});
        res.json({
            noOfBaskets: baskets.length,
            baskets: baskets
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allBasketsByPlayer = async (req, res) => {
    //expected data from frontend
    // {
    //     byPlayer: ""
    // }

    const byPlayer = mongoose.Types.ObjectId(req.body.byPlayer)
    try {
        const baskets = await Basket.find({byPlayer: byPlayer})
        res.json({
            noOfBaskets: baskets.length,
            baskets: baskets
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allBasketsByPlayerInEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     byPlayer: ""
    //     eventId: ""
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)
    const byPlayer = mongoose.Types.ObjectId(req.body.byPlayer)
    try {
        const baskets = await Basket.find({byPlayer: byPlayer, eventId: eventId});
        res.json({
            noOfBaskets: baskets.length,
            baskets: baskets
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
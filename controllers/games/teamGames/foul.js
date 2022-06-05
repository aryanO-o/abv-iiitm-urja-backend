// add foul // delete foul // all fouls of a particular game

const Foul = require("../../../models/games/teamGames/Foul");

exports.addFoul = async (req, res) => {
    //expected data from frontend
    // {
    //     time:"",
    //     player_id:"",
    //     event_id:"",
    // }

    const {time, byPlayer, eventId} = req.body;

    try{
        const foul = await new Foul({
            time: time,
            byPlayer: byPlayer,
            eventId: eventId
        })

        const savedFoul = await foul.save();
        res.json(savedFoul);
    }
    catch(err){
        res.status(500).json({
            message:"mongodb error: " + err.message
        })
    }
    
}

exports.removeFoul = async (req, res) => {
    //expected data from frontend
    // {
    //     foul_id
    // }
    try {
        const deletedFoul = await Foul.findByIdAndDelete(req.params.foul_id);
        res.json(deletedFoul);
    }
    catch (err) {
        res.status(500).json({message: "mongodb error: " + err.message});
    }
}

exports.foulInEvent = async (req, res) => {
    // expected data from frontend
    // {
    //     event_id: ""
    // }

    try{
        const Fouls = await Foul.find({event_id: req.params.event_id});
        res.json(Fouls);
    }
    catch(err){
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
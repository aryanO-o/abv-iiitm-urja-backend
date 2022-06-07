const Point = require("../../../../models/games/teamGames/badminton/Point");
const { addPointToSet, updateTeamScoresOfSet, removePointFromSet } = require("./set");
const { default: mongoose } = require("mongoose");

exports.addPoint = async (req, res) => {
    //expected data from frontend
    // {
    //     byTeam: "",
    //     byPlayer: "",
    //     setId: "",
    // }

    const { byTeam, byPlayer, setId} = req.body;

    try{
        const point = await new Point({
            byTeam: byTeam,
            byPlayer: byPlayer,
            setId: setId
        })
        const savedPoint = await point.save();
        
        req.point_id = savedPoint._id;
        const addedPointToSet = await addPointToSet(req, res);

        req.changeInPoints = Number(1);
        const afterUpdatingSetScores = await updateTeamScoresOfSet(req, res);

        res.json({
            savedPoint,
            addedPointToSet,
            afterUpdatingSetScores
        })
    }
    catch(err) {
        res.status(500).json({
            message: "yaha wala mongodb error: " + err.message
        })
    }

}

exports.removePoint = async (req, res) => {

    //expected data from frontend
    // {
    //     point_id: ""
    // }

    try {
        const deletedPoint = await Point.findByIdAndDelete(req.params.point_id);
        req.body.setId = deletedPoint.setId;
        req.body.byTeam = deletedPoint.byTeam;
        const SetAfterDeletingPoint = await removePointFromSet(req, res);
        req.changeInPoints = Number(-1);
        const updatingScores = await updateTeamScoresOfSet(req,res);
        

        
        res.json({
            deletedPoint,
            SetAfterDeletingPoint,
            setNow: updatingScores
        });
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getPoint = async (req, res) => {
    //expected data from frontend
    // {
    //     point_id: ""
    // }

    try {
        const point = await Point.find({_id: req.params.point_id});
        res.json(point)
    }
    catch (err){
        res.status(500).json({message: "mongodb error: " + err.message});
    }
    
}

exports.getAllPointsOfSet = async (req, res) => {
    //expected data from frontend
    // {
    //     setId:""
    // }

    const setId = mongoose.Types.ObjectId(req.body.setId)

    try {
        const sets = await Point.find({setId: setId});
        res.json(sets);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allPointsByTeamInSet = async (req, res) => {
    //expected data from frontend
    // {
    //     setId: "",
    //     byTeam: "",
    // }

    const setId = mongoose.Types.ObjectId(req.body.setId)
    const byTeam = mongoose.Types.ObjectId(req.body.byTeam)

    try {
        const points = await Point.find({setId: setId, byTeam: byTeam});
        res.json({
            noOfPoints: points.length,
            points: points
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allPointsByTeam = async (req, res) => {
    //expected data from frontend
    // {
    //     byTeam: ""
    // }

    const byTeam = mongoose.Types.ObjectId(req.body.byTeam)
    try {
        const points = await Point.find({byTeam: byTeam});
        res.json({
            noOfPoints: points.length,
            points: points
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allPointsByPlayer = async (req, res) => {
    //expected data from frontend
    // {
    //     byPlayer: ""
    // }

    const byPlayer = mongoose.Types.ObjectId(req.body.byPlayer)
    try {
        const points = await Point.find({byPlayer: byPlayer})
        res.json({
            noOfPoints: points.length,
            points: points
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allPointsByPlayerInSet = async (req, res) => {
    //expected data from frontend
    // {
    //     byPlayer: ""
    //     setId: ""
    // }

    const setId = mongoose.Types.ObjectId(req.body.setId)
    const byPlayer = mongoose.Types.ObjectId(req.body.byPlayer)
    try {
        const points = await Point.find({byPlayer: byPlayer, setId: setId});
        res.json({
            noOfPoints: points.length,
            points: points
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
const Goal = require('../../../../models/games/teamGames/football/Goal');
const { addGoalToFootballGame, updateTeamScores, removeGoalFromFootballGame } = require('./football');
const { default: mongoose } = require("mongoose");

exports.addGoal = async (req, res) => {
    //expected data from frontend
    // {
    //     byTeam: "",
    //     byPlayer: "",
    //     eventId: "",
    //     time: ""
    // }

    const { byTeam, byPlayer, time, eventId} = req.body;

    try{
        const goal = await new Goal({
            byTeam: byTeam,
            byPlayer: byPlayer,
            time: time,
            eventId: eventId
        })
        const savedGoal = await goal.save();
        
        req.goal_id = goal._id;
        const addedGoalToFootballGame = await addGoalToFootballGame(req, res);
        req.event_id = eventId;
        req.changeInPoints = Number(1)
        const updatingScores = await updateTeamScores(req, res);

        res.json({
            savedGoal,
            addedGoalToFootballGame,
            footbGameNow: updatingScores
        })
    }
    catch(err) {
        res.status(500).json({
            message: "yaha wala mongodb error: " + err.message
        })
    }
}

exports.removeGoal = async (req, res) => {

    //expected data from frontend
    // {
    //     goal_id: ""
    // }

    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.goal_id);
        req.body.eventId = deletedGoal.eventId;
        req.body.byTeam = deletedGoal.byTeam;
        const FootballGameAfterDeletingGoal = await removeGoalFromFootballGame(req, res);
        req.changeInPoints = Number(-1);
        const updatingScores = await updateTeamScores(req,res);
        

        
        res.json({
            deletedGoal,
            FootballGameAfterDeletingGoal,
            footballGameNow: updatingScores
        });
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getGoal = async (req, res) => {
    //expected data from frontend
    // {
    //     goal_id: ""
    // }

    try {
        const goal = await Goal.find({_id: req.params.goal_id});
        res.json(goal)
    }
    catch (err){
        res.status(500).json({message: "mongodb error: " + err.message});
    }
    
}

exports.getAllGoalsOfEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     eventId:""
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)

    try {
        const goals = await Goal.find({eventId: eventId});
        res.json(goals);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allGoalsByTeamInEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     eventId: "",
    //     byTeam: "",
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)
    const byTeam = mongoose.Types.ObjectId(req.body.byTeam)

    try {
        const goals = await Goal.find({eventId: eventId, byTeam: byTeam});
        res.json({
            noOfGoals: goals.length,
            goals: goals
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allGoalsByTeam = async (req, res) => {
    //expected data from frontend
    // {
    //     byTeam: ""
    // }

    const byTeam = mongoose.Types.ObjectId(req.body.byTeam)
    try {
        const goals = await Goal.find({byTeam: byTeam});
        res.json({
            noOfGoals: goals.length,
            goals: goals
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allGoalsByPlayer = async (req, res) => {
    //expected data from frontend
    // {
    //     byPlayer: ""
    // }

    const byPlayer = mongoose.Types.ObjectId(req.body.byPlayer)
    try {
        const goals = await Goal.find({byPlayer: byPlayer})
        res.json({
            noOfGoals: goals.length,
            goals: goals
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.allGoalsByPlayerInEvent = async (req, res) => {
    //expected data from frontend
    // {
    //     byPlayer: ""
    //     eventId: ""
    // }

    const eventId = mongoose.Types.ObjectId(req.body.eventId)
    const byPlayer = mongoose.Types.ObjectId(req.body.byPlayer)
    try {
        const goals = await Goal.find({byPlayer: byPlayer, eventId: eventId});
        res.json({
            noOfGoals: goals.length,
            goals: goals
        })
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
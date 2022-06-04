const { client } = require("../config/postgreSQLdb");

exports.createTeam = (req, res) =>{
    //expected data from frontend
    // {
    //     team_name: ""
    // }

    const {team_name} = req.body;

    client
    .query(`INSERT INTO teams VALUES (default, '${team_name}')`)
    .then((data) =>{
        res.json({
            message: "team inserted successfully"
        })
    })
    .catch((err) =>{
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}

exports.updateTeam = (req, res) =>{
    //expected data from frontend
    // {
    //     team_id: "",
    //     team_name: "",
    // }

    const {team_name} = req.body;
    
    client
    .query( `UPDATE teams SET team_name = '${team_name}' WHERE team_id ='${req.params.team_id}'`)
    .then((data) => { 
        res.json({
            message:"team updated successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            message:"database error occurred: " + err.message
        })
    })
}

exports.getAllTeams = (req, res) => {
    client
    .query(`select * from teams;`)
    .then((data) => {
        res.status(200).json(data.rows)
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error occurred" + err
        })
    })
}

exports.deleteTeam = (req, res) => {

    client
    .query(`DELETE FROM teams WHERE team_id = '${req.params.team_id}'`)
    .then((data) => {
        res.status(200).json({
            message: "team deleted successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error occurred " + err
        })
    })
}
const { client } = require("../config/postgreSQLdb");

exports.addPlayer = (req, res) => {
    // expected data from frontend
    // {
    //     players_college_id: "",
    //     event_id: "",
    //     team_id: "",
    // }

    const { players_college_id, event_id, team_id} = req.body;

    // we need to check if the player is already in the event.
    // we will check if the data is avialable for the college id or not.
    // event id check adn team id check will be done in the frontend.
    client
    .query(`select * from players where event_id = '${event_id}' and player_college_id = '${players_college_id}';`)
    .then((data) => {
        if(data.rows.length != 0) {
            res.json({
                message: "player is already participating in the event"
            })
        }
        else{
            client
            .query(`select * from participants_info where college_id = '${players_college_id}';`)
            .then((data) => {
                if(data.rows.length == 0){
                    res.json({
                        message: "the participants info is not saved, sign in and save the information."
                    })
                }
                else{
                    client
                    .query(`INSERT INTO players VALUES ('${players_college_id}', '${event_id}', '${team_id}');`)
                    .then((data) => {
                        res.json({
                            message: "player added successfully"
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "database error occurred: " + err.message
                        })
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "database error occurred: " + err.message
                })
            })
        }
    })
    .catch((err) => {
        res.status(500).json({message:"data error: " + err.message})
    })
     
}

exports.removePlayer = (req, res) => {
    //expected data from frontend
    // {
    //     players_college_id: "",
    //     event_id: "",
    //     team_id: ""
    // }


    // frontend will take care of only removing the already present players
    client
    .query(`delete from players where event_id = '${req.params.event_id}' and player_college_id = '${req.params.players_college_id}' and team_id = '${req.params.team_id}';`)
    .then((data) => {
        res.status(200).json({message: "players deleted successfully"});
    })
    .catch((err) => {
        res.status(500).json({message: "database error occured: " + err.message})
    })
}

exports.getPlayersEnrollmentInfo = (req, res) => {
    //expected data from frontend
    // {
    //     players_college_id: ""
    // }

    // check if its a valid college id 
    client
    .query(`select * from participants_auth where college_id = '${req.params.players_college_id}'`)
    .then((data) => {
        if(data.rows.length == 0)
        {
            res.status(404).json({message: "no such participant exist in the database. ask participant to sign up."})
        }
        else{
            client
            .query(`select * from players where player_college_id = '${req.params.players_college_id}'`)
            .then((data) => {
                if(data.rows.length == 0) res.json({
                    message: "player is not registered in any event till now."
                })
                else res.status(200).json(data.rows);
            })
            .catch((err) => {
                res.status(500).json({message: "database error: " + err.message})
            })
        }
    })
}

exports.getEventPlayers = (req, res) => {
    //expected data from frontend
    // {
    //     event_id: ""
    // }

    const event_id = req.params.event_id;

    client
    .query( `select * from players where event_id = '${event_id}';`)
    .then((data) => {
        res.json(data.rows);
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })

}

exports.getTeamPlayers = (req, res) => {
    //expected data from frontend
    // {
    //     team_id: ""
    // }

    const team_id = req.params.team_id;

    client
    .query( `select * from players where team_id = '${team_id}';`)
    .then((data) => {
        res.json(data.rows);
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })

}

exports.getPlayerInfo = async (req, res) => {
    //expected data from frontend
    // {
    //     players_college_id: ""
    // }
    
    client
    .query( `select * from participants_info where college_id = '${req.params.players_college_id}';`)
    .then((data) => {
        res.json(data.rows[0]);
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}

exports.getAllPlayers = (req, res) =>{
    client
    .query( `select * from players`)
    .then((data) => {
        res.json(data.rows);
    })
    .catch((err)=>{
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}
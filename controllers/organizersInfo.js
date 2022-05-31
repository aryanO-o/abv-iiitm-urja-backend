const client = require("../config/db");

exports.getOrganizersInfo = (req,res) => {
    client
    .query( `select * from organizers_info where login_id = '${req.organizer_login_id}';`)
    .then((data) => {
        res.send(data.rows[0]);
    })
    .catch((err) => {
        res.status(500).send("database error: " + err.message);
    })
}

exports.deleteOrganizer = (req, res) => {

    if(req.organizer_login_id === 'supervisor') {
        res.status(400).json({
            message: 'cannot delete supervisors information'
        })
    }
    else{
        client
        .query( `select * from organizers_auth where login_id = '${req.organizer_login_id}';`)
        .then((data) => {
            if(data.rows.length == 0) {
                res.json({
                    message: 'login_id does not match with any organizer.'
                })
            }else {
                client
                .query( `delete from organizers_info where login_id = '${req.organizer_login_id}';`)
                .then((data) => {
                    client
                    .query( `delete from organizers_auth where login_id = '${req.organizer_login_id}';`)
                    .then((data) => {
                        res.json({
                            message: "organizer deleted successfully"
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "database error occurred" + err
                        })
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "database error occurred" + err
                    })
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "database error occurred" + err
            })
        })
    }   
}
const client = require("../config/db");

exports.getOrganizerInfo = (req,res) => {
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

exports.updateOrganizerInfo = (req, res) => {
    const {login_id, college_id, name, year, branch, whatsapp_country_code, whatsapp_number, mobile_number_country_code, mobile_number} = req.body;

    const query = `update  organizers_info set college_id = '${college_id}', name =  '${name}', year = '${year}', branch = '${branch}', whatsapp_country_code ='${whatsapp_country_code}', whatsapp_number = '${whatsapp_number}', mobile_number_country_code = '${mobile_number_country_code}', mobile_number = '${mobile_number}' where login_id = '${login_id}';`

    client
    .query(query)
    .then((data) => {
        res.json({
            message: "organizers_info updated successfully."
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error occured: " + err.message
        })
    })
}

exports.getRolePlayersInfo = (req, res) => {
    client
    .query(`select * from organizers_info inner join organizers_auth using (login_id) where role = '${req.role_player}';`)
    .then((data) => {
        res.send(data.rows);
    })
    .catch((err) => {
        res.status(500).json({ 
            message: "database error occurred" + err
        })
    })
}


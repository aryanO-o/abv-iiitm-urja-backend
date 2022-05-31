const client = require("../config/db");

exports.getOrganizersInfo = (req,res) => {
    client
    .query( `select * from organizers_auth inner join organizers_info using (login_id) inner join participants_info using (college_id) where login_id = '${req.organizer_login_id}';`)
    .then((data) => {
        res.send(data.rows[0]);
    })
    .catch((err) => {
        res.status(500).send("database error: " + err.message);
    })
}
const client = require("../config/db");

// {
//     "college_id": "bcs_2020015@iiitm.ac.in",
//     "name": "Aryan Dadhich",
//     "year": 3,
//     "branch": "BCS",
//     "whatsapp_country_code": 91,
//     "whatsapp_number": "8764523435",
//     "mobile_number_country_code": 91,
//     "mobile_number": "8764523435"
// }

exports.getParticipantsInfo = (req, res) => {
    const participant_id = req.participant_college_id;
    client
    .query( `SELECT * FROM participants_info WHERE college_id ='${participant_id}'`)
    .then((data) => {
        console.log(data);
        res.send(data.rows[0]);
    })
    .catch((err) => {
        res.status(500).send("database error: " + err.message);
    })
}

exports.updateParticipantsInfo = (req, res) => {
    const participant_id = req.participant_college_id;
    const {name, year, branch, whatsapp_country_code, whatsapp_number, mobile_number_country_code, mobile_number} = req.body;

    client
    .query( `UPDATE participants_info SET name = '${name}', year = '${year}', branch = '${branch}', whatsapp_country_code = '${whatsapp_country_code}', whatsapp_number = '${whatsapp_number}', mobile_number_country_code = '${mobile_number_country_code}', mobile_number = '${mobile_number}' WHERE college_id = '${participant_id}';`)
    .then((data) => {
        res.send("information updated successfully");
    })
    .catch((err) => {
        res.status(500).send("database error: " + err.message);
    })
}

exports.insertParticipantsInfo = (req, res) => {
    const participant_id = req.participant_college_id;
    const {name, year, branch, whatsapp_country_code, whatsapp_number, mobile_number_country_code, mobile_number} = req.body;

    client
    .query( `INSERT INTO participants_info VALUES ( '${participant_id}', '${name}', '${year}', '${branch}', '${whatsapp_country_code}','${whatsapp_number}', '${mobile_number_country_code}',  '${mobile_number}');`)
    .then((data) => {
        res.send("information inserted successfully");
    })
    .catch((err) => {
        res.status(500).send("database error: " + err.message);
    })
}
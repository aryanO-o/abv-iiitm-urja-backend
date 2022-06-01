const client = require("../config/db");
const { HOUSE_CAPTAIN, COORDINATOR, EVENT_COORDINATOR } = require("../utils/strings");

exports.createForm = (req, res) => {
    // expected data from frontend
    // {
    //     to_select: "";
    // }

    const {to_select} = req.body;

    client
    .query( `insert into forms values (default, '${to_select}');`)
    .then((data) => {
        res.json({
            message: "form created successfully."
        })
    })
    .catch((err) => {
        res.status(err.status).json({
            message: "database error: " + err.message
        })
    })
}

exports.applyToForm = (req, res) => {
    // expected data from frontend
    // {
    //     college_id: "",
    // }

    const form_id = req.form_id;
    const {college_id } = req.body;

    client
    .query( `select * from participants_info where college_id = '${college_id}'`)
    .then((data) => {
        if(data.rows.length == 0) {
            res.json({
                message: "sign in and fill your participants_info form before applying for any position."
            })
        }
        else{
            client
            .query( `insert into forms_data values('${form_id}', '${college_id}');`)
            .then((data) => {
                res.json({
                    message: "successfully applied for the role." 
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "datbase error: " + err.message
                })
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })

}

exports.getApplications = (req, res) => {
    
    const form_id = req.form_id;
    client
    .query( `select * from forms inner join forms_data using (form_id) inner join participants_info using (college_id) where form_id = '${form_id}';`)
    .then((data) => {
        res.json(data.rows);
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}
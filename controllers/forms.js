const { request } = require("express");
const { client } = require("../config/postgreSQLdb");


exports.createForm = (req, res) => {
    // expected data from frontend
    // {
    //     to_select: "";
    //     is_active
    // }

    const {to_select, is_active} = req.body;

    client
    .query( `insert into forms values (default, '${to_select}', '${is_active}');`)
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
            .query(`select * from forms_data where form_id = '${form_id}' and college_id = '${college_id}'`)
            .then((data) => {
                if(data.rowCount == 0){
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
                }else{
                    res.json({
                        message: "you have already applied for the role."
                    })
                }
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
    .query( `select * from forms inner join forms_data on forms.id = forms_data.form_id inner join participants_info using (college_id) where form_id = '${form_id}';`)
    .then((data) => {
        res.json(data.rows);
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}

exports.updateForm = (req, res) => {
    const form_id = req.form_id;

    client
    .query( `update forms set to_select = '${req.body.to_select}', is_active = '${req.body.is_active}' where id = '${form_id}';`)
    .then((data) => {
        res.json({
            message: "form updated successfully",
            noOfRows: data.rowCount
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}

exports.getActiveForm = (req, res) => {
    client
    .query( `select * from forms where is_active = 't'`)
    .then((data) => {
        res.json(data.rows);
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}

exports.getAllForms = (req, res) => {
    client
    .query(`select * from forms`)
    .then((data) => {
        res.json(data.rows)
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}

exports.deleteForm = (req, res) => {
    
    client
    .query(`delete from forms where id = '${Number( req.params.form_id)}'`)
    .then((data) => {
        res.json(
            {
                message: "form deleted successfully.",
                noOfRows: data.rowCount
            }
        )
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error: " + err.message
        })
    })
}

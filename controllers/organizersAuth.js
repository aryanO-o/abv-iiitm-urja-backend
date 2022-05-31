// exporting jsonwebtoken
const jwt = require('jsonwebtoken');

// requiring bcrypt to safely crypt password
const bcrypt = require('bcrypt');
const client = require('../config/db');

//exporting functions for routes folders router middlewares
// kuch middlewares aese hote he jo next use nai krte vhi se kam kr dete he and ye aese hi middlewares he to confuse nai hona.

// exporting function for sign up middleware
exports.organizersSignUp = (req, res) => {
    // expected data from frontend
    //  {
    //      role: "",  
    //      login_id: "",
    //      password: "",
    //      college_id: "",
    //      name: "",
    //      year: "",
    //      branch: "",
    //      whatsapp_country_code: "",
    //      whatsapp_number: "",
    //      mobile_number_country_code: "",
    //      mobile_number: "",
    //  }

    const {role, login_id, password, college_id, name, year, branch, whatsapp_country_code, whatsapp_number, mobile_number_country_code, mobile_number} = req.body;

    //step1: check if user already exist
    //step2: hash password
    //step3: generate token
    //step4: send response to user with token.

    //step1: check if user already exist
    client
    .query(`SELECT * FROM organizers_auth WHERE login_id = '${login_id}'`)
    .then((data) => {
        if(data.rows.length != 0)
        {
            res.json({
                message: "user already exist, sign in instead"
            })
        }else{
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if(err) res.status(500).json({
                    message: "error in hashing the password: " + err.message
                })
                else{
                    client
                    .query(`INSERT INTO  organizers_info VALUES ('${login_id}', '${college_id}', '${name}', '${year}', '${branch}', '${whatsapp_country_code}', '${whatsapp_number}', '${mobile_number_country_code}', '${mobile_number}');`)
                    .then((data) => {

                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "database error occured: " + err.message
                        })
                    })

                    client
                    .query(`INSERT INTO  organizers_auth VALUES ('${login_id}', '${hashedPassword}', '${role}')`)
                    .then((data) => {
                        var token = jwt.sign({
                            role: role,
                            login_id: login_id,
                            college_id: college_id
                        }, process.env.SECRET_KEY)

                        res.json({
                            message: 'sign up successfully',
                            token: token
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "database error occured: " + err.message
                        })
                    })        
                }
            })
        }
    })
    .catch((err) => {
        res.json({
            message: "database errored out. " + err
        })
    })
}

exports.organizersSignIn = (req, res) => {

    const { login_id, password} = req.body;
    var role;
    var college_id;

    client
    .query(`SELECT * FROM organizers_auth WHERE login_id = '${login_id}';`)
    .then((data) => {
        if(data.rows.length == 0) {
            res.json({
                message: "No user with this login_id was found, sign up instead."
            })
        }
        else {
            bcrypt.compare(password, data.rows[0].password, (err, result) => {
                if(err) res.status(500).json({message: "server error" + err})
                else if(result == true){

                    // forming token that can have role and college_id also so making db request to fetch it
                    client
                    .query(`select * from organizers_auth inner join organizers_info using(login_id) where login_id = '${login_id}';`)
                    .then((data) => {
                        role = data.rows[0].role;
                        college_id = data.rows[0].college_id;
                    })
                    .catch((err) => {
                        res.status(500).json({message:"database error: error" + err})
                    })

                    var token = jwt.sign({
                        role: role,
                        login_id: login_id,
                        college_id: college_id
                    }, process.env.SECRET_KEY)

                    res.json({
                        message: 'sign in successfully',
                        token: token
                    })

                }
                else {
                    res.status(200).json({message: "Enter correct password."})
                }
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: "database errored out. " + err
        })
    })
}
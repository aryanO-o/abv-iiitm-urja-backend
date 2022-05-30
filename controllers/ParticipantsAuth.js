// exporting jsonwebtoken
const jwt = require('jsonwebtoken');

// requiring bcrypt to safely crypt password
const bcrypt = require('bcrypt');
const client = require('../config/db');

//exporting functions for routes folders router middlewares
// kuch middlewares aese hote he jo next use nai krte vhi se kam kr dete he and ye aese hi middlewares he to confuse nai hona.

// exporting function for sign up middleware
exports.participnatsSignUp = (req, res) => {

    // expected data from frontend
    //  {
    //      college_id: "",
    //      password: "",
    //  }

    // req.body se ham sare fields extract krke corresponding variables me dal denge.
    const { college_id, password } = req.body;

    //step1: check if the id is @iiitm.ac.in or not
    //step2: check if user already exist
    //step3: hash password
    //step4: generate token
    //step5: send response to user with token.

    // step1
    if (!college_id.includes("@")) {
        res.status(400).send("sign up with your institute id.");
    }
    else {

        const substringArr = college_id.split("@");
        const emailEnd = "iiitm.ac.in";
        if (substringArr[1] != emailEnd) {
            res.status(400).send("sign up with your institute id")
        } else {
            //step2
            client
                .query(`SELECT * FROM participants_auth WHERE college_id ='${college_id}'`)
                .then((data) => {
                    //2.1 if user already exist.
                    if (data.rowCount != 0) {
                        res.status(400).send("user already exist.");
                    }
                    else {
                        //step3 hash password
                        // 10 is the number of round ..... jyada nai krna kyuki cpu use krta he 
                        bcrypt.hash(password, 10, (err, hashedPassword) => {
                            if (err) res.status(500).send("error in hashing the password.");
                            else {
                                //insert user in the database , generate token and send tokens
                                client
                                    .query(`INSERT INTO participants_auth VALUES ('${college_id}', '${hashedPassword}');`)
                                    .then((data) => {

                                        var token = jwt.sign({
                                            college_id: college_id,
                                        }, process.env.SECRET_KEY);

                                        res.json({
                                            message: 'sign up successfully',
                                            token: token
                                        })
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                        res.staus(500).send("database error occured")
                                    })
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.staus(500).send("database error occured")
                })
        }
    }
}

// exporting function for sign in middleware
exports.participnatsSignIn = (req, res) => {

    // expected data from frontend
    //  {
    //      college_id: "",
    //      password: "",
    //  }

    // req.body se ham sare fields extract krke corresponding variables me dal denge.
    const { college_id, password } = req.body;

    //step1: check if the id is @iiitm.ac.in or not
    //step2: check if user already exist
    //step3: compare password
    //step4: sign in

    // step1
    if (!college_id.includes("@")) {
        res.status(400).send("login with your institute id.");
    }
    else {

        const substringArr = college_id.split("@");
        const emailEnd = "iiitm.ac.in";
        if (substringArr[1] != emailEnd) {
            res.status(400).send("login with your institute id")
        } else {
            //step2
            client
                .query(`SELECT * FROM participants_auth WHERE college_id ='${college_id}'`)
                .then((data) => {
                    //2.1 if user already exist.
                    if (data.rowCount == 0) {
                        res.status(400).send("user does not exist. sign up");
                    }
                    else {
                        //step3 compare password
                        // 10 is the number of round ..... jyada nai krna kyuki cpu use krta he 
                        // Load hash from your password DB.

                        bcrypt.compare(password, data.rows[0].password, function (err, result) {
                            if(err) res.status(500).send("server error");
                            else if(result == true)
                            {
                                var token = jwt.sign({
                                    college_id: college_id,
                                }, process.env.SECRET_KEY);

                                res.json({
                                    message: 'sign in successfull',
                                    token: token
                                })
                            }
                            else res.status(400).send("enter correct password");
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.staus(500).send("database error occured")
                })
        }
    }

}
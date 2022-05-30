const jwt = require('jsonwebtoken');
const client = require('../config/db');

exports.verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        
        if (err) {
            console.log("error: " + err);
            res.status(500).send("err: "+ err);
        }
        else {
            
            //checking if the user actually exist in the database.
            client
                .query(`SELECT * FROM participants_auth WHERE college_id ='${tokenData.college_id}'`)
                .then((data) => {
                    console.log("here i am");
                    if(data.rows.length == 0) {
                        res.status(400).send("unauthorized user");
                    }
                    else{
                        // hamne token me college_id store kr rakhi he students ki and abhi hame token se use toked data me extract kia 
                        // to bas ham ek req ke andar ek variable bna dete he jiski help se ham college_id use kr pae baki jgaho pe
                        // but yaha pe ek problem ye vo ye ki supervisor coordinators vgera ko jab info chahie hogi to token me unki id store hogi

                        req.sender_id = tokenData.college_id;

                        next();
                    }
                })
                .catch((err) => {
                    res.status(500).send("database error occured: ", err)
                })
        }
    })

    
}
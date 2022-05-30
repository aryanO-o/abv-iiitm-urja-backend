// getting express
const express = require('express');

// initialization of router
const router = express.Router(); 

// getting the functions for the router middlewares form the corresponding controllers file
const { participnatsSignIn, participnatsSignUp } = require('../controllers/ParticipantsAuth');



router.post('/participants-sign-up', participnatsSignUp)
router.post('/participants-sign-in', participnatsSignIn)

router.get('', (req, res)=>{
    res.send("han bhai /auth tk aa gya.");
    
})


// exporting all routes
module.exports = router;




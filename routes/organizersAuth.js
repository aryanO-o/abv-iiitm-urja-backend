const express = require('express');
const { organizersSignUp, organizersSignIn } = require('../controllers/organizersAuth');

const router = express.Router();

router.post('/sign-up', organizersSignUp)

router.post('/sign-in', organizersSignIn)

module.exports = router;
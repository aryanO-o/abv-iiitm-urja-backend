const express = require('express');
const { organizersSignUp, organizersSignIn } = require('../controllers/organizersAuth');

const router = express.Router();

router.get('/sign-up', organizersSignUp)

router.get('/sign-in', organizersSignIn)

module.exports = router;
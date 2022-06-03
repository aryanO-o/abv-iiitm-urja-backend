const express = require('express');
const { sendMessages, getMessages } = require('../controllers/messages');
const { verifyToken } = require('../middlewares/authMiddlewares');
const { getRolePlayer } = require('../middlewares/messagesMiddlewares');

const router = express.Router();

router.param('role_player', getRolePlayer )

router.get('/get/:role_player', verifyToken, getMessages )

router.post('/send/:role_player', verifyToken, sendMessages)

module.exports = router;
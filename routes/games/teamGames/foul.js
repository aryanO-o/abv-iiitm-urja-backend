const express = require('express');
const { foulInEvent, addFoul, removeFoul } = require('../../../controllers/games/teamGames/foul');
const {verifyOrganizersToken} = require('../../../middlewares/authMiddlewares')
const router = express.Router();

router.get('/get/in-event/:event_id', verifyOrganizersToken, foulInEvent);
router.post('/add', verifyOrganizersToken, addFoul);
router.delete('/delete/:foul_id', verifyOrganizersToken, removeFoul)

module.exports = router;
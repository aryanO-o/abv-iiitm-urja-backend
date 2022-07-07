const express = require('express');
const { createSnookerGame, updateSnookerGame, setWinner, getAllSnookerGames, getSnookerGameById } = require('../../../../controllers/games/teamGames/snooker/snooker');
const { verifyOrganizersToken, verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const router = express.Router();

router.post('/add', verifyOrganizersToken, createSnookerGame);
router.put('/update/:event_id', verifyOrganizersToken, updateSnookerGame);
router.get('/get/all', verifyToken, getAllSnookerGames);
router.put('/set-winner/:event_id', verifyCoordinatorsToken, setWinner )
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getSnookerGameById)

module.exports = router
const express = require('express');
const { createFootballGame, updateFootballGame, getAllFootBallGames, setWinner, getFootballGameById } = require('../../../../controllers/games/teamGames/football/football');
const { verifyOrganizersToken, verifyToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createFootballGame);
router.put('/update/:event_id', verifyOrganizersToken, updateFootballGame);
router.get('/get/all', verifyToken, getAllFootBallGames);
router.post('/set-winner/:event_id', verifyOrganizersToken, setWinner);
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getFootballGameById)

module.exports = router;
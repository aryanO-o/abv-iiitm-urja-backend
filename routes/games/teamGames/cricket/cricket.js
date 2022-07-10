const express = require('express');
const { createCricketGame, getAllCricketGames, setWinner, getCricketGameById } = require('../../../../controllers/games/teamGames/cricket/cricket');
const { verifyOrganizersToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createCricketGame);
router.get('/get/all', verifyOrganizersToken, getAllCricketGames);
router.post('/set-winner/:event_id', verifyOrganizersToken, setWinner);
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getCricketGameById);

module.exports = router;
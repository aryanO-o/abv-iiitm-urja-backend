const express = require('express');
const { createBasketballGame, updateBasketballGame, getAllBasketBallGames, setWinner, getBasketballGameById } = require('../../../../controllers/games/teamGames/baketball/basketball');
const { verifyOrganizersToken, verifyToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createBasketballGame);
router.put('/update/:event_id', verifyOrganizersToken, updateBasketballGame);
router.get('/get/all', verifyToken, getAllBasketBallGames);
router.post('/set-winner/:event_id', verifyOrganizersToken, setWinner);
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getBasketballGameById);

module.exports = router;
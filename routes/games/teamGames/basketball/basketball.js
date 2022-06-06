const express = require('express');
const { createBasketballGame, updateBasketballGame, getAllBasketBallGames } = require('../../../../controllers/games/teamGames/baketball/basketball');
const { verifyOrganizersToken, verifyToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createBasketballGame);
router.put('/update/:event_id', verifyOrganizersToken, updateBasketballGame);
router.get('/get/all', verifyToken, getAllBasketBallGames);

module.exports = router;
const express = require('express');
const { getAllGames, createGame, updateGame, deleteGame } = require('../../controllers/games/game');
const { verifyToken, verifyOrganizersToken } = require('../../middlewares/authMiddlewares');
const { getGameId } = require('../../middlewares/gameMiddlewares');
const router = express.Router();

router.param('game_id', getGameId)

router.get('/get/all', verifyToken, getAllGames);
router.post('/add', verifyOrganizersToken, createGame);
router.put('/update/:game_id', verifyOrganizersToken, updateGame);
router.delete('/delete/:game_id', verifyOrganizersToken, deleteGame);

module.exports = router;
const express = require('express');
const { createChessGame, updateChessGame, getChessGameById, getAllChessGames, deleteChessGame } = require('../../../../controllers/games/individualGames/chess/chess');
const { verifyOrganizersToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createChessGame);
router.get('/get/all', verifyOrganizersToken, getAllChessGames);
router.post('/update/:event_id', verifyOrganizersToken, updateChessGame);
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getChessGameById);
router.delete('/delete/:eventId', verifyOrganizersToken, deleteChessGame);

module.exports = router
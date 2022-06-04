const express = require('express');
const { getAllPlayers, addPlayer, removePlayer, updatePlayer } = require('../../controllers/games/player');
const { verifyOrganizersToken, verifyToken } = require('../../middlewares/authMiddlewares');
const router = express.Router();

router.get('/get/all-players', verifyToken, getAllPlayers);
router.post('/add', verifyOrganizersToken, addPlayer);
router.delete('/delete/:player_id', verifyOrganizersToken, removePlayer);
router.put('/update/:player_id', verifyOrganizersToken, updatePlayer);

module.exports = router;
const express = require('express');
const { createSquashGame, updateSquashGame, getAllSquashGames, setWinner, getSquashGameById, deleteSquashGame } = require('../../../../controllers/games/teamGames/squash/squash');
const { verifyOrganizersToken, verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const router = express.Router();

router.post('/add', verifyOrganizersToken, createSquashGame);
router.put('/update/:event_id', verifyOrganizersToken, updateSquashGame);
router.get('/get/all', verifyToken, getAllSquashGames);
router.put('/set-winner/:event_id', verifyCoordinatorsToken, setWinner )
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getSquashGameById)
router.delete('/delete/:eventId', verifyOrganizersToken, deleteSquashGame);

module.exports = router
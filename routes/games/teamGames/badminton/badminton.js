const express = require('express');
const { verifyOrganizersToken, verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const { createBadmintonGame, updateBadmintonGame, getAllBadmintonGames, setWinner } = require('../../../../controllers/games/teamGames/badminton/badminton');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createBadmintonGame);
router.put('/update/:event_id', verifyOrganizersToken, updateBadmintonGame);
router.get('/get/all', verifyToken, getAllBadmintonGames);
router.put('/set-winner/:event_id', verifyCoordinatorsToken, setWinner)

module.exports = router
const express = require('express');
const { verifyOrganizersToken, verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const { createBadmintonGame, updateBadmintonGame, getAllBadmintonGames, setWinner, getBadmintonGameById, deleteBadmintonGame } = require('../../../../controllers/games/teamGames/badminton/badminton');
const { Router } = require('express');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createBadmintonGame);
router.put('/update/:event_id', verifyOrganizersToken, updateBadmintonGame);
router.get('/get/all', verifyToken, getAllBadmintonGames);
router.put('/set-winner/:event_id', verifyCoordinatorsToken, setWinner)
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getBadmintonGameById)
router.delete('/delete/:eventId', verifyOrganizersToken, deleteBadmintonGame);

module.exports = router
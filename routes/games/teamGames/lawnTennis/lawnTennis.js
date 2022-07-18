const express = require('express');
const { createLawnTennisGame, updateLawnTennisGame, getAllLawnTennisGames, setWinner, getLawnTennisGameById, deleteLawnTennisGame } = require('../../../../controllers/games/teamGames/lawnTennis/lawnTennis');
const { verifyOrganizersToken, verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const router = express.Router();

router.post('/add', verifyOrganizersToken, createLawnTennisGame);
router.put('/update/:event_id', verifyOrganizersToken, updateLawnTennisGame);
router.get('/get/all', verifyToken, getAllLawnTennisGames);
router.put('/set-winner/:event_id', verifyCoordinatorsToken, setWinner )
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getLawnTennisGameById)
router.delete('/delete/:eventId', verifyOrganizersToken, deleteLawnTennisGame);

module.exports = router
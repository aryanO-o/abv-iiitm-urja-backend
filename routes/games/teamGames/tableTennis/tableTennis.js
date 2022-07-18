const express = require('express');
const { createTableTennisGame, updateTableTennisGame, getAllTableTennisGames, setWinner, getTableTennisGameById, deleteTableTennisGame } = require('../../../../controllers/games/teamGames/tableTennis/tableTennis');
const { verifyOrganizersToken, verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const router = express.Router();

router.post('/add', verifyOrganizersToken, createTableTennisGame);
router.put('/update/:event_id', verifyOrganizersToken, updateTableTennisGame);
router.get('/get/all', verifyToken, getAllTableTennisGames);
router.put('/set-winner/:event_id', verifyCoordinatorsToken, setWinner )
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getTableTennisGameById)
router.delete('/delete/:eventId', verifyOrganizersToken, deleteTableTennisGame);

module.exports = router
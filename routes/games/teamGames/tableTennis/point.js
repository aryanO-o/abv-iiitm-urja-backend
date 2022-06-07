const express = require('express');
const { addPoint, removePoint, getPoint, getAllPointsOfSet, allPointsByTeamInSet, allPointsByTeam, allPointsByPlayer, allPointsByPlayerInSet } = require('../../../../controllers/games/teamGames/tableTennis/point');
const { verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const router = express.Router();

router.post('/add', verifyCoordinatorsToken, addPoint);
router.delete('/delete/:point_id', verifyCoordinatorsToken, removePoint);
router.get('/get/point/:point_id', verifyToken, getPoint);
router.get('/get/all-points-of-set', verifyToken, getAllPointsOfSet);
router.get('/get/all-points-by-team-in-set',verifyToken, allPointsByTeamInSet);
router.get('/get/all-points-by-team', verifyToken, allPointsByTeam);
router.get('/get/all-points-by-player', verifyToken, allPointsByPlayer);
router.get('/get/all-points-by-player-in-set', verifyToken, allPointsByPlayerInSet);

module.exports = router
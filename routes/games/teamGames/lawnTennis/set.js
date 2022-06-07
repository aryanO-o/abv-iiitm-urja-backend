const express = require('express');
const { addSet, removeSet, updateSet, getSet, getAllSetsOfEvent, setWinnerOfSet, allSetsWonByTeamInEvent } = require('../../../../controllers/games/teamGames/lawnTennis/set');
const { verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const router = express.Router();

router.post('/add', verifyCoordinatorsToken, addSet);
router.delete('/delete/:set_id', verifyCoordinatorsToken, removeSet);
router.put('/update/:set_id', verifyCoordinatorsToken, updateSet);
router.get('/get/set/:set_id', verifyToken, getSet);
router.get('/get/all-sets-of-event', verifyToken, getAllSetsOfEvent);
router.post('/set-winner/:set_id', verifyCoordinatorsToken,setWinnerOfSet);
router.get('/get/all-sets-won-by-team-in-event', verifyToken, allSetsWonByTeamInEvent);

module.exports = router
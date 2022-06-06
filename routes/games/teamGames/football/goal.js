const express = require('express');
const {getGoal, removeGoal, addGoal, getAllGoalsOfEvent, allGoalsByTeamInEvent, allGoalsByTeam, allGoalsByPlayer, allGoalsByPlayerInEvent} = require('../../../../controllers/games/teamGames/football/goal')
const { verifyCoordinatorsToken, verifyToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.get('/get/goal/:goal_id', verifyCoordinatorsToken, getGoal);
router.delete('/delete/:goal_id', verifyCoordinatorsToken, removeGoal);
router.post('/add', verifyCoordinatorsToken, addGoal)
router.get('/get/all-goals-of-event/', verifyToken, getAllGoalsOfEvent);
router.get('/get/all-goals-by-team-in-event', verifyToken, allGoalsByTeamInEvent);
router.get('/get/all-goals-by-team', verifyToken, allGoalsByTeam);
router.get('/get/all-goals-by-player', verifyToken, allGoalsByPlayer);
router.get('/get/all-goals-by-player-in-event', verifyToken, allGoalsByPlayerInEvent);

module.exports = router
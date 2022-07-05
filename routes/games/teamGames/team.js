const express = require('express');
const { createTeam, getAllPlayersOfTeam, changeHouseName, addPlayerToTeam, removePlayerFromTeam, removeTeam, getAllTeams, getTeamById } = require('../../../controllers/games/teamGames/team');
const {verifyOrganizersToken} = require('../../../middlewares/authMiddlewares')
const router = express.Router();

router.get('/get/all-players/:team_id', verifyOrganizersToken, getAllPlayersOfTeam);
router.post('/add', verifyOrganizersToken, createTeam);
router.put('/update/house-name/:team_id', verifyOrganizersToken, changeHouseName);
router.put('/add/player/:team_id', verifyOrganizersToken, addPlayerToTeam);
router.put('/remove/player/:team_id/:player_id', verifyOrganizersToken, removePlayerFromTeam);
router.delete('/remove/team/:team_id', verifyOrganizersToken, removeTeam);
router.get('/get/all-teams', verifyOrganizersToken, getAllTeams)
router.get('/get/team-by-id/:team_id', verifyOrganizersToken, getTeamById)

module.exports = router;


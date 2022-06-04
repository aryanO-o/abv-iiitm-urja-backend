const express = require('express');
const { getAllPlayers, getPlayerInfo, getTeamPlayers, getEventPlayers, getPlayersEnrollmentInfo, addPlayer, removePlayer } = require('../controllers/players');
const { verifyOrganizersToken, verifyToken } = require('../middlewares/authMiddlewares');
const router = express.Router();

router.get('/get/all-players', verifyToken, getAllPlayers);
router.get('/get-info/:players_college_id', verifyOrganizersToken, getPlayerInfo);
router.get('/get-team-players/:team_id', verifyOrganizersToken, getTeamPlayers);
router.get('/get-event-players/:event_id', verifyOrganizersToken, getEventPlayers);
router.get('/get/player-enrollment-info/:players_college_id', verifyOrganizersToken, getPlayersEnrollmentInfo);
router.post('/add', verifyOrganizersToken, addPlayer);
router.delete('/delete/:event_id/:team_id/:players_college_id', verifyOrganizersToken, removePlayer);

module.exports = router;
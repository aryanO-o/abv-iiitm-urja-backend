const express = require('express');
const { getAllTeams, createTeam, updateTeam, deleteTeam } = require('../controllers/teams');
const { verifyToken, verifySupervisorsToken } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.get('/get/all-teams', verifyToken, getAllTeams);
router.post('/add-team', verifySupervisorsToken, createTeam);
router.put('/update/:team_id', verifySupervisorsToken, updateTeam);
router.delete('/delete/:team_id', verifySupervisorsToken, deleteTeam);

module.exports = router;
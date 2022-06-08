const express = require('express');
const { createVolleyballGame, updateVolleyvallGame, getAllVolleyballGames, setWinner } = require('../../../../controllers/games/teamGames/volleyball/volleyball');
const { verifyOrganizersToken, verifyToken, verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares')
const router = express.Router();

router.post('/add', verifyOrganizersToken, createVolleyballGame);
router.put('/update/:event_id', verifyOrganizersToken, updateVolleyvallGame);
router.get('/get/all', verifyToken, getAllVolleyballGames);
router.put('/set-winner/:event_id', verifyCoordinatorsToken, setWinner )

module.exports = router
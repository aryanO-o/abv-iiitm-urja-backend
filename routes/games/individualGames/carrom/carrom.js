const express = require('express');
const { createCarromGame, updateCarromGame, getCarromGameById, getAllCarromGames, deleteCarromGame } = require('../../../../controllers/games/individualGames/carrom/carrom');
const { verifyOrganizersToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.post('/add', verifyOrganizersToken, createCarromGame);
router.get('/get/all', verifyOrganizersToken, getAllCarromGames);
router.post('/update/:event_id', verifyOrganizersToken, updateCarromGame);
router.get('/get/game-by-id/:eventId', verifyOrganizersToken, getCarromGameById);
router.delete('/delete/:eventId', verifyOrganizersToken, deleteCarromGame);

module.exports = router
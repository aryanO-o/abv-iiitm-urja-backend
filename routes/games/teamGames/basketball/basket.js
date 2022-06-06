const express = require('express');
const { addBasket, removeBasket, getBasket, updateBasket, getAllBasketsOfEvent, allBasketsByTeamInEvent, allBasketsByTeam, allBasketsByPlayer, allBasketsByPlayerInEvent } = require('../../../../controllers/games/teamGames/baketball/basket');
const { verifyCoordinatorsToken, verifyToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.get('/get/basket/:basket_id', verifyCoordinatorsToken, getBasket);
router.delete('/delete/:basket_id', verifyCoordinatorsToken, removeBasket);
router.post('/add', verifyCoordinatorsToken, addBasket)
// router.put('/update/:basket_id', verifyCoordinatorsToken, updateBasket)
router.get('/get/all-baskets-of-event/', verifyToken, getAllBasketsOfEvent);
router.get('/get/all-baskets-by-team-in-event', verifyToken, allBasketsByTeamInEvent);
router.get('/get/all-baskets-by-team', verifyToken, allBasketsByTeam);
router.get('/get/all-baskets-by-player', verifyToken, allBasketsByPlayer);
router.get('/get/all-baskets-by-player-in-event', verifyToken, allBasketsByPlayerInEvent);

module.exports = router
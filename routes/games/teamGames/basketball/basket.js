const express = require('express');
const { addBasket, removeBasket, getBasket, updateBasket } = require('../../../../controllers/games/teamGames/baketball/basket');
const { verifyCoordinatorsToken } = require('../../../../middlewares/authMiddlewares');
const router = express.Router();

router.get('/get/:basket_id', verifyCoordinatorsToken, getBasket);
router.delete('/delete/:basket_id', verifyCoordinatorsToken, removeBasket);
router.post('/add', verifyCoordinatorsToken, addBasket)
router.put('/update/:basket_id', verifyCoordinatorsToken, updateBasket)

module.exports = router
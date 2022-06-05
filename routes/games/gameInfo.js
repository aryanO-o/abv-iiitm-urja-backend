const express = require('express');
const { getGameInfo, createGameInfo, updateGameInfo, deleteGameInfo } = require('../../controllers/games/gameinfo');
const {verifyToken, verifyOrganizersToken} = require('../../middlewares/authMiddlewares');
const { getGameInfoId } = require('../../middlewares/gameInfoMIddlewares');
const router = express.Router();

router.param('gameInfo_id', getGameInfoId)

router.get('/get/:gameInfo_id', verifyToken, getGameInfo);
router.post('/add',verifyOrganizersToken, createGameInfo);
router.put('/update/:gameInfo_id', verifyOrganizersToken, updateGameInfo);
router.delete('/delete/:gameInfo_id', verifyOrganizersToken, deleteGameInfo);

module.exports = router;
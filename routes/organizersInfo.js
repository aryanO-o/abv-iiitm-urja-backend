const express = require('express');
const router = express.Router();
const { verifyOrganizersToken } = require('../middlewares/authMiddlewares');
const { getOrganizersLoginId, getRole} = require('../middlewares/organizersInfoMiddlewares')

const {getOrganizerInfo, deleteOrganizer, getRolePlayersInfo, updateOrganizerInfo} = require('../controllers/organizersInfo')

router.param('login_id', getOrganizersLoginId);
router.param('role_players_info', getRole)

router.get('/get/:login_id', verifyOrganizersToken, getOrganizerInfo);

router.delete('/delete/:login_id', verifyOrganizersToken, deleteOrganizer)

router.put('/update/:login_id', verifyOrganizersToken, updateOrganizerInfo)

router.get('/get/role-players/:role_players_info', verifyOrganizersToken, getRolePlayersInfo)

module.exports = router;
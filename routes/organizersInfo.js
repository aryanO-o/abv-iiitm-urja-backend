const express = require('express');
const router = express.Router();
const { verifyOrganizersToken } = require('../middlewares/authMiddlewares');
const { getOrganizersLoginId } = require('../middlewares/organizersInfoMiddlewares')

const {getOrganizersInfo, deleteOrganizer} = require('../controllers/organizersInfo')

router.param('login_id', getOrganizersLoginId);

router.get('/get/:login_id', verifyOrganizersToken, getOrganizersInfo);

router.delete('/delete/:login_id', verifyOrganizersToken, deleteOrganizer)

module.exports = router;
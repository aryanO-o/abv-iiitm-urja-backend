const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddlewares');
const { getOrganizersLoginId } = require('../middlewares/organizersInfoMiddlewares')

const {getOrganizersInfo} = require('../controllers/organizersInfo')

router.param('login_id', getOrganizersLoginId);

router.get('/get/:login_id', verifyToken, getOrganizersInfo);
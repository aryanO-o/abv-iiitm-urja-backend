const express = require('express');
const {verifyOrganizersToken, verifyToken} = require('../middlewares/authMiddlewares')
const { createForm, applyToForm, getApplications } = require('../controllers/forms');
const { getFormId } = require('../middlewares/formMiddlewares');

const router = express.Router();

router.param('form_id', getFormId)

router.post('/create', verifyOrganizersToken ,createForm);

router.post('/apply/:form_id', verifyToken, applyToForm)

router.get('/get-applications/:form_id', verifyToken, getApplications)

module.exports = router;
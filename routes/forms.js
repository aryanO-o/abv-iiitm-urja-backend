const express = require('express');
const {verifyOrganizersToken, verifyToken} = require('../middlewares/authMiddlewares')
const { createForm, applyToForm, getApplications, updateForm, getActiveForm, getAllForms, deleteForm } = require('../controllers/forms');
const { getFormId } = require('../middlewares/formMiddlewares');

const router = express.Router();

router.param('form_id', getFormId)

router.post('/create', verifyOrganizersToken ,createForm);

router.post('/apply/:form_id', applyToForm)

router.get('/get-applications/:form_id', getApplications)

router.post('/update/:form_id', verifyOrganizersToken, updateForm);

router.get('/get-active-forms', getActiveForm);

router.get('/get-all-forms', getAllForms);

router.delete('/delete/:form_id', verifyOrganizersToken, deleteForm)

module.exports = router;
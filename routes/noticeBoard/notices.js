const express = require('express');
const { getAllNotices, createNotice, updateNotice, deleteNotice } = require('../../controllers/noticeBoard/notices');
const { verifyToken, verifyOrganizersToken } = require('../../middlewares/authMiddlewares');
const router = express.Router();

router.get('/get/all-notices/:role', verifyToken, getAllNotices);
router.post('/add', verifyOrganizersToken, createNotice);
router.put('/update/:notice_id', verifyOrganizersToken, updateNotice)
router.delete('/delete/:notice_id', verifyOrganizersToken, deleteNotice);

module.exports = router;
const express = require('express');
const { getAllNotices, createNotice, updateNotice, deleteNotice, getNoticeById } = require('../../controllers/noticeBoard/notices');
const { verifyToken, verifyOrganizersToken } = require('../../middlewares/authMiddlewares');
const router = express.Router();

router.get('/get/all-notices', verifyToken, getAllNotices);
router.post('/add', verifyOrganizersToken, createNotice);
router.put('/update/:notice_id', verifyOrganizersToken, updateNotice);
router.delete('/delete/:notice_id', verifyOrganizersToken, deleteNotice);
router.get('/get/:noticeId', verifyOrganizersToken, getNoticeById);

module.exports = router;
const express = require('express');
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { verifyToken, verifySupervisorsToken } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.get('/get/all-events', verifyToken, getAllEvents);
router.post('/add-event', verifySupervisorsToken, createEvent);
router.put('/update/:event_id', verifySupervisorsToken, updateEvent);
router.delete('/delete/:event_id', verifySupervisorsToken, deleteEvent);

module.exports = router;
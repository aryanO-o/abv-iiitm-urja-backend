const express = require('express');
const router = express.Router();
const { getParticipantsInfo, updateParticipantsInfo, insertParticipantsInfo } = require('../controllers/participantsInfo');
const { verifyToken } = require('../middlewares/authMiddlewares');
const {getParticipnatCollegeId} = require('../middlewares/participantsInfoMiddlewares')

// ham chahe to bina iske bhi kam kr skte he 
// jis bhi param ki hame jarurat he use bas req.param.us_param_ka_nam krke access kr skte he
// router.param hame facility deta he ki jis bhi end point me vo param aa rha he us request ko handle krte wqt ek middleware chalega
// yaha parameter college_id he and middleware getParticipnatCollegeId he.
router.param("college_id", getParticipnatCollegeId)

router.get('/get/:college_id',verifyToken,  getParticipantsInfo)

router.post('/insert/:college_id', verifyToken, insertParticipantsInfo);

router.put('/update/:college_id', verifyToken, updateParticipantsInfo);

// exporting all routes
module.exports = router;
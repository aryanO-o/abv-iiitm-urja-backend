// is middleware me ham bas itna kr rhe he ki jo college_id param hame mil rha he end points me use ek variable me store kra rhe he participant_college_id me.
exports.getParticipnatCollegeId = (req, res, next, college_id) =>
{
    req.participant_college_id = college_id;
    next();
}
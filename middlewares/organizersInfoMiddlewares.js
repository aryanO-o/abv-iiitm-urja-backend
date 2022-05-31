// is middleware me ham bas itna kr rhe he ki jo login_id param hame mil rha he end points me use ek variable me store kra rhe he participant_college_id me.
exports.getOrganizersLoginId = (req, res, next, login_id) =>
{
    req.organizer_login_id = login_id;
    next();
}
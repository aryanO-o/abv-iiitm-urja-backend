const { ROLE_PLAYERS_ARRAY } = require("../utils/rolePlayers");

exports.getRolePlayer = (req, res, next, role_player) => {
    if(ROLE_PLAYERS_ARRAY.indexOf(role_player) > -1) 
    {
        req.role_player = role_player;
        next();
    }
    else res.status(400).json({
        message: "bad request, send message to either or the role players."
    })
}
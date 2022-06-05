exports.getGameId = (req, res, next, game_id) =>{
    req.game_id = game_id;
    next();
}
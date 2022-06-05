exports.getGameInfoId = (req, res, next, gameInfo_id) =>{
    req.gameInfo_id = gameInfo_id;
    next();
}
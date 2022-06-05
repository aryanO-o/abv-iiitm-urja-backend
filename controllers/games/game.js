const Game = require('../../models/games/Game');
const GameInfo = require('../../models/games/GameInfo');
const { createGameInfo, updateGameInfo, deleteGameInfo, getGameInfo } = require('./gameinfo');

exports.getAllGames = async (req, res) => {
    try{
        const result = await Game.find();
        res.json(result);
    }
    catch(err){
        res.status(500).json({message: "mongodb error: " + err.message});
    }
}

exports.createGame = (req, res) => {
    //expected data from frontend
    // {
    //     gameName: "",
    //     gameTitle: "",
    //     date_and_time: "",
    //     scorer: "",
    //     referee: "",
    //     venue: "",
    //     event_id: "",
    // }
    const {gameName, gameTitle, event_id} = req.body;

    //TODO: write logic to get winning team after the match is finished.
    // it is assumed that first the game is created and then all this info is filled so the event_id is avialable

    createGameInfo(req, res)
    .then((gameInfoData) => {
        const gameInfo_id = gameInfoData._id;

        new Game(
            {
                gameName: gameName,
                gameTitle: gameTitle,
                gameInfo: gameInfo_id,
                event_id: event_id,
            }
        ).save()
        .then((savedGameData) =>{
            res.json({
                gameInfoData: gameInfoData,
                savedGameData: savedGameData
            })
        })
        .catch((err)=>{
            res.status(500).json({message: "mongodb error: " + err.message});
        })
 
    })
    .catch((err)=>{
        res.status(500).json({message: "mongodb error: " + err.message});
    })

}

exports.updateGame = async (req, res) => {
    //expected data from frontend
    // {
    //     game_id:""
    //     gameName: "",
    //     gameTitle: "",
    //     date_and_time: "",
    //     scorer: "",
    //     referee: "",
    //     venue: "",
    //     event_id: "",
    // }
    const {gameName, gameTitle, event_id} = req.body;
    // let thisGame;

    // try{
    //     thisGame = await Game.find({_id: req.game_id});
    // }
    // catch(err){
    //     res.status(500).json({message: "mongodb error: " + err.message});
    // }

    Game.find({_id: req.game_id})
    .then(async (thisGame)=>{
        req.gameInfoId = thisGame[0].gameInfo;
        
        try{
            const updatedGameInfo = await updateGameInfo(req, res);
            const result = await Game.findOneAndUpdate(
                {
                    _id: req.game_id
                },
                {
                    $set: {
                        gameName: gameName,
                        gameTitle: gameTitle,
                        event_id: event_id,
                    }
                },
                {
                    new: true
                }
            )

            res.json({
                updatedGame: result,
                updateGameInfo: updatedGameInfo,
            });

        }
        catch(err){
            res.status(500).json({message: "mongodb error: " + err.message});
        }

    })
    .catch((err) => {
        res.status(500).json({message: "mongodb error: " + err.message});
    })
    
        
}

exports.deleteGame = async (req, res) => {

    Game.find({_id: req.game_id})
    .then(async (thisGame)=>{
        
        
        try{
            req.gameInfo_id = thisGame[0].gameInfo

            const deletedGameInfo = await deleteGameInfo(req, res);
            const result = await Game.findByIdAndDelete(req.game_id)

            res.json({
                deletedGame: result,
                deletedGameInfo: deletedGameInfo,
            });

        }
        catch(err){
            res.status(500).json({message: "mongodb error: " + err.message});
        }

    })
    .catch((err) => {
        res.status(500).json({message: "mongodb error: " + err.message});
    })
    
        
}

//TODO: get all games sayad kisi kam ka ho.
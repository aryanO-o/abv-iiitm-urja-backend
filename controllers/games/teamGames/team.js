// make team , update team, remove team, get teams
// get all team players

const Player = require("../../../models/games/Player");
const Team = require("../../../models/games/teamGames/Team");
const { addPlayer, removePlayer } = require("../player");

exports.createTeam = async (req, res) => {
    //expected data from frontend
    // {
    //     houseName: ""
    // }
    const {houseName} = req.body;
    try{
        const team = await new Team({
            houseName: houseName
        })

        const savedTeam = await team.save();
        res.json(savedTeam);
    }
    catch(err){
        res.status(500).json({
            message: "mongodb error in starting: "+ err
        })
    }
}

exports.changeHouseName = async (req, res) => {
    //expected data from frontend
    // {
    //     houseName: "",
    //     team_id: "",
    // }
    const {houseName} = req.body;
    try{
        const team = await Team.findOneAndUpdate(
            {
                _id: req.params.team_id
            },
            {
                $set: {
                    houseName: houseName
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.json(team);
    }
    catch(err){
        res.status(500).json({
            message: "mongodb error: "+ err
        })
    }
}

exports.addPlayerToTeam = async (req, res) => {
    // expected data from frontend
    // {
    //     team_id: "",
    //     jerseyNo: "",
    //     name: "",
    // }

    try{
        const player = await addPlayer(req,res);
        const player_id = player._id;

        const team = await Team.findOneAndUpdate(
            {_id: req.params.team_id},
            {
                $push: {
                    players: player_id
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(team)

    }
    catch(err){
        res.status(500).json({
            message: "mongodb error: "+ err
        })
    }
}

exports.removePlayerFromTeam = async (req, res) => {
    //expected data from frontend
    // {
    //     player_id: "",
    //     team_id: "",
    // }

    try{
        const team = await Team.findOneAndUpdate(
            {_id: req.params.team_id},
            {
                $pull: {
                    players: req.params.player_id
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
        const deletedPlayer = await Player.findByIdAndDelete(req.params.player_id);

        res.json(deletedPlayer);

    }
    catch(err){
        res.status(500).json({
            message: "mongodb error: "+ err
        })
    }
}

exports.removeTeam = async (req, res) => {
    //expected data from frontend
    // {
    //     team_id: ""
    // }
    let deletedPlayers = [];
    try{
        const result = await Team.find({_id: req.params.team_id});
        let ObjectIdsOfTeamPlayers;
        
        const getTeamPlayerObjectIds = await result.forEach((team) => {
            ObjectIdsOfTeamPlayers = team.players
        })
        
        let teamPlayersIds = [];
        const gettingTeamPlayerIds = await ObjectIdsOfTeamPlayers.forEach((player) => {
                teamPlayersIds.push(player.toString());
        })

        let i = 0;
        while(i< teamPlayersIds.length + 1)
        {
            // console.log("aesa nai he ki mene andar aake nai dekha.")
            const deletedPlayer = await Player.findByIdAndDelete(teamPlayersIds[i])
            if(i< teamPlayersIds.length)
            deletedPlayers.push(deletedPlayer);
            
            if(i == teamPlayersIds.length){
                const deletedTeam = await Team.findByIdAndDelete(req.params.team_id);
                res.json(
                    deletedTeam
                )
                
            }
            i++;
        }

    }
    catch(err) {
        res.status(500).json({
            message: "yaha wali mongodb error: " + err
        })
    }
}

exports.getAllPlayersOfTeam = async (req, res) => {
    //expected data from frontend
    // {
    //     team_id: ""
    // }
    let playerObjects = [];
    let answer;
    try{
        
        const result = await Team.find({_id: req.params.team_id});
        let ObjectIdsOfTeamPlayers;
        const getTeamPlayerObjectIds = await result.forEach((team) => {
            ObjectIdsOfTeamPlayers = team.players
        })
        // console.log(ObjectIdsOfTeamPlayers)
        let teamPlayersIds = [];
        const gettingTeamPlayerIds = await ObjectIdsOfTeamPlayers.forEach((player) => {
                teamPlayersIds.push(player.toString())
        })
 
        teamPlayersIds.forEach((id) => {
            Player.find({_id: id})
            .then((object) => {
                playerObjects.push(object[0]); 
                if(playerObjects.length == teamPlayersIds.length){
                    answer = playerObjects;
                    res.send(answer)
                }
            })
            .catch((err) => {
                res.status(500).send(err)
            })    
        })
        
    }
    catch(err) {
        res.status(500).json({
            message: "mongodb error: " + err
        })
    }
}

exports.getTeamById = async (req, res) => {
    try {
        const result = await Team.findById(req.params.team_id);
        res.json(result);
    }
    catch(err) {
        res.status(500).json({
            message: "mongodb error: " + err
        }) 
    }
}

exports.getAllTeams = async (req, res) => {
    try {
        const result = await Team.find();
        res.json(result);
    }
    catch(err) {
        res.status(500).json({
            message: "mongodb error: " + err
        }) 
    }
}


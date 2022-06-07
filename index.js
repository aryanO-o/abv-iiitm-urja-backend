//requring process env variables
require('dotenv').config()

// requiring the module to be loaded
const express = require('express')
//using cors
const cors = require('cors')

// requiring function to start mongodb connection
const connectMongo = require('./config/mongodb');

// importing the routes
const participantsAuthRoutes = require('./routes/participantsAuth');
const participantsInfoRoutes = require('./routes/participantsInfo');
const organizersAuthRoutes = require('./routes/organizersAuth')
const organizersInfoRoutes = require('./routes/organizersInfo')
const formsRoutes = require('./routes/forms')
const messagesRoutes = require('./routes/messages')
const eventsRoutes = require('./routes/events')
const teamsRoutes = require('./routes/teams')
const playersRoutes = require('./routes/players')
const noticesRoutes = require('./routes/noticeBoard/notices')
const gamePlayersRoutes = require('./routes/games/player')
const gameInfoRoutes = require('./routes/games/gameInfo')
const gamesRoutes = require('./routes/games/game')
const gameTeamsRoutes = require('./routes/games/teamGames/team')
const gameFoulsRoutes = require('./routes/games/teamGames/foul')
const gameBasketRoutes = require('./routes/games/teamGames/basketball/basket')
const gameBasketballRoutes = require('./routes/games/teamGames/basketball/basketball')
const gameGoalRoutes = require('./routes/games/teamGames/football/goal')
const gameFootballRoutes = require('./routes/games/teamGames/football/football')
const gameBadmintonSetsRoutes = require('./routes/games/teamGames/badminton/set')
const gameBadmintonPointsRoutes = require('./routes/games/teamGames/badminton/point')
const gameBadmintonRoutes = require('./routes/games/teamGames/badminton/badminton')
const gameTableTennisPointsRoutes = require('./routes/games/teamGames/tableTennis/point')
const gameTableTennisSetsRoutes = require('./routes/games/teamGames/tableTennis/set')
const gameTableTennisRoutes = require('./routes/games/teamGames/tableTennis/tableTennis')
const gameLawnTennisSetsRoutes = require('./routes/games/teamGames/lawnTennis/set')
const gameLawnTennisRoutes = require('./routes/games/teamGames/lawnTennis/lawnTennis')


// importing the db configurations 
const {client} = require('./config/postgreSQLdb');


// initialization of the express module
const app = express();
// adding express.json so that the backend can work with json data structures.
app.use(express.json());
// using cors to communicate between different sites initially all sites can use data so just cors()
app.use(cors());
// making a variable to store the port and since we will be hosting it so using process.env.PORT and to work locally adding 8000 port.
const port = process.env.port || 8000;

// initialization of / route
app.get('/', (req, res) =>{
    res.status(200).send(`Server is running no need to worry`);
})

// connecting to databases
client.connect(() => {
    console.log("Connected to the postgres database");
})

//connecting to mongodb atlas
connectMongo();




// /____fill_in___/... pe jane ke bad ye middlewares chalenge jo bhi chalane honge
//app.use use krna he na ki app.get kyuki ab middlewares use kr rhe he.
app.use('/participants-auth', participantsAuthRoutes);
app.use('/participants-info', participantsInfoRoutes);
app.use('/organizers-auth', organizersAuthRoutes);
app.use('/organizers-info', organizersInfoRoutes);
app.use('/forms', formsRoutes);
app.use('/messages', messagesRoutes);
app.use('/events', eventsRoutes);
app.use('/teams', teamsRoutes);
app.use('/players', playersRoutes);
app.use('/notices', noticesRoutes);
app.use('/games/players', gamePlayersRoutes);
app.use('/games/game-info', gameInfoRoutes);
app.use('/games', gamesRoutes);
app.use('/games/teams', gameTeamsRoutes);
app.use('/games/fouls', gameFoulsRoutes);
app.use('/games/basket', gameBasketRoutes);
app.use('/games/basketball', gameBasketballRoutes);
app.use('/games/goal', gameGoalRoutes);
app.use('/games/football', gameFootballRoutes);
app.use('/games/badminton/sets', gameBadmintonSetsRoutes);
app.use('/games/badminton/points', gameBadmintonPointsRoutes);
app.use('/games/badminton', gameBadmintonRoutes);
app.use('/games/table-tennis/points', gameTableTennisPointsRoutes);
app.use('/games/table-tennis/sets', gameTableTennisSetsRoutes);
app.use('/games/table-tennis', gameTableTennisRoutes);
app.use('/games/lawn-tennis/sets', gameLawnTennisSetsRoutes);
app.use('/games/lawn-tennis', gameLawnTennisRoutes);


//TODO: kuch aesa krna he ki teams jo ho vo jitne events jeeti he uske according unhe points mile and vo points show ho...... ye to basic hi hota he.
//TODO: match fixtures ka kya socha he
//TODO: after the game is end uski koi bhi chij jese baskets, goals sab changes na ho pae, frontend se krna jyada aasan rhega ig
//TODO: kam khtm krne ke bad ek jgah pr sare api end points acche se group krke likh lena.

// start listening at the port assigned.
app.listen(port, () => {
    console.log(`server started at port: ${port}`);
})
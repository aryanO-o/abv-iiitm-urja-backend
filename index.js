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

//TODO: kuch aesa krna he ki teams jo ho vo jitne events jeeti he uske according unhe points mile and vo points show ho...... ye to basic hi hota he.
//TODO: abhi to fouls bhi implement krne he sayad basketball game fo baskets + fouls ho jaega ya aesa kuch

// start listening at the port assigned.
app.listen(port, () => {
    console.log(`server started at port: ${port}`);
})
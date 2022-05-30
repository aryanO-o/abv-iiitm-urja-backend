//requring process env variables
require('dotenv').config()

// requiring the module to be loaded
const express = require('express')
const cors = require('cors')

// importing the auth routes
const authRoutes = require('./routes/auth');

//importing the user routes
const userRoutes = require('./routes/user');

// importing the db configurations 
const client = require('./config/db');
const { application_name } = require('pg/lib/defaults');

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

client.connect(() => {
    console.log("connected to the postgres database");
})

// /auth/... pe jane ke bad ye middlewares chalenge jo bhi chalane honge
//app.use use krna he na ki app.get kyuki ab middlewares use kr rhe he.
app.use('/auth', authRoutes);

// /user/ ... pe jane ke bad ye middleware chalega
app.use('/user', userRoutes);

// start listening at the port assigned.
app.listen(port, () => {
    console.log(`server started at port: ${port}`);
})
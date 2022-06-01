const {Client} = require('pg')

const client = new Client({
    connectionString: process.env.PSQL_CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = client;
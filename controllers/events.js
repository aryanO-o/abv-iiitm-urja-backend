const { client } = require("../config/postgreSQLdb");

exports.createEvent = (req, res) => {
    //expected data from frontend
    // {
    //     event_name: ""
    // }
    const {event_name} = req.body;

    client
    .query(`INSERT INTO events VALUES (default, '${event_name}')`)
    .then((data) => {
        res.json({
            message: "event added successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error occurred " + err.message
        })
    })
}

exports.deleteEvent = (req, res) => {

    client
    .query(`DELETE FROM events WHERE event_id = '${req.params.event_id}'`)
    .then((data) => {
        res.status(200).json({
            message: "event deleted successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error occurred " + err
        })
    })
}

exports.updateEvent = (req, res) => {
    //expected data from frontend
    // {
    //     event_name: ""
    // }

    const{ event_name} = req.body;
    client
    .query( `UPDATE events SET event_name ='${event_name}' WHERE event_id = '${req.params.event_id}' `)
    .then((data) => {
        res.status(200).json({
            message: "event updated successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error occurred" + err
        })
    })
}

exports.getAllEvents = (req, res) => {
    client
    .query(`select * from events;`)
    .then((data) => {
        res.status(200).json(data.rows)
    })
    .catch((err) => {
        res.status(500).json({
            message: "database error occurred" + err
        })
    })
}
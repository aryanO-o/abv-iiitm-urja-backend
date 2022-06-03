const { SUPERVISOR, HOUSE_CAPTAIN, COORDINATOR, EVENT_COORDINATOR, PARTICIPANT } = require("./strings");

exports.ROLE_PLAYERS_ARRAY = [SUPERVISOR, HOUSE_CAPTAIN, COORDINATOR, EVENT_COORDINATOR, PARTICIPANT];

// exports.getMessages = async (req, res) => {
//     try {

//     }
//     catch (err) {
//         res.status(500).json({
//             message: "mongodb error: " + err.message
//         })
//     }
// }
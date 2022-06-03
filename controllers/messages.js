const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const result = await Message.find({receiver: req.role_player})
        res.json(result)
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.sendMessages = async (req, res) => {
    //expected data from frontend
    // {
    //     "senderId": "",
    //     "receiver": "",
    //     "text": ""
    // }
    const{ text} = req.body;


    try {
        const message = await new Message({
            senderId: req.sender_id,
            receiver: req.role_player,
            text: text
        })

        const savedMessage = message.save();
        res.json(savedMessage);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
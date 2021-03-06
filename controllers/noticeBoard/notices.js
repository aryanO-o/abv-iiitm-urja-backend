const Notice = require('../../models/Notice');

exports.getAllNotices = async (req, res) => {

    try{
        const result = await Notice.find();
        res.json(result);
    }
    catch(err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.createNotice = async (req, res) => {
    //expected data from frontend
    // {
    //     heading: "",
    //     message: "",
    //     imageURL: ""
    // }

    const heading = req.body.heading;
    let imageURL;
    let message;

    if(req.body.imageURL == null) imageURL = "";
    else imageURL = req.body.imageURL;

    if(req.body.message == null) message = "";
    else message = req.body.message;

    try {
        const notice = await new Notice ({
            heading: heading,
            message: message,
            imageURL: imageURL,
        })

        const result = await notice.save();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.deleteNotice = (req, res) => {
    //expected data from backend
    // {
    //     notice_id:""
    // }

    Notice.findByIdAndDelete(req.params.notice_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(err.code).json({
            message: "mongodb error: " + err.message
        })
    })
        

}

exports.updateNotice = async (req, res) => {
    //expected data from frontend
    // {
    //     notice_id: "",
    //     heading: "",
    //     message: "",
    //     imageURL: "",
    // }

    const {message, imageURL, heading} = req.body;

    try {
        const notice = await Notice.findOneAndUpdate(
            {
                _id: req.params.notice_id,
            },
            {
                $set: {
                    heading: heading,
                    message: message,
                    imageURL: `${imageURL}`
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.json(notice);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}

exports.getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.noticeId);

        res.json(notice);
    }
    catch (err) {
        res.status(500).json({
            message: "mongodb error: " + err.message
        })
    }
}
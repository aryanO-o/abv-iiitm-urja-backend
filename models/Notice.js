const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true
        },
        message: {
            type: String,
        },
        imageURL: {
            type : String,
        }

    },   
    {
        timestamps: true
    }  
)

const Notice = mongoose.model('Notice', NoticeSchema);
module.exports = Notice;
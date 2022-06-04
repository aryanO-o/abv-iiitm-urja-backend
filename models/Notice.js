const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
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

const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmailSchema = new Schema({

    user: {
        type: String,
    },
    pass: {
        type: String,
    },
    from: {
        type: String,
    },
    to    : {
        type: String,
    },
    html : {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Email = mongoose.model('Emails', EmailSchema);

module.exports = Email;
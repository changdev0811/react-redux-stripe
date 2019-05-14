const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({

    Filename: {
        type: String,
        //required: true
    },
    directory: {
        type: String,
        //required: true
    },
    dentist_id: {
        type: String,
        required: true
    },
    dentist_name: {
        type: String,
        required: true
    },
    operator_id: {
        type: String,
        default: 'Not assignment'
    },
    operator_name: {
        type: String
    },
    status: {
        type: String,
        default:'In Progress'
    },
    remarks: [{
        operator_id:String,
        operator_name:String,
        content:String
    }],
    created_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date
    }
});

const Document = mongoose.model('Documents', DocumentSchema);

module.exports = Document;
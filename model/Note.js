const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    owner:{
        type: Object,
        required: true
    },
    content:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteDetails: {
        type: String,
        required: true,
    },
    noteCreateDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    noteDueDate: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model("Note",  noteSchema)
const mongoose = require('../db/connection')

const babySchema = new mongoose.Schema({
    dateOfBirth: String,
    gender: String,
    name: String,
    parent: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

// Instantiate a model
const Baby = mongoose.model('Baby', babySchema);

module.exports = Baby;
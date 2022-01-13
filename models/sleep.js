const mongoose = require('../db/connection')

const sleepSchema = new mongoose.Schema({
    date: String,
    timeStart: String,
    timeEnd: String,
    babyName: String,
    baby: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Baby'
    }
})

// Instantiate a model
const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
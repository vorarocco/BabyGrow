const mongoose = require('../db/connection')

const feedSchema = new mongoose.Schema({
    date: String,
    food: String,
    amount: String,
    timeStart: String,
    timeEnd: String,
    babyName: String,
    baby: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Baby'
    }
})

// Instantiate a model
const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;
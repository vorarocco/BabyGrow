const mongoose = require('../db/connection')

const growthSchema = new mongoose.Schema({
    date: String,
    weight: Number,
    hight: Number,
    babyName: String,
    baby: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Baby'
    }
})

// Instantiate a model
const Growth = mongoose.model('Growth', growthSchema);

module.exports = Growth;
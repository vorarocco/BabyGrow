const mongoose = require('../db/connection')

const diaperSchema = new mongoose.Schema({
    date: String,
    timeChange: String,
    type: String,
    details: String,
    babyName: String,
    baby: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Baby'
    }
})

// Instantiate a model
const Diaper = mongoose.model('Diaper', diaperSchema);

module.exports = Diaper;
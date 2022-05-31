const mongoose = require('mongoose')

const timerSchema = new mongoose.Schema({
    date:{
        // type: Date,
        type: String,
        unique: true,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    works: [{
        index: {
            type: Number,
            required: true
        },
        work: {
            type: String,
            required: true
        },
        time: {
            type: Number,
            required: true
        }
    }]
})

const Time = mongoose.model('Time',timerSchema);

module.exports = Time;
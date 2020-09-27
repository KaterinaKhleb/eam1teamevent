const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
    name: String,
    day: String,
    weekNumber: Number
}, {
    timestamps: true
}, {
    collection: 'dayvote'
});

module.exports = mongoose.model('DayVote', DaySchema);
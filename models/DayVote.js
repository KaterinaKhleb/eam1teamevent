const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    name: String,
    vote: String,
    weekNumber: Number
}, {
    timestamps: true
}, {
    collection: 'gamevote'
});

module.exports = mongoose.model('GameVote', GameSchema);
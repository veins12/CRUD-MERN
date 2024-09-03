const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
    fact: { type: String, required: true }
});

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    facts: [factSchema]
});

module.exports = mongoose.model('Activity', activitySchema);

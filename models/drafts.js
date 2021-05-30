const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const draftSchema = new Schema({
    external_id: { type: String, required: true, unique: true },
    type: {type: String, required: true}, //sleeper/espn/yahoo/etc
    picked: [{ type: String }]
});

const Draft = mongoose.model('Draft', draftSchema);
 
module.exports = Draft;
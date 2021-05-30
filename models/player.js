const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    position: { type: String },
    team: { type: String },
    age: { type: Number },
    espn_id: { type: String },
    sleeper_id:{ type: Number },
    yahoo_id: { type: String }
});

const Player = mongoose.model('Player', playerSchema);
 
module.exports = Player;
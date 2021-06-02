const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tierListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    league: {
        //TODO make object ref
        type: String
    },
    name: { type: String },
    list: [{
        tier: { type: Number },
        position: { type: String, required: true },
        bye: { type: String },
        rank: { type: Number },
        adp: { type: String },
        risk: { type: Number },
        notes: { type: String },
        player: {
            type: Schema.Types.ObjectId,
            ref: 'Player'
        }
    }]
});

const TierList = mongoose.model('TierList', tierListSchema);
 
module.exports = TierList;
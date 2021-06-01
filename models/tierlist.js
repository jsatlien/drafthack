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
    tiers: [{
        tier: { type: Number },
        players: [{
            type: Schema.Types.ObjectId,
            ref: 'Player'
        }]
    }]
});

const TierList = mongoose.model('TierList', tierListSchema);
 
module.exports = TierList;
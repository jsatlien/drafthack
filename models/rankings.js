const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rankingsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listType: { type: String }, //standard,rookie TODO: validation
    name: { type: String },
    players: [{
        position: { type: Number },
        player: {
            type: Schema.Types.ObjectId,
            ref: 'Player'
        }
    }]
});

const Rankings = mongoose.model('Rankings', rankingsSchema);
 
module.exports = Rankings;
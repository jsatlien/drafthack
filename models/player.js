const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { platform_enum } = require('./enums');

const playerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    searchName: { type: String, required: true },
    position: { type: String, required: true },
    team: { type: String },
    age: { type: Number },
    bye: { type: Number },
    platformId: {
        type: String,
        required: true,
        unique: true
    },
    platform: {
        type: String,
        required: true,
        enum: platform_enum
    }
});

playerSchema.pre('validate', async function (next) {
    if (this.firstName && this.lastName)
        this.searchName = `${this.firstName.toLowerCase()}${this.lastName.toLowerCase()}`

    next();
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { platform_enum } = require('./enums');

const draftSchema = new Schema({
    external_id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: platform_enum //sleeper/espn/yahoo/etc
    },
    picked: [{ type: String }],
    active: { type: Boolean, default: true }
});

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;
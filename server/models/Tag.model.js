const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: String,
    moderated: Boolean,
    published: Boolean,
}, {timestamps: true} )

module.exports = mongoose.model('Tag', tagSchema)



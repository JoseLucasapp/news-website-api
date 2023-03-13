const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('news', newsSchema)
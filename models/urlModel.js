const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:[true,"URL is needed"],
        unique: true
    },
    shortUrl:{
        type:String,
        required:[true,"URL must have shortened url"],
        unique: true
    }
})

//create collection
const shortenUrl = mongoose.model("shortenUrl", urlSchema);

module.exports = shortenUrl;
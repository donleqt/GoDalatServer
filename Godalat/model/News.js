/**
 * Created by Don on 5/12/2016.
 */
var mongoose = require('mongoose');
var NewsSchema = new mongoose.Schema({
    title: String,
    isHot: Boolean,
    author: String,
    coverImage: String,
    description: String,
    content: String,
    htmlContent: String,
    date_create: Date,
    date_update: Date

});


var News= module.exports= mongoose.model('News', NewsSchema)



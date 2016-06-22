/**
 * Created by Don on 5/12/2016.
 */
var mongoose = require('mongoose');

var TourSchema = new mongoose.schema ({
    name: String,
    company: String,
    cover_image: String,
    imageList: [{url:String}],
    duration: Number,
    startDate:String,
    type: String,
    review: String,
    overallPoint: Number,
    description: String,
    content: String,
    price: Number, //vnd
    discount: Number,
    isHot: Boolean,
    telephone: String,
    email:String,
    hotelQuality: Number,
    transport: String

}) ;

var Tour = module.exports =  mongoose.model('Tour', TourSchema)
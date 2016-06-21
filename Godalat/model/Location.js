/**
 * Created by don on 5/5/16.
 */
var mongoose = require('mongoose');
var locationSchema = new mongoose.Schema({
    name: { type : String ,required: true},
    address: String,
    type: String,
    geo: { lat: Number, long: Number },
    hasMap: String,
    review:String,
    telephone: String,
    openHour: {begin: String,end:String},
    extensiveInfo: [{name: String,content:String}],
    coverImage: String,
    imageList: [{url:String}],
    description: String,
    summary: String,
    relatedTour: String,
    isHot: Boolean,
    rate_total:
    {
        begin_star:Number,
        five_star:Number,
        four_star:Number,
        three_star:Number,
        two_star:Number,
        one_star:Number
    }
});

locationSchema.index({geo:1});
var Location= module.exports= mongoose.model('Location', locationSchema)



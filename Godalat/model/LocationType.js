/**
 * Created by don on 5/5/16.
 */
var mongoose = require('mongoose');
var LocationTypeSchema = new mongoose.Schema({
    id : {type:String,index:true,unique:true},
    name: String,
    menu: String
});


var LocationType= module.exports= mongoose.model('LocationType', LocationTypeSchema)



/**
 * Created by Don on 5/12/2016.
 */
var express = require('express');
    mongoose = require('mongoose');
    router = express.Router();
    News = require('../model/News');
    ObjectId = require('mongoose').Types.ObjectId;

router.get('/getAllNews',function (req,res,next) {
   News.find({}).sort({date_create:1}).exec(function (err,data) {
       if(err){
           res.send({
               error:true,
               message:'Lấy thất bại!'
           });
       }
       else{
           res.send(data);
       }
   });
});

router.get('/getAllNewsNoContent',function (req,res,next) {
    News.find({}).select({content:0,htmlContent:0}).exec(function (err,data) {
        if(err){
            res.send({
                error:true,
                message:'Lấy thất bại!'
            });
        }
        else{
            res.send(data);
        }
    });
});

router.post('/getNewsWithId',function (req,res,next) {
    var condition = {_id: new ObjectId(req.body._id)};
    console.log(condition);
    News.find(condition).exec(function (err,data) {
        if(err){
            res.send({
                error:true,
                message:'Lấy thất bại!'
            });
        }
        else{
            res.send(data);
        }
    });
});
module.exports = router;
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

router.post('/getNewsById',function (req,res,next) {
    var condition = {_id: new ObjectId(req.body._id)};
    console.log(condition);
    News.findOne(condition).exec(function (err,data) {
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

router.post ('/updateNews',function (req,res) {
    var condition = new ObjectId( req.body._id);
    var update = {
        title: req.body.title,
        isHot: req.body.isHot,
        author: req.body.author,
        coverImage: req.body.coverImage,
        description: req.body.description,
        content: req.body.content,
        htmlContent: req.body.htmlContent,
        date_update: Date.now(),
        related: []

    };
    News.findOneAndUpdate(condition,update, function(err,data){
        res.send("Thành công !");
    });

});
router.post ('/insertNews',function (req,res) {
    var sample = new News({
        title: req.body.title,
        isHot: req.body.isHot,
        author: req.body.author,
        coverImage: req.body.coverImage,
        description: req.body.description,
        content: req.body.content,
        htmlContent: req.body.htmlContent,
        date_create: Date.now(),
        date_update: Date.now(),
        related: []
    });

    sample.save(function (err) {
        if(err) {

            res.send(
                {
                    error: true,
                    message: 'Tạo task thất bại!'
                });
        }
        else {

            res.send(
                {
                    error: false,
                    message: 'Tạo thành công !',
                    news: sample
                });
        }

    });
});
module.exports = router;
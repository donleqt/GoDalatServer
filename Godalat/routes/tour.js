/**
 * Created by Don on 5/12/2016.
 */
var express = require('express');
mongoose = require('mongoose');
router = express.Router();
Tour = require('../model/Tour');
ObjectId = require('mongoose').Types.ObjectId;

router.post('/getAllTour',function (req,res,next) {
    if (req.body.page == undefined)
    {

        Tour.find({}).sort({date_create:1}).exec(function (err,data) {
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
    }
    else {
        var n = req.body.page;
        Tour.find({}).sort({date_create: 1}).skip(10 * n).limit(10).exec(function (err, data) {
            if (err) {
                res.send({
                    error: true,
                    message: 'Lấy thất bại!'
                });
            }
            else {
                res.send(data);
            }
        });
    }
});

router.get('/getAllTourNoContent',function (req,res,next) {
    Tour.find({}).select({content:0,htmlContent:0}).exec(function (err,data) {
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

router.post('/getTourById',function (req,res,next) {
    var condition = {_id: new ObjectId(req.body._id)};
    console.log(condition);
    Tour.findOne(condition).exec(function (err,data) {
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


router.post ('/updateTour',function (req,res) {
    var condition = new ObjectId( req.body._id);
    var update = {
        name: req.body.name,
        company: req.body.company,
        cover_image: req.body.cover_image,
        imageList: req.body.imageList,
        duration: req.body.duration,
        startDate: req.body.startDate,
        type: req.body.type,
        review: req.body.review,
        overallPoint: req.body.overallPoint,
        description: req.body.description,
        content: req.body.content,
        price: req.body.price, //vnd
        discount: req.body.discount,
        isHot: req.body.isHot,
        telephone: req.body.telephone,
        email:req.body.email,
        hotelQuality: req.body.hotelQuality,
        transport: req.body.transport

    };
    Tour.findOneAndUpdate(condition,update, function(err,data){
        res.send("Thành công !");
    });

});
router.post ('/insertTour',function (req,res,next) {
    
    if (req.body.name == '')
    {
        res.send(
            {
                error: true,
                message: 'Tạo task phải có tên chứ!'
            });

    }
    else{
        var sample = new Tour({
            name: req.body.name,
            company: req.body.company,
            cover_image: req.body.cover_image,
            imageList: req.body.imageList,
            duration: req.body.duration,
            startDate: req.body.startDate,
            type: req.body.type,
            review: req.body.review,
            overallPoint: req.body.overallPoint,
            description: req.body.description,
            content: req.body.content,
            price: req.body.price, //vnd
            discount: req.body.discount,
            isHot: req.body.isHot,
            telephone: req.body.telephone,
            email:req.body.email,
            hotelQuality: req.body.hotelQuality,
            transport: req.body.transport
        });

        sample.save(function (err) {
            if(err) {
                console.log(err);
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
    }

});
module.exports = router;
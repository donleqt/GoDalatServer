/**
 * Created by Don on 5/12/2016.
 */
var express = require('express');
mongoose = require('mongoose');
router = express.Router();
Tour = require('../model/News');
ObjectId = require('mongoose').Types.ObjectId;

router.get('/getAllTour',function (req,res,next) {
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

router.post('/getTourWithId',function (req,res,next) {
    var condition = {_id: new ObjectId(req.body._id)};
    console.log(condition);
    Tour.find(condition).exec(function (err,data) {
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
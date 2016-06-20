var express =require('express');
var LocationType = require('../model/LocationType');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


router.post('/insertLocationType', function(req, res, next) {
    var type = new LocationType ({
        id: req.body.id,
        name: req.body.name,
        menu: req.body.menu
    });

    type.save(function (err,data) {
        if(err){
            res.send({
                error:true,
                message:'Thêm thất bại!'
            });
        }
        else{
            res.send({
                error:false,
                message:'Thêm thành công!'
            });
        }
    })
});

module.exports = router;

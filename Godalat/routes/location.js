var express =require('express');
var mongoose = require('mongoose');
var Location = require('../model/Location');
var LocationType = require('../model/LocationType');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/getAllLocation', function (req,res,next) {
    Location.find({},function (err,data) {
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


router.get('/getAllLocationNoContent',function (req,res,next) {
    Location.find({}).select({content:0,htmlContent:0}).exec(function (err,data) {
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

router.post('/getLocationWithId',function (req,res,next) {
    var condition = {_id: new ObjectId(req.body._id)};
   // console.log(condition);
    Location.find(condition).exec(function (err,data) {
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

router.post('/insertLocation',function (req,res,next) {
   // var newLocation = {
   //     name: 'Thung lũng tình yêu',
   //     address: '05 - 07 Mai Anh Đào. P8. TP. Đà Lạt',
   //     type: 1,
   //     geo: {
   //         lat: 11.980206,
   //         long: 108.450302
   //     },
   //     hasMap: 'http://maps.google.com/?q=11.980206, 108.450270',
   //     review:'',
   //     telephone: '0633821448',
   //     openHour: {begin: null,end:null},
   //     extensiveInfo: [
   //         {
   //             name: 'Địa chỉ',
   //             content: '05 - 07 Mai Anh Đào. P8. TP. Đà Lạt'
   //         },
   //         {
   //             name: 'Điện thoại',
   //             content: '0633.821.448'
   //         },
   //         {
   //             name: 'Vé vào cổng',
   //             content: '40.000đ/ khách người lớn, 20.000đ/ khách trẻ nhỏ (tham khảo).'
   //         }
   //     ],
   //     coverImage: [{url:'img/location/thunglungty.jpg'}],
   //     imageList: [{url:'img/location/thunglungty.jpg'}],
   //     description: 'Nằm cách trung tâm thành phố Đà Lạt khoảng 5km thung lũng tình yêu là một khu du lịch đầy thơ mộng luôn cuốn hút mọi du khách gần xa tới tham quan.',
   //     summary:  'Nằm cách trung tâm thành phố Đà Lạt khoảng 5km thung lũng tình yêu là một khu du lịch đầy thơ mộng luôn cuốn hút mọi du khách gần xa tới tham quan.'
   //     + 'Bao quanh thung lũng tình yêu là Hồ Đa Thiện và rừng thông quanh năm xanh ngắt một màu.',
   //     relatedTour: null,
   //     isHot: true,
   //     rate_total:
   //     {
   //         begin_star:0,
   //         five_star:0,
   //         four_star:0,
   //         three_star:0,
   //         two_star:0,
   //         one_star:0
   //     }
   // }
    try {
    var newLocation = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        geo: req.body.geo,
        hasMap: req.body.hasMap,
        review:req.body.review,
        telephone: req.body.telephone,
        openHour: req.body.openHour,
        extensiveInfo: JSON.parse(req.body.extensiveInfo),
        coverImage: req.body.coverImage,
        imageList: JSON.parse(req.body.imageList),
        description: req.body.description,
        summary:  req.body.summary,
        relatedTour: JSON.parse(req.body.relatedTour),
        isHot: req.body.isHot,
        rate_total: req.body.rate_total
    };
    newLocation.save(function(err,data){
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

    });
    }
    catch (e){
        res.send({
            error:true,
            message:'Thêm thất bại!'
        });
    }
});
router.get('/loadTest', function(req, res, next) {
    LocationType.find({},function (err,data) {
        res.send(data);
    });
});

router.get('/addTest', function(req, res, next) {
    console.log("we got a connection!!!");
    new LocationType ({
        name: 'Lưu niệm',
        menu: 'Địa Điểm'
    }).save(function (err,data) {
        if (err)
            console.log("loi cmnr");
    });

    var test = new  Location (
        {
            name: 'Thung lũng tình yêu',
            type: '1',
            geo: {
                lat: 11.980296,
                long: 108.450302
            },
            info: [
                {
                    name: 'Địa chỉ',
                    content: '05 - 07 Mai Anh Đào. P8. TP. Đà Lạt'
                },
                {
                    name: 'Điện thoại',
                    content: '0633.821.448'
                },
                {
                    name: 'Vé vào cổng',
                    content: '40.000đ/ khách người lớn, 20.000đ/ khách trẻ nhỏ (tham khảo).'
                }
            ],
            cover: [
                {
                    url:   'img/location/thunglungty.jpg'
                }
            ],

            imageList: [],
            description: 'Nằm cách trung tâm thành phố Đà Lạt khoảng 5km thung lũng tình yêu là một khu du lịch đầy thơ mộng luôn cuốn hút mọi du khách gần xa tới tham quan.',
            content: 'Nằm cách trung tâm thành phố Đà Lạt khoảng 5km thung lũng tình yêu là một khu du lịch đầy thơ mộng luôn cuốn hút mọi du khách gần xa tới tham quan.'
            + 'Bao quanh thung lũng tình yêu là Hồ Đa Thiện và rừng thông quanh năm xanh ngắt một màu.',
            tour: [],
            hot: true
        }
    );
    test.save(function (err,data) {
        if (err)
        {
            res.send(err);
            console.log(err);
        }
        else  {
            res.send("ok");
            console.log(err)
        }
    });
});

module.exports = router;

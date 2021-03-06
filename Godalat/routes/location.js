var express =require('express');
var mongoose = require('mongoose');
var Location = require('../model/Location');
var LocationType = require('../model/LocationType');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var Tour = require('../model/Tour');
var News=require('../model/News');
//Location Type
//  isHot -
//  Thắng Cảnh - 2
//  Lưu trú - 3
//  Ăn uống - 4
//  Mua sắm - 5
//

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

router.post('/getLocationByTypeId', function (req,res) {
    var page = req.body.page;
    Location.find({type:req.body.id}).skip(10*page).limit(10).exec(function (err,data) {
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

router.post('/getLocationById',function (req,res,next) {
    var condition = {_id: new ObjectId(req.body._id)};
    Location.findOne(condition).exec(function (err,data) {
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

router.post('/getHotLocation',function (req,res) {
    Location.find({isHot:true}).exec(function (err,data) {
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
    console.log(req.body.extensiveInfo);
    var newLocation = new Location({
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        geo: req.body.geo,
        hasMap: req.body.hasMap,
        review:req.body.review,
        telephone: req.body.telephone,
        openHour: req.body.openHour,
        extensiveInfo: req.body.extensiveInfo,
        coverImage: req.body.coverImage,
        imageList: req.body.imageList,
        description: req.body.summary,
        summary:  req.body.summary,
        relatedTour: req.body.relatedTour,
        isHot: req.body.isHot,
        rate_total: {
            begin_star:0,
            five_star:0,
            four_star:0,
            three_star:0,
            two_star:0,
            one_star:0
        }
        
    });

    newLocation.save(function(err){

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


});
router.get('/loadTest', function(req, res, next) {
    LocationType.find({},function (err,data) {
        res.send(data);
    });
});

router.get('/addTest', function(req, res, next) {


    var newLocation = new Location( {
        name: 'Thung lũng tình yêu',
        address: '05 - 07 Mai Anh Đào. P8. TP. Đà Lạt',
        type: 2,
        geo: {
            lat: 11.980206,
            long: 108.450302
        },
        hasMap: 'http://maps.google.com/?q=11.980206, 108.450270',
        review:'',
        telephone: '0633821448',
        openHour: {begin: '7:00',end:'17:00'},
        extensiveInfo: [
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
        coverImage: 'http://xspace.talaweb.com/giaydantuongdalatadmin/home/thunglungtinhyeu1.jpg',
        imageList: [{url:'http://xspace.talaweb.com/giaydantuongdalatadmin/home/thunglungtinhyeu1.jpg'},
            {url:'http://xspace.talaweb.com/giaydantuongdalatadmin/home/thunglungtinhyeu1.jpg'},
            {url:'http://xspace.talaweb.com/giaydantuongdalatadmin/home/thunglungtinhyeu1.jpg'},
            {url:'http://xspace.talaweb.com/giaydantuongdalatadmin/home/thunglungtinhyeu1.jpg'}],
        description: 'Cao đẳng Sư phạm Đà Lạt, thuộc phường 10, thành phố Đà Lạt, tỉnh Lâm Đồng. Ngôi trường được người Pháp thành lập năm 1927, do kiến trúc sư Moncet thiết kế và chỉ đạo xây dựng',
        summary:  'Trường được người Pháp xây dựng năm 1927, toàn bộ ngôi trường này là một công trình kiến trúc độc đáo mang đậm dấu ấn cổ kính châu Âu nhưng cũng đồng thời kết hợp với nhiều chi tiết kiến trúc bản địa tạo nên sự hài hòa độc đáo'
        + 'Với không gian thoáng đãng, trong lành ngôi trường cao đẳng này không chỉ là nơi lý tưởng để học tập, nghiên cứu mà còn là nơi thu hút tất cả các du khách. ',

        relatedTour: null,
        isHot: true,
        rate_total:
        {
            begin_star:0,
            five_star:0,
            four_star:0,
            three_star:0,
            two_star:0,
            one_star:0
        }
    });
    newLocation.save(function (err,data) {
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
router.post('/deleteByIdAndType',function (req,res,next) {
    var type=req.body.type;
    var id = new ObjectId(req.body.id);
    if (type=='news')
    {
        News.remove({_id: id}, function(err,data){
            res.send(data);
        });
    }
    else if (type=='location'){
        Location.remove({_id: id}, function(err,data){
            res.send(data);
        });
    }
        else if (type=='tour') {
        Tour.remove({_id: id}, function(err,data){
            res.send(data);
        });
    }
    else res.send("Có lỗi xảy ra");
});
router.post('/getHotLocation',function (req,res) {
   Location.find({isHot:true}).exec(function (err,data) {
       if(err){
           res.send({
               error:true,
               message:'Lấy thất bại!'
           });
       }
       else{
           res.send(data);
       }
   })
});
router.post('/getRelatedLocation',function (req,res) {
    Location.findOne({_id:new ObjecId(req.body.id)}).exec(function (err,data) {
        if(err){
            res.send({
                error:true,
                message:'Lấy thất bại!'
            });
        }
        else{
            Location.find({type:data.type}).sort({name:-1}).limit(5).exec(function (err, location) {
                if(err){
                    res.send({
                        error:true,
                        message:'Lấy thất bại!'
                    });
                }
                else{
                    res.send(location);
                }
            });

        }
    });
    

});
router.post('/getNearByLocation2',function (req,res) {
   var geo = {
       lat: req.body.lat,
       long: req.body.long
   };
    Location.find({}).exec(function (err,data) {

        var kq = [];
        for (var i=0;i<data.length;i++) {
            var distance = getDistanceFromLatLonInKm(data[i].geo.lat,data[i].geo.long,geo.lat,geo.long);
            if (distance <=2) kq.push(data[i]);
        }
        res.json(kq);
    });
});
router.post('/getNearByLocation',function (req,res) {
    var distance = req.body.distance; // this in km distance
    if (distance == undefined)
        distance=5;
    var geo = {
        lat: req.body.lat,
        long: req.body.long
    };
    Location.find({geo:{$near:[geo.lat,geo.long],$maxDistance:distance/111.12}}).exec(function (err,data) {
        res.json(data);
    })
});
router.post ('/updateLocation',function (req,res) {
    var condition = new ObjectId( req.body._id);
    var update = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        geo: req.body.geo,
        hasMap: req.body.hasMap,
        review:req.body.review,
        telephone: req.body.telephone,
        openHour: req.body.openHour,
        extensiveInfo: req.body.extensiveInfo,
        coverImage: req.body.coverImage,
        imageList: req.body.imageList,
        description: req.body.summary,
        summary:  req.body.summary,
        relatedTour: req.body.relatedTour,
        isHot: req.body.isHot,

    };
    Location.findOneAndUpdate(condition,update, function(err,data){
        res.send("Thành công !");
    });

});
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}
module.exports = router;




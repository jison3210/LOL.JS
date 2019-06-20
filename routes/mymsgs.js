var express = require('express');
var router = express.Router();
var heromsg = require('../models/mymsg.js');

//获取全部英雄列表
router.get('/list', function (req, res, next) {
    heromsg.findAll(function (err, allmsg) {
        res.json({status: 0, message: '获取成功', data: allmsg})
    })
});
//获取英雄相关信息
router.post('/detail', function (req, res, next) {
	if(req.body.id){
		heromsg.findByHeroname(req.body.heroname,function(err,getHeros){
			res.json({status: 0 ,message: '获取成功',data :getHeros})
		})
	}else{
		res.json({status: 1,message:'获取失败'})
	}
});
module.exports = router;
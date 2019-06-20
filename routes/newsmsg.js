var express = require('express');
var router = express.Router();
var newsmsg = require('../models/newsmsg');

//获取全部新闻列表
router.get('/list', function (req, res, next) {
    newsmsg.findAll(function (err, getNews) {
        res.json({status: 0, message: '获取成功', data: getNews})
    })
});
//获取新闻相关信息
router.post('/detail', function (req, res, next) {
	if(req.body.id){
		newsmsg.findByNewname(req.body.newname,function(err,getNews){
			res.json({status: 0 ,message: '获取成功',data :getNews})
		})
	}else{
		res.json({status: 1,message:'获取失败'})
	}
});
module.exports = router;
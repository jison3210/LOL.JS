var mongoose = require('../common/db');

var newsmsg = new mongoose.Schema({
    newsname: String,
    newstype: String,
    newstime: String,
	newssrc: String
})

newsmsg.statics.findAll = function(callBack){
    this.find({},callBack);
};

newsmsg.statics.findById = function(name,callBack){
    this.findOne({_id:id},callBack);
};
//
var newsmsgModel= mongoose.model('newsmsg',newsmsg);
module.exports = newsmsgModel;
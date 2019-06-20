var mongoose = require('../common/db');

var heromsg = new mongoose.Schema({
    heroname: String,
	herosname:String,
    herosrc: String,
    herostory: String
})

heromsg.statics.findAll = function(callBack){
    this.find({},callBack);
};

heromsg.statics.findById = function(name,callBack){
    this.find({_id:id},callBack);
};
//
var heromsgModel= mongoose.model('heromsg',heromsg);
module.exports = heromsgModel;
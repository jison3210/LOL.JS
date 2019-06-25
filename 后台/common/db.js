var mongoose = require('mongoose');
var url = 'mongodb://localhost/LOLServer'
mongoose.connect(url);
//数据库连接
module.exports = mongoose;
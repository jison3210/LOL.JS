var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
const init_token = 'TKL02o';
/* GET users listing. */
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/file', upload.single('file'), function(req, res) {
    let avatar = req.file
    console.log(avatar)
    console.log(req.body)
    // if (avatar) {
    //     fs.unlink(avatar.path, (e) => {
    //         if (e) {
    //             console.log('文件操作失败')
    //             throw e;
    //         } else
    //             console.log('文件:' + avatar.path + '删除成功！');
    //     });
    // }
    res.status(200).send(avatar);
})
   //multer文件的硬盘存储模式
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //先创建路径在保存
        createFileDirectory(uploadPath);
        //指定文件保存路径
        cb(null, 'upload/');
    },
    filename: function(req, file, cb) {
        console.log(file)
            // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + '-' + file.originalname);

    }
})
//创建文件夹
var createFileDirectory = function(path) {
        try {
            //检测文件夹是否存在，不存在抛出错误
            fs.accessSync(path);
        } catch (error) {
            //创建文件夹
            fs.mkdirSync(path);
        }
    }

var upload = multer({
    storage: storage
});

//用户登录接口
router.post('/login', function (req, res, next) {
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.password) {
        res.json({status: 1, message: "密码为空"})
    }
    user.findUserLogin(req.body.username, req.body.password, function (err, userSave) {
        if (userSave.length != 0) {
            var token_after = getMD5password(userSave[0]._id);
            res.json({status: 0, data: {token: token_after,user:userSave}, message: "用户登录成功"})					
        } else {
            res.json({status: 1, message: "用户名或者密码错误，若多次错误，修改密码或联系管理员"})
        }
    })
});
//用户注册接口
router.post('/register', function (req, res, next) {
	// var photo = /\.jpg$|\.jpeg$|\.gif$/i
	// if(!photo.test(req.body.usersrc)){
	//     res.json({status: 1, message: '请使用jpg、jpeg、gif格式的图片'})
	//     photo.focus();
	//     return false;
	// };
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.password) {
        res.json({status: 1, message: "密码为空"})
    }
    if (!req.body.userMail) {
        res.json({status: 1, message: "用户邮箱为空"})
    }
    if (!req.body.userPhone) {
        res.json({status: 1, message: "用户手机为空"})
    }
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!myreg.test(req.body.userMail)){
	    res.json({status: 1, message: '请输入有效的E_mail！'})
	    myreg.focus();
	    return false;
	};
	var mobile1 =/^1[3456789]\d{9}$/;
	if(!mobile1.test(req.body.userPhone)){
	    res.json({status: 1, message: '请输入11位手机号'})
	    mobile1.focus();
	    return false;
	};
    user.findByUsername(req.body.username, function (err, userSave) {
        if (userSave.length != 0) {
            // res.json(userSave)
            res.json({status: 1, message: "用户已注册"})
        } else {
            var registerUser = new user({
                username: req.body.username,
                password: req.body.password,
                userMail: req.body.userMail,
                userPhone: req.body.userPhone,
				usersrc: req.body.usersrc,
				userAdmin: 0,
				userPower: 0,
				userStop: 0
            })
            registerUser.save(function () {
                res.json({status: 0, message: "注册成功"})
            })
        }
    })

});
//用户找回密码
router.post('/findPassword', function (req, res, next) {
//    需要输入用户的邮箱信息和手机信息，同时可以更新密码
//    这里需要两个返回情况，一个是req.body.repassword存在时，一个是repassword不存在
    if (req.body.repassword) {
         { // 直接验证mail和phone
            user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, function (err, userFound) {
                if (userFound.length != 0) {
                    user.update({_id: userFound[0]._id}, {password: req.body.repassword}, function (err, userUpdate) {
                        if (err) {
                            res.json({status: 1, message: "更改错误", data: err})
                        }
                        res.json({status: 0, message: '更改成功', data: userUpdate})
                    })
                } else {
                    res.json({status: 1, message: "信息错误"})
                }
            })
        }
    } else {
        //    这里只是验证mail和phone，为了前台验证，返回验证成功和所有的字段，改密码使用或者认证失败
        if (!req.body.username) {
            res.json({status: 1, message: "用户名称为空"})
        }
        if (!req.body.userMail) {
            res.json({status: 1, message: "用户邮箱为空"})
        }
        if (!req.body.userPhone) {
            res.json({status: 1, message: "用户手机为空"})
        }
        user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, function (err, userFound) {
            if (userFound.length != 0) {
                res.json({
                    status: 0,
                    message: "验证成功，请修改密码",
                    data: {username: req.body.username, userMail: req.body.userMail, userPhone: req.body.userPhone}
                })
            } else {
                res.json({status: 1, message: "信息错误"})
            }
        })
    }
});

//获取md5值
function getMD5password(id) {
    var md5 = crypto.createHash('md5');
    var token_before = id + init_token
    // res.json(userSave[0]._id)
    return md5.update(token_before).digest('hex')
}

module.exports = router;

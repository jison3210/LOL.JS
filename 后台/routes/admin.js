var express = require('express');
var router = express.Router();
var user = require('../models/user');
var newsmsg = require('../models/newsmsg.js');
var mymsg = require('../models/mymsg.js');
var crypto = require('crypto');
const init_token = 'TKL02o';

//后台管理需要验证其用户的后台管理权限
//后台admin,添加新的新闻
router.post('/newAdd', function (req, res, next) {
    var photo = /\.jpg$|\.jpeg$|\.gif$/i
    if(!photo.test(req.body.newssrc)){
        res.json({status: 1, message: '请使用jpg、jpeg、gif格式的图片'})
        photo.focus();
        return false;
    };
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    if (!req.body.newsname) {
        res.json({status: 1, message: "新闻名称为空"})
    }
    if (!req.body.newssrc) {
        res.json({status: 1, message: "新闻图片为空"})
    }
    if (!req.body.newstype) {
        res.json({status: 1, message: "新闻类型为空"})
    }
    if (!req.body.newstime) {
        res.json({status: 1, message: "新闻时间为空"})
    }
    //验证
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        //    验证用户的情况下
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
            var saveNew = new newsmsg({
                    newsname: req.body.newsname,
                    newstype: req.body.newstype,
                   newstime: req.body.newstime,
                    newssrc: req.body.newssrc
                })
                saveNew.save(function (err) {
                    if (err) {
                        res.json({status: 1, message: err})
                    } else {
                        res.json({status: 0, message: "添加成功"})
                    }
                })
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })

    } else {
        res.json({status: 1, message: check.message})
    }
});
//删除之前添加的新闻
router.post('/newDel', function (req, res, next) {
        if (!req.body.newsId) {
            res.json({status: 1, message: "新闻id传递失败"})
        }
        if (!req.body.username) {
            res.json({status: 1, message: "用户名为空"})
        }
        if (!req.body.token) {
            res.json({status: 1, message: "登录出错"})
        }
        if (!req.body.id) {
            res.json({status: 1, message: "用户传递错误"})
        }
        //验证
        var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
        if (check.error == 0) {
            user.findByUsername(req.body.username, function (err, findUser) {
                if (findUser[0].userAdmin && !findUser[0].userStop) {
                    newsmsg.remove({_id: req.body.newsId}, function (err, delNew) {
                        res.json({status: 0, message: '删除成功', data: delNew})
                    })
                } else {
                    res.json({error: 1, message: "用户没有获得权限或者已经停用"})
                }
            })
        } else {
            res.json({status: 1, message: check.message})
        }
    }
);
//修改后台添加的新闻
router.post('/newUpdate', function (req, res, next) {
	if (!req.body.newsId) {
	    res.json({status: 1, message: "新闻id传递失败"})
	}
    if (!req.body.newsname) {
        res.json({status: 1, message: "新闻名称传递失败"})
    }
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    if (!req.body.newssrc) {
        res.json({status: 1, message: "新闻的图片为空"})
    }
    if (!req.body.newstype) {
        res.json({status: 1, message: "新闻的类型为空"})
    }
    if (!req.body.newstime) {
        res.json({status: 1, message: "新闻的日期为空"})
    }
    //这里在前台打包一个新闻对象全部发送至后台直接存储
    //验证
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop)
            {
                newsmsg.update({_id: req.body.newsId},
                    {
                    newsname: req.body.newsname,
                    newstype: req.body.newstype,
                    newssrc: req.body.newssrc,
					newstime: req.body.newstime
                }, function (err, x) {
                    res.json({status: 0, message: '修改成功', data: x})
                })
            }
            else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    } else {
        res.json({status: 1, message: check.message})
    }
});
//显示后台所有的新闻
router.get('/new', function (req, res, next) {
    newsmsg.findAll(function (err, allNews) {
        res.json({status: 0, message: '获取成功', data: allNews})
    })
});
//显示所有的英雄
router.get('/hero', function (req, res, next) {
    mymsg.findAll(function (err, allheros) {
        res.json({status: 0, message: '获取成功', data: allheros})
    })
});
//封停用户
router.post('/stopUser', function (req, res, next) {
    if (!req.body.userId) {
        res.json({status: 1, message: "用户id传递失败"})
    }
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.update({_id: req.body.userId}, {userStop: true}, function (err, updateUser) {
                    res.json({status: 0, message: '封停成功', data: updateUser})
                })
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })

    } else {
        res.json({status: 1, message: check.message})
    }
});
//后端所有用户的资料显示(列表)
router.post('/showUser', function (req, res, next) {
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.findAll(function (err, alluser) {
                    res.json({status: 0, message: '获取成功', data: alluser})
                })
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    } else {
        res.json({status: 1, message: check.message})
    }
});
//后台的用户信息修改
router.post('/userUpdate', function (req, res, next) {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!myreg.test(req.body.userMail)){
        res.json({status: 1, message: '请输入有效的E_mail！'})
        myreg.focus();
        return false;
    };
    var mobile1 =/^1[3456789]\d{9}$/;
    if(!mobile1.test(req.body.userPhone)){
        res.json({status: 1, message: '请输入正确的13位手机号'})
        mobile1.focus();
        return false;
    };
    if (!req.body.userId) {
        res.json({status: 1, message: "用户id传递失败"})
    }
    if (!req.body.password) {
        res.json({status: 1, message: "密码传递错误"})
    }
    if (!req.body.userMail) {
        res.json({status: 1, message: "邮箱传递错误"})
    }
    if (!req.body.userPhone) {
        res.json({status: 1, message: "手机号码传递错误"})
    }
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.update({_id: req.body.userId}, {
                    password: req.body.password,
                    userMail: req.body.userMail,
                    userPhone: req.body.userPhone
                }, function (err, updateUser) {
                    res.json({status: 0, message: '修改成功', data: updateUser})
                })
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    } else {
        res.json({status: 1, message: check.message})
    }
});
//后台权限的管理
router.post('/powerUpdate', function (req, res, next) {
    if (!req.body.userId) {
        res.json({status: 1, message: "用户id传递失败"})
    }
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.update({_id: req.body.userId}, {userAdmin: true}, function (err, updateUser) {
                    res.json({status: 0, message: '修改成功', data: updateUser})
                })
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    } else {
        res.json({status: 1, message: check.message})
    }
});
//后台新增英雄
router.post('/addHero', function (req, res, next) {
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    if (!req.body.heroname) {
        res.json({status: 1, message: "英雄名称为空"})
    }
	if (!req.body.herosname) {
	    res.json({status: 1, message: "英雄简称名称为空"})
	}
    if (!req.body.herosrc) {
        res.json({status: 1, message: "英雄图片为空"})
    }
	if (!req.body.herostory) {
	    res.json({status: 1, message: "英雄故事为空"})
	}
    //验证
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //    有权限的情况下
                var saveHero = new mymsg({
                    heroname: req.body.heroname,
                    herosname: req.body.herosname,
                    herosrc: req.body.herosrc,
					herostory: req.body.herostory
                })
                saveHero.save(function (err,saveHero) {
                    if (err) {
                        res.json({status: 1, message: err,data:saveHero})
                    } else {
                        res.json({status: 0, message: '保存成功',data:saveHero})
                    }
                })
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    } else {
        res.json({status: 1, message: check.message})
    }
});
//后台删除英雄
router.post('/delHero', function (req, res, next) {
	if (!req.body.heroId) {
	    res.json({status: 1, message: "英雄id传递失败"})
	}
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {

                mymsg.remove({_id: req.body.heroId}, function (err, delHero) {
                    res.json({status: 0, message: '删除成功', data: delHero})
                })
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    } else {
        res.json({status: 1, message: check.message})
    }
});
//修改后台添加的英雄
router.post('/heroUpdate', function (req, res, next) {
	if (!req.body.heroId) {
	    res.json({status: 1, message: "英雄id传递失败"})
	}
    if (!req.body.heroname) {
        res.json({status: 1, message: "英雄名称名称传递失败"})
    }
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"})
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"})
    }
    if (!req.body.herosrc) {
        res.json({status: 1, message: "英雄的图片为空"})
    }
    if (!req.body.herostory) {
        res.json({status: 1, message: "英雄故事为空"})
    }
    if (!req.body.herosname) {
        res.json({status: 1, message: "英雄简称为空"})
    }
    //这里在前台打包一个新闻对象全部发送至后台直接存储
    //验证
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
    if (check.error == 0) {
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop)
            {
                mymsg.update({_id: req.body.heroId},
                    {
                    herosname: req.body.heroname,
                    herosname: req.body.herosname,
                    herosrc: req.body.herosrc,
					herostory:req.body.herostory
                }, function (err, x) {
                    res.json({status: 0, message: '修改成功', data: x})
                })
            }
            else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    } else {
        res.json({status: 1, message: check.message})
    }
});
//验证用户的后台管理权限
//验证用户的token和登录状态
function checkAdminPower(name, token, id) {
    if (token == getMD5Password(id)) {
        return {error: 0, message: "用户登录成功"}
    } else {
        return {error: 1, message: "用户登录错误"}
    }
}
//获取md5值
function getMD5Password(id) {
    var md5 = crypto.createHash('md5');
    var token_before = id + init_token
    // res.json(userSave[0]._id)
    return md5.update(token_before).digest('hex')
}

module.exports = router;
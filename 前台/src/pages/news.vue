<template>
	<div class="body" style="background-color: #ffffff;">
		<div class="header">

			<div class="comm-head2">
				<img src="../assets/logo.png" style="width: 8.25rem; height: 3.0625rem; cursor:pointer" @click="goindex()" />
				<ul class="head-nav">
					<li>
						<a @click="goherolist()">
							<span class="head-nav-title">游戏资料</span><br />
							<span class="head-nav-subtitle">GAME INFO</span>
						</a>
					</li>
					<li>
						<a>
							<span class="head-nav-title">商城/合作</span><br />
							<span class="head-nav-subtitle">STORE</span>
						</a>
					</li>
					<li>
						<a>
							<span class="head-nav-title">社区互动</span><br />
							<span class="head-nav-subtitle">COMMUNITY</span>
						</a>
					</li>
					<li>
						<a>
							<span class="head-nav-title">赛事官网</span><br />
							<span class="head-nav-subtitle">ESPORTS</span>
						</a>
					</li>
					<li>
						<a @click="goguanli()">
							<span class="head-nav-title">管理系统</span><br />
							<span class="head-nav-subtitle">SYSTEM</span>
						</a>
					</li>
				</ul>
				<div style="width: 100px;"></div>
				<i class="head-nav-search"></i>
				<i class="head-nav-phone"></i>
				<div class="head-userinfo-normal">
					<div class="head-userinfo-avatar">
						<img :src='userimg' width="36" height="auto" alt="玩家头像">
						<span></span>
						<a v-if='zxx' class="zx" @click="clear()" href="http://localhost:8080/#/">
							注销
						</a>
					</div>
					<div class="head-userinfo-normal-login">
						<p class="unlogin">
							亲爱的召唤师，欢迎
						</p>
						<a v-if='!isLogin' class="unloginbtn" @click="gologin()">登录</a>
						<div v-else class="unloginbtn" @click="gomy_msg()">{{username}}

						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="daohang" style="float: left;margin-left: 60px; margin-top: 40px;margin-bottom: 2px;">
			<Breadcrumb>
				<Breadcrumb-item href="">
					<Icon type="ios-home-outline"></Icon> 主页
				</Breadcrumb-item>
				<Breadcrumb-item href="/components/breadcrumb">
					<Icon type="social-buffer-outline"></Icon> 我的信息
				</Breadcrumb-item>
				<Breadcrumb-item>
					<Icon type="pound"></Icon> {{newstitle}}
				</Breadcrumb-item>
			</Breadcrumb>
		</div>
		<div class="newbody">
			<div class="new2body">
				<div class="newleft">
					<div class="leftbox">
						<div class="newtitlerow1" style="display: flex;">
							<h1 style="font-size: 24px; color: #444;">{{newstitle}}</h1>
						</div>
						<div class="newtitlerow2" style="display: flex; align-items: center;line-height: 20px; margin-top: 20px;">
							<p style="font-size: 14px;">LOL今日囧图</p>
							<p style="color: #aaa; font-size: 14px;margin-left: 30px;">{{newstime}}</p>
							<p style="color: #aaa; font-size: 14px;margin-left: 30px;margin-right: 10px;">字体:</p>
							<Radio-group v-model="fontsizec" style="color: #aaa; font-size: 14px;">
								<Radio label="大"></Radio>
								<Radio label="中"></Radio>
								<Radio label="小"></Radio>
							</Radio-group>
							<p style="color: #aaa; font-size: 14px; margin-left: 350px;">8.2万次阅读</p>
						</div>
						<div style="height: 1px; width: 100%;background-color: #aaa; margin-top: 20px; margin-bottom: 40px;"></div>
						<div class="article" style="font-size: 14px; text-align: left;">
							<p>嗨，各位观众老爷们大家好，又是新的一天，花儿与囧图又与大家见面了。今天依旧来看看花儿为大家带来了哪些令人捧腹的动图吧~</p>
							<p style="font-weight: 400;">重点看这里！！囧图开群啦，群内每天更新动图，还有更多福利等你来拿，需要动图的小伙伴快来加群和囧图粉们一起玩耍吧~</p>
							<p style="font-weight: 400;">LOL今日囧图Q群：</p>
							<p style="font-weight: 400;">一群：920808784</p>
							<p style="font-weight: 400;">二群：554579624</p>
							<p style="font-weight: 400;">三群：549245357</p>
							<p style="font-weight: 400;">本栏目gif动图唯一投稿邮箱：jiongtuhua@qq.com，微博投稿搜索：@掌盟大花儿，</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/0d3795d4f279fe26eeef051c0625e9d3/0?width=216&amp;height=338"
								 alt="" width="216" height="338"></p>
							<p style="font-weight: 400;">盲僧：推塔游戏，何必在意人头</p>
							<p style="font-weight: 400; text-align: right;"><img src="https://shp.qpic.cn/cfwebcap/0/3dc37341c8a009ceeb28e9f05db005a8/0?width=259&amp;height=338"
								 alt="" width="259" height="338" style="display: block; margin-left: auto; margin-right: auto;"></p>
							<p style="font-weight: 400;">ADC自己的事情自己解决嗷</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/feb58cb43e4cb7314a95b811165fa1fc/0?width=259&amp;height=233"
								 alt="" width="259" height="233"></p>
							<p style="font-weight: 400;">玩个老梗，看有多少人知道</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/e18f20e779961d97fab5b04b04d8811d/0?width=200&amp;height=299"
								 alt="" width="200" height="299"></p>
							<p style="font-weight: 400;">你怎么穿着品如的袜子</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/7754330f341f4badc206aa240e0f3240/0?width=203&amp;height=240"
								 alt="" width="203" height="240"></p>
							<p style="font-weight: 400;">扣完这个蛋糕，我们恩断义绝</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/5e682ca860df3d26b8910ce7b196660f/0?width=213&amp;height=260"
								 alt="" width="213" height="260"></p>
							<p style="font-weight: 400;">隐形土豪无处不在</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/63b5ed6ec32f985083b1ca2e0d4ad9a7/0?width=180&amp;height=320"
								 alt="" width="180" height="320"></p>
							<p style="font-weight: 400;">泳池人群已疏散，可进行跳水作业</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/6e028875752cce9d6aea684fdc599f6b/0?width=178&amp;height=260"
								 alt="" width="178" height="260"></p>
							<p style="font-weight: 400;">美团骑手只是我的表面身份</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/f71bec2fc62cde796afc8e92d27fa403/0?width=216&amp;height=260"
								 alt="" width="216" height="260"></p>
							<p style="font-weight: 400;">你就是天煞劫之厄加特？</p>
							<p style="font-weight: 400; text-align: center;"><img src="https://shp.qpic.cn/cfwebcap/0/4b128c50c4ee1649a835a824975753be/0?width=200&amp;height=300"
								 alt="" width="200" height="300"></p>
							<p style="font-weight: 400;">这种同学会我还真不敢参加</p>
							<p style="font-weight: 400;">好了，本期的囧图就到这里了，不知道各位观众老爷们有没有看的过瘾，笑的开心呢？希望大家能够继续支持小编，踊跃来投稿哦！求订阅！求订阅！！求一手订阅~</p>
							<p style="font-weight: 400;">囧图娱乐群：</p>
							<p style="font-weight: 400;">一群：920808784</p>
							<p style="font-weight: 400;">二群：554579624</p>
							<p style="font-weight: 400;">三群：549245357</p>
							<p style="font-weight: 400;">本栏目gif动图唯一投稿邮箱：jiongtuhua@qq.com，微博投稿@掌盟大花儿</p>
						</div>
						<img src="../assets/good.png" width="80" height="80" style="margin-left: 370px; margin-top: 50px;" />
					</div>
				</div>
				<div class="newright">
					<div class="rightbox">
						<div style="display: flex;" class="s-top-bar clearfix" id="authorInfo">
							<div class="c-por-bg" >
								<a href="/space/news.shtml?initGrid=0&amp;id=14faf837-a7ca-41bd-a46a-5f93d3705754" target="_blank" class="name"
								 onclick="pgvSendClick({hottag:'v3.news.article_detail.author_home'});">

									<img style="margin-right: 20px; width: 56px;
    height: 56px;
    border-radius: 50%;" src="https://shp.qpic.cn/cfwebcap/0/86c9afa64d19f78e6899b3b4f41db2d1/0?width=339&amp;height=315">

								</a>
							</div>
								<div style="display: flex;flex-flow: column; text-align: left;padding-top: 14px;">
									<a href="/space/news.shtml?initGrid=0&amp;id=14faf837-a7ca-41bd-a46a-5f93d3705754" class="name" target="_blank"
									 title="LOL今日囧图" onclick="pgvSendClick({hottag:'v3.news.article_detail.author_home'});">
										LOL今日囧图
									</a>
									<p class="num-read">1.2亿次 总阅读量</p>
								</div>
								<div class="ct-lt" style="margin-left: 40px; padding-top: 5px;">
									<p class="num-follower">56.1万粉丝</p>

									<Button type="warning"  style="width: 66px; height: 26px; text-align: center;line-height: 10px;">关注</Button>

								</div>
						</div>
						<div style="height: 1px; width: 100%;background-color: #aaa; margin-top: 20px;margin-bottom: 20px;"></div>
						<div class="wenzhang">
							<div style="display:flex; align-items: center; width: 100%; margin-bottom: 20px;">
							<div style="background-color: #0baac0;width: 3px; height: 20px; margin-right: 5px;"></div>
							<h2>TA的文章</h2>
							</div>
							<ul style="list-style: none;">
								<li style="padding-bottom: 20px;">
									<div style="width: 100%; display: flex;">
										<img width="100" height="53" src="//shp.qpic.cn/cfwebcap/0/7f2eea973291b0d77ff02db5c07e004c/0/?width=686&amp;height=368" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
										<div style="display: flex; flex-flow: column; text-align: left;margin-left: 10px;">
											<div style="margin-bottom: 2px; ">
												{{newstitle}}
											</div>
											<div style="color: #aaa;">8.2万阅读</div>
										</div>
									</div>
								</li>
								<li style="padding-bottom: 20px;">
									<div style="width: 100%; display: flex;">
										<img width="100" height="53" src="//shp.qpic.cn/cfwebcap/0/7f2eea973291b0d77ff02db5c07e004c/0/?width=686&amp;height=368" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
										<div style="display: flex; flex-flow: column; text-align: left;margin-left: 10px;">
											<div style="margin-bottom: 2px; ">
												{{newstitle}}
											</div>
											<div style="color: #aaa;">8.2万阅读</div>
										</div>
									</div>
								</li>
								<li style="padding-bottom: 20px;">
									<div style="width: 100%; display: flex;">
										<img width="100" height="53" src="//shp.qpic.cn/cfwebcap/0/7f2eea973291b0d77ff02db5c07e004c/0/?width=686&amp;height=368" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
										<div style="display: flex; flex-flow: column; text-align: left;margin-left: 10px;">
											<div style="margin-bottom: 2px; ">
												{{newstitle}}
											</div>
											<div style="color: #aaa;">8.2万阅读</div>
										</div>
									</div>
								</li>
								<li style="padding-bottom: 20px;">
									<div style="width: 100%; display: flex;">
										<img width="100" height="53" src="//shp.qpic.cn/cfwebcap/0/7f2eea973291b0d77ff02db5c07e004c/0/?width=686&amp;height=368" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
										<div style="display: flex; flex-flow: column; text-align: left;margin-left: 10px;">
											<div style="margin-bottom: 2px; ">
												{{newstitle}}
											</div>
											<div style="color: #aaa;">8.2万阅读</div>
										</div>
									</div>
								</li>
								<li style="padding-bottom: 20px;">
									<div style="width: 100%; display: flex;">
										<img width="100" height="53" src="//shp.qpic.cn/cfwebcap/0/7f2eea973291b0d77ff02db5c07e004c/0/?width=686&amp;height=368" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
										<div style="display: flex; flex-flow: column; text-align: left;margin-left: 10px;">
											<div style="margin-bottom: 2px; ">
												{{newstitle}}
											</div>
											<div style="color: #aaa;">8.2万阅读</div>
										</div>
									</div>
								</li>
								
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				zxx:false,
				userimg:'//ossweb-img.qq.com/images/lol/v2/personal/avatar/default.png',
				username: '',
				newstitle: '今日囧图：几乎每个盲僧都会犯的错误竟是这个！',
				newstime: '2019-06-15',
				fontsizec: '中',
				power:''
			}
		},
		created() {
			// this.axios.get('http://localhost:3000/newsmsgs/list').then((data) => {
			// 	this.newsdata = data.data.data;
			// 	console.log(data.data)
			//    此时登录成功
			let token = localStorage.getItem('token')
			this.power = localStorage.getItem('power')
			//    console.log(token)
			if (token) {
				this.zxx=true,
				this.userimg='http://q1.qlogo.cn/g?b=qq&k=WNHAgjibhlEicUgIjictl5Bibw&s=140&t=1441633435'
				this.isLogin = true
				this.username = localStorage.getItem('username')
				this.id = localStorage.getItem('_id')
				console.log('用户获得成功');
				console.log(this.id);
			} else {
				console.log('用户获得登录失败');
			}
		},
		methods: {
			clear: function(event) {
				localStorage.clear();
				window.location.reload();
				window.location.href = window.location.href;
			},
			gologin() {
				this.$router.push({
					path: '/login'
				});
			},
			goherolist() {
				this.$router.push({
					path: '/gamelist'
				});
			},
			gomy_msg(){
				this.$router.push({path:'/my_msg'});
			},
			goindex() {
				this.$router.push({
					path: '/'
				});
			},
					  goguanli(){
						  console.log(this.power)
						  if(this.power==1)
						  {
							this.$router.push({path:'/admin'});  
						  }
						  else{
							  alert("小小普通用户也想管理？快走开");
						  }
						}
		}
	}
</script>

<style>
		.zx{
		display: none;
		position: absolute;
		color: #000000;
		width: 32px;
		height: 32px;
		top: 7px;
		right: 208px;
		background-image: url(../assets/goout.png);
		border-radius: 10%;
		
	}
	.head-userinfo-avatar:hover .zx{
		display: block;
	}
	.rightbox {
		padding: 30px 30px;
		display: flex;
		flex-flow: column wrap;
		border: #f1f1f1 1px solid;
	}

	.leftbox {
		padding: 40px 20px;
		display: flex;
		flex-flow: column wrap;
		border: #f1f1f1 1px solid;

	}

	.footer {
		margin-top: 20px;
		width: 100%;
		height: 266px;
		background-image: url(../assets/foot.png);
	}

	.header {
		height: 4.875rem;
	}

	.comm-head2 {
		display: flex;
		align-items: center;
		width: 100%;
		height: 4.875rem;
		background-color: #000000;
		z-index: 99;
		;
	}

	.head-nav {
		display: flex;
		align-items: center;
		width: 55%;
		list-style: none;
		margin-left: 1.875rem;
	}

	.head-nav li {
		width: 20%;
	}

	.head-nav-title {
		font-size: 1.125rem;
		color: #fff;
	}

	.head-nav-subtitle {
		font-size: 0.75rem;
		color: #aeaeae;
		;
	}

	.head-nav-search {
		margin-right: 30px;
		height: 1.5rem;
		width: 1.5rem;
		background-image: url(../assets/search.png);
	}

	.head-nav-phone {

		height: 1.5rem;
		width: 1.5rem;
		background-image: url(../assets/phone.png);
	}

	.head-userinfo-normal {
		display: flex;
		margin-left: 30px;
		float: left;
		width: 250px;
		height: 48px;
		position: relative;
		line-height: 48px;
		text-align: center;
		font-size: 0;
	}

	.head-userinfo-avatar {
		width: 48px;
		height: 48px;
		margin: 0;
	}

	.head-userinfo-normal-login {
		display: flex;
		margin-left: 10px;
	}

	.head-userinfo-normal span {
		background-position: -304px -84px;
		background-image: url(../assets/topfoot-spr.png);
		display: block;
		width: 48px;
		height: 48px;
		position: absolute;
		top: 0;
		left: 0;
		text-align: center;
	}

	.head-userinfo-normal img {
		display: inline-block;
		vertical-align: middle;
		border-radius: 50%;

	}

	.unlogin {
		color: #fefefe;
		font-size: 16px;
	}

	.unloginbtn {
		cursor: pointer;
		margin-left: 5px;
		color: #fff3d0;
		font-size: 16px;
	}

	.comm-topact {
		width: 100%;
		height: 360px;
		background-image: url(../assets/0.jpg);
		background-position: 50%;
	}

	.newbody {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.new2body {
		display: flex;
		justify-content: space-between;
		width: 92%;
		margin-top: 20px;
		margin-bottom: 40px;
	}

	.newleft {
		width: 70%;
	}

	.newright {
		width: 28%;
	}
</style>

<template>
	<div class="body" style="background-color: #ffffff;">
		<div class="header">

			<div class="comm-head2">
				<img src="../assets/logo.png" style="width: 8.25rem; height: 3.0625rem; cursor:pointer" @click="goindex()"/>
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
		<div class="my_box">
			<div class="my_msg">
				<div class="gamemsg">
					<img class="mytitle" src="../assets/mytitle.png" />
					<div class="gamemsg_base">
						<div style="display: flex; align-items: center; margin-top: 30px; ">
							<h1>{{username}}</h1>
							<img class="xinbie" src="../assets/xinbie.png" style="margin-left: 10px;" />
							<span class="user-lv" style="margin-left: 10px;">社区等级Lv.2</span>
						</div>
						<img style="margin-top: 20px; width: 190px;" src="../assets/basebb.png" />
						<img style="margin-left: 800px;" src="../assets/fansi.png" />
					</div>

				</div>
				<div class="boxmsg"></div>
				<img src="../assets/gamemsg.png" width="1214.1" style="margin-top: 10px;" />

			</div>
			<div class="newsbox">
				<div class="newsboxleft">
					<div style="display: flex;margin-top: 40px;margin-left: 30px; margin-bottom: 30px;">
						<div style="width: 5px; height: 25px; background-color: #1da6ba; margin-right: 7px; "></div>
						<h2 style="font-size: 18px; font-weight: 700; color: #444;">游戏资讯</h2>
					</div>
					<ul>
						<li style="width: 100%;" @click="gonews()">
							<div class="newsitem">
								<img style="width: 180px;margin-left: 30px;" src="//shp.qpic.cn/cfwebcap/0/508d982498c672bdf06c4378c75ea365/0/?width=686&height=368" />
								<div class="main-info">

									<a style="font-size: 18px; color: #444; text-align: start;" href="https://lol.tuwan.com/397454/" class="list-title"
									 target="_blank">六级一套强行单杀
										Dopa电刑铁男全解析</a>
									<div class="main-info-operation">
										<span class="label-articl">文章</span>
										<a style="display: flex; align-items: center; margin-left: 20px;" href="news.shtml?initGrid=0&amp;id=86708b4d-9bfc-4825-bbf7-90d83fd7efbe"
										 target="_blank">
											<img class="list-head-img" src="https://shp.qpic.cn/cfwebcap/0/0f5da8363f1f148245274a76d81259fa/0?width=200&amp;height=200">
											<span class="name">兔玩LOL</span>
										</a>
										<i class="icon-read"></i>
										<span class="read">0阅读</span>
										<span class="time">8分钟前</span>
									</div>
								</div>
							</div>
						</li>
						<li style="width: 100%;">
							<div class="newsitem">
								<img style="width: 180px;margin-left: 30px;" src="//shp.qpic.cn/cfwebcap/0/508d982498c672bdf06c4378c75ea365/0/?width=686&height=368" />
								<div class="main-info">
						
									<a style="font-size: 18px; color: #444; text-align: start;" href="https://lol.tuwan.com/397454/" class="list-title"
									 target="_blank">六级一套强行单杀
										Dopa电刑铁男全解析</a>
									<div class="main-info-operation">
										<span class="label-articl">文章</span>
										<a style="display: flex; align-items: center; margin-left: 20px;" href="news.shtml?initGrid=0&amp;id=86708b4d-9bfc-4825-bbf7-90d83fd7efbe"
										 target="_blank">
											<img class="list-head-img" src="https://shp.qpic.cn/cfwebcap/0/0f5da8363f1f148245274a76d81259fa/0?width=200&amp;height=200">
											<span class="name">兔玩LOL</span>
										</a>
										<i class="icon-read"></i>
										<span class="read">0阅读</span>
										<span class="time">8分钟前</span>
									</div>
								</div>
							</div>
						</li>
						<li style="width: 100%;">
							<div class="newsitem">
								<img style="width: 180px;margin-left: 30px;" src="//shp.qpic.cn/cfwebcap/0/508d982498c672bdf06c4378c75ea365/0/?width=686&height=368" />
								<div class="main-info">
						
									<a style="font-size: 18px; color: #444; text-align: start;" href="https://lol.tuwan.com/397454/" class="list-title"
									 target="_blank">六级一套强行单杀
										Dopa电刑铁男全解析</a>
									<div class="main-info-operation">
										<span class="label-articl">文章</span>
										<a style="display: flex; align-items: center; margin-left: 20px;" href="news.shtml?initGrid=0&amp;id=86708b4d-9bfc-4825-bbf7-90d83fd7efbe"
										 target="_blank">
											<img class="list-head-img" src="https://shp.qpic.cn/cfwebcap/0/0f5da8363f1f148245274a76d81259fa/0?width=200&amp;height=200">
											<span class="name">兔玩LOL</span>
										</a>
										<i class="icon-read"></i>
										<span class="read">0阅读</span>
										<span class="time">8分钟前</span>
									</div>
								</div>
							</div>
						</li>
						<li style="width: 100%;">
							<div class="newsitem">
								<img style="width: 180px;margin-left: 30px;" src="//shp.qpic.cn/cfwebcap/0/508d982498c672bdf06c4378c75ea365/0/?width=686&height=368" />
								<div class="main-info">
						
									<a style="font-size: 18px; color: #444; text-align: start;" href="https://lol.tuwan.com/397454/" class="list-title"
									 target="_blank">六级一套强行单杀
										Dopa电刑铁男全解析</a>
									<div class="main-info-operation">
										<span class="label-articl">文章</span>
										<a style="display: flex; align-items: center; margin-left: 20px;" href="news.shtml?initGrid=0&amp;id=86708b4d-9bfc-4825-bbf7-90d83fd7efbe"
										 target="_blank">
											<img class="list-head-img" src="https://shp.qpic.cn/cfwebcap/0/0f5da8363f1f148245274a76d81259fa/0?width=200&amp;height=200">
											<span class="name">兔玩LOL</span>
										</a>
										<i class="icon-read"></i>
										<span class="read">0阅读</span>
										<span class="time">8分钟前</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="newsboxright">
					<div style="display: flex;margin-top: 40px;margin-left: 30px; margin-bottom: 30px;">
						<div style="width: 5px; height: 25px; background-color: #1da6ba; margin-right: 7px; "></div>
						<h2 style="font-size: 18px; font-weight: 700; color: #444;">推荐关注</h2>
					</div>
					<div class="starlist">
						<ul class="starbtn">
							<li style="display: flex; flex: 0 0 25%; width: 108px; height: 139px; flex-flow: row wrap;justify-content: center;">
								<div class="info-wrap" >
									<div class="list-head-imgs">
										<div class="pic" onclick="window.open('news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711');pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});">
											<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0">
										</div>
							
										<div class="follow-info fi-0" style="display: none;">
											<div class="character-info">
												<div class="info-pic">
													<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0" class="character-img">
												</div>
												<div class="info-right">
													<p class="p-wrap-ci0">
														<a href="news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711" target="_blank" class="name"
														 onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});" title="英雄联盟Miss">英雄联盟Miss</a>
														<span class="sub">
							
															<a href="javascript:IndexObject.doFollowPlayer(true, '0')"><i class="icon-heart"></i>关注</a>
							
															<span class="num">37.7万</span>
														</span>
													</p>
													<p class="p-wrap-ci1">
														Miss，游戏女主持，魔兽3、星际2 女子冠军。代表作品：《Miss排位日记》。
													</p>
												</div>
											</div>
											<div class="character-representative" style="">
												<p><i class="icon-representative"></i>代表作</p>
												<ul>
							
													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/70aff7dbfdd3a9b7aff284ef1f030f62/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记244期疾风剑豪亚索</p>
														<a href="/v/v2/detail.shtml?docid=6256699786770558362" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>
							
													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/9c665042c55ca948e808d5c1b57ae7aa/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记EP357 天残脚！打野盲僧暴力carry!</p>
														<a href="/v/v2/detail.shtml?docid=9577901856322855884" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>
							
												</ul>
											</div>
										</div>
									</div>
									<!--<i class="icon-letter-v"></i>-->
									<p class="name2" title="英雄联盟Miss">英雄联盟Miss</p>
								</div>
								<Button type="warning" :ghost='gz' @click="change()" style="width: 68px; height: 30px; text-align: center;">{{gg}}</Button>
							
							</li>
							<li style="display: flex; flex: 0 0 25%; width: 108px; height: 139px; flex-flow: row wrap;justify-content: center;">
								<div class="info-wrap" >
									<div class="list-head-imgs">
										<div class="pic" onclick="window.open('news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711');pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});">
											<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0">
										</div>
							
										<div class="follow-info fi-0" style="display: none;">
											<div class="character-info">
												<div class="info-pic">
													<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0" class="character-img">
												</div>
												<div class="info-right">
													<p class="p-wrap-ci0">
														<a href="news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711" target="_blank" class="name"
														 onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});" title="英雄联盟Miss">英雄联盟Miss</a>
														<span class="sub">
							
															<a href="javascript:IndexObject.doFollowPlayer(true, '0')"><i class="icon-heart"></i>关注</a>
							
															<span class="num">37.7万</span>
														</span>
													</p>
													<p class="p-wrap-ci1">
														Miss，游戏女主持，魔兽3、星际2 女子冠军。代表作品：《Miss排位日记》。
													</p>
												</div>
											</div>
											<div class="character-representative" style="">
												<p><i class="icon-representative"></i>代表作</p>
												<ul>
							
													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/70aff7dbfdd3a9b7aff284ef1f030f62/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记244期疾风剑豪亚索</p>
														<a href="/v/v2/detail.shtml?docid=6256699786770558362" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>
							
													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/9c665042c55ca948e808d5c1b57ae7aa/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记EP357 天残脚！打野盲僧暴力carry!</p>
														<a href="/v/v2/detail.shtml?docid=9577901856322855884" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>
							
												</ul>
											</div>
										</div>
									</div>
									<!--<i class="icon-letter-v"></i>-->
									<p class="name2" title="英雄联盟Miss">英雄联盟Miss</p>
								</div>
								<Button type="warning" :ghost='gz2' @click="change2()" style="width: 68px; height: 30px; text-align: center;">{{gg2}}</Button>
							
							</li>
							<li style="display: flex; flex: 0 0 25%; width: 108px; height: 139px; flex-flow: row wrap;justify-content: center;">
								<div class="info-wrap" >
									<div class="list-head-imgs">
										<div class="pic" onclick="window.open('news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711');pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});">
											<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0">
										</div>
							
										<div class="follow-info fi-0" style="display: none;">
											<div class="character-info">
												<div class="info-pic">
													<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0" class="character-img">
												</div>
												<div class="info-right">
													<p class="p-wrap-ci0">
														<a href="news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711" target="_blank" class="name"
														 onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});" title="英雄联盟Miss">英雄联盟Miss</a>
														<span class="sub">
							
															<a href="javascript:IndexObject.doFollowPlayer(true, '0')"><i class="icon-heart"></i>关注</a>
							
															<span class="num">37.7万</span>
														</span>
													</p>
													<p class="p-wrap-ci1">
														Miss，游戏女主持，魔兽3、星际2 女子冠军。代表作品：《Miss排位日记》。
													</p>
												</div>
											</div>
											<div class="character-representative" style="">
												<p><i class="icon-representative"></i>代表作</p>
												<ul>
							
													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/70aff7dbfdd3a9b7aff284ef1f030f62/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记244期疾风剑豪亚索</p>
														<a href="/v/v2/detail.shtml?docid=6256699786770558362" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>
							
													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/9c665042c55ca948e808d5c1b57ae7aa/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记EP357 天残脚！打野盲僧暴力carry!</p>
														<a href="/v/v2/detail.shtml?docid=9577901856322855884" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>
							
												</ul>
											</div>
										</div>
									</div>
									<!--<i class="icon-letter-v"></i>-->
									<p class="name2" title="英雄联盟Miss">英雄联盟Miss</p>
								</div>
								<Button type="warning" :ghost='gz3' @click="change3()" style="width: 68px; height: 30px; text-align: center;">{{gg3}}</Button>
							
							</li>
							
							<li style="display: flex; flex: 0 0 25%; width: 108px; height: 139px; flex-flow: row wrap;justify-content: center;">
								<div class="info-wrap" >
									<div class="list-head-imgs">
										<div class="pic" onclick="window.open('news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711');pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});">
											<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0">
										</div>

										<div class="follow-info fi-0" style="display: none;">
											<div class="character-info">
												<div class="info-pic">
													<img src="https://shp.qpic.cn/cfwebcap/0/e1643ac2193358765e4138e97c242e78/0" class="character-img">
												</div>
												<div class="info-right">
													<p class="p-wrap-ci0">
														<a href="news.shtml?initGrid=0&amp;id=a9571232-8ea2-4514-b766-2051925c5711" target="_blank" class="name"
														 onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_other_home'});" title="英雄联盟Miss">英雄联盟Miss</a>
														<span class="sub">

															<a href="javascript:IndexObject.doFollowPlayer(true, '0')"><i class="icon-heart"></i>关注</a>

															<span class="num">37.7万</span>
														</span>
													</p>
													<p class="p-wrap-ci1">
														Miss，游戏女主持，魔兽3、星际2 女子冠军。代表作品：《Miss排位日记》。
													</p>
												</div>
											</div>
											<div class="character-representative" style="">
												<p><i class="icon-representative"></i>代表作</p>
												<ul>

													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/70aff7dbfdd3a9b7aff284ef1f030f62/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记244期疾风剑豪亚索</p>
														<a href="/v/v2/detail.shtml?docid=6256699786770558362" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>

													<li>
														<img src="http://shp.qpic.cn/lolwebvideo/201406/9c665042c55ca948e808d5c1b57ae7aa/0" onerror="onerror=null;src='//ossweb-img.qq.com/images/lol/space/placeholder.png'">
														<p>Miss排位日记EP357 天残脚！打野盲僧暴力carry!</p>
														<a href="/v/v2/detail.shtml?docid=9577901856322855884" target="_blank" onclick="pgvSendClick({hottag:'v3.space.index.recommend_go_video_detail'});"></a>
													</li>

												</ul>
											</div>
										</div>
									</div>
									<!--<i class="icon-letter-v"></i>-->
									<p class="name2" title="英雄联盟Miss">英雄联盟Miss</p>
								</div>
								<Button type="warning" :ghost='gz4' @click="change4()" style="width: 68px; height: 30px; text-align: center;">{{gg4}}</Button>

							</li>
						</ul>
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
				power:'',
				zxx:false,
				userimg:'//ossweb-img.qq.com/images/lol/v2/personal/avatar/default.png',
				gg:'取消',
				gz:false,
				gg2:'关注',
				gz2:true,
				gg3:'关注',
				gz3:true,
				gg4:'关注',
				gz4:true,
				username: '逆流鱼'
			}
		},
		created() {
			// this.axios.get('http://localhost:3000/newsmsgs/list').then((data) => {
			// 	this.newsdata = data.data.data;
			// 	console.log(data.data)
			//    此时登录成功
			this.power = localStorage.getItem('power')
			      let token = localStorage.getItem('token')
			//    console.log(token)
			      if (token) {
					this.zxx=true
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
			  clear: function (event) {
			    localStorage.clear();
			    window.location.reload();
			    window.location.href = window.location.href;
			  },
			  gologin(){
				  this.$router.push({path:'/login'});
			  },
			  goherolist(){
				  this.$router.push({path:'/gamelist'});
			  },
			change(){
				if(this.gg=='关注'&&this.gz)
				{
					this.gg='取消';
					this.gz=false;
				}
				else{
					this.gg='关注';
					this.gz=true;
				}
			},
			change2(){
				if(this.gg2=='关注'&&this.gz2)
				{
					this.gg2='取消';
					this.gz2=false;
				}
				else{
					this.gg2='关注';
					this.gz2=true;
				}
			},
			change3(){
				if(this.gg3=='关注'&&this.gz3)
				{
					this.gg3='取消';
					this.gz3=false;
				}
				else{
					this.gg3='关注';
					this.gz3=true;
				}
			},
			change4(){
				if(this.gg4=='关注'&&this.gz4)
				{
					this.gg4='取消';
					this.gz4=false;
				}
				else{
					this.gg4='关注';
					this.gz4=true;
				}
			},
			goindex(){
						  this.$router.push({path:'/'});
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
					  						},
			gomy_msg(){
				 this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 18
                                }
                            }),
                            h('div', 'Loading')
                        ])
                    }
                });
                setTimeout(() => {
                  this.$router.push({path:'/my_msg'});
                }, 2000); 
			},
			gonews(){
				 this.$Spin.show({
				    render: (h) => {
				        return h('div', [
				            h('Icon', {
				                'class': 'demo-spin-icon-load',
				                props: {
				                    type: 'ios-loading',
				                    size: 18
				                }
				            }),
				            h('div', 'Loading')
				        ])
				    }
				});
				setTimeout(() => {
					this.$Spin.hide();
				  this.$router.push({path:'/news'});
				}, 2000); 
				
			}
		}
	}
</script>

<style>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
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
	.starbtn{
		display: flex;
		margin-left: 20px;
		margin-right: 30px;
	}
	.starbtn li{
		flex: 0 0 25%;
		width: 109px;
		height: 120px;
	}
	.info-wrap{
		height: 6.75rem;
		width: 6.8125rem;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
	}
	.pic{
		width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    border: 1px solid #bb9a6c;
	}
	.pic img{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 1px solid #bb9a6c;
	}
	.list-head-imgs{
		margin: 0 13px;
	}
	.time {}

	.name {
		margin-left: 10px;
		color: #444;
		width: 140px;
		text-align: start;
		margin-right: 25px;
	}

	ul {
		list-style: none;
	}

	.read {
		margin-right: 25px;
		width: 70px;
	}

	.newsitem {
		border: #f1f1f1 1px solid;
		padding: 15px 0;
		width: 100%;
		display: flex;
		align-items: center;
		transition: All 0.4s ease-in-out;
            -webkit-transition: All 0.4s ease-in-out;
            -moz-transition: All 0.4s ease-in-out;
            -o-transition: All 0.4s ease-in-out;
			
	}
	.newsitem:hover{
		 transform: translate(0, -10px);
            -webkit-transform: translate(0, -10px);
            -moz-transform: translate(0, -10px);
            -o-transform: translate(0, -10px);
            -ms-transform: translate(0, -10px);
			box-shadow:-3px 7px 4px #C2B6C0;
	}

	.main-info {
		display: flex;
		flex-flow: column;
		margin-left: 20px;
	}

	.main-info-operation {
		margin-top: 20px;
		display: flex;
		align-items: center;
	}

	.label-articl {
		color: #0baac0;
		background: #f0f0f0;
		padding: 4px 9px;
	}

	.list-head-img {
		width: 23px;
		height: 23px;
		border-radius: 50%;
	}

	.icon-read {
		width: 16px;
		height: 12px;
	}

	.newsbox {
		display: flex;
		width: 100%;
		margin: 70px 67px;

	}

	.newsboxleft {
		border: 1px solid #f1f1f1;
		width: 60%;
		margin-right: 25px;
		padding-bottom: 40px;
	}

	.newsboxright {
		border: 1px solid #f1f1f1;
		width: 38%;
	}

	.boxmsg {
		width: 100%;
		height: 150px;
		background: #ffffff;
		margin-top: -120px;
		border: 1px solid #f1f1ff;
	}

	.gamemsg_base {
		display: flex;
		flex-flow: column;
		margin-left: 30px;
	}

	.gamemsg {
		display: flex;
	}

	.mytitle {
		height: 139px;
		width: 137px;
		margin-left: 50px;
		border-radius: 50%;

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
		cursor:pointer;
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

	.my_box {
		margin-top: 40px;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
	}

	.my_msg {
		width: 90%;
		height: 400px;
	}

	.xinbie {
		width: 14px;
		height: 14px;
		background-image: url(//ossweb-img.qq.com/images/lol/space/sprite-img.png);
		background-size: 2425px 572px;
		background-repeat: no-repeat;
	}

	.user-lv {
		background: #0baac0;
		border-radius: 4px;
		color: #fff;
		height: 18px;
		padding: 2px;
		line-height: 17px;
	}
</style>

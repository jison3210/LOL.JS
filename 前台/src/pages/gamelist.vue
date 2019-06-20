<template>
	<div class="body" style="background-color: #EEEEEE;">
		<div class="header">
			<div class="comm-topact">

			</div>
			<div class="comm-head">
				<img src="../assets/logo.png" style="width: 8.25rem; height: 3.0625rem; cursor:pointer" @click="goindex()" />
				<ul class="head-nav">
					<li>
						<a>
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
						<img v-bind:src='userimg' width="36" height="auto" alt="玩家头像">
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
		<div class="gamelistbody">
			<div class="daohang" style="float: left;margin-left: 60px; margin-top: 40px;margin-bottom: 2px;">
				<Breadcrumb>
					<Breadcrumb-item href="">
						<Icon type="ios-home-outline"></Icon> 主页
					</Breadcrumb-item>
					<Breadcrumb-item href="/components/breadcrumb">
						<Icon type="social-buffer-outline"></Icon> 游戏资料
					</Breadcrumb-item>
					<Breadcrumb-item>
						<Icon type="pound"></Icon> 英雄
					</Breadcrumb-item>
				</Breadcrumb>
			</div>
			<div class="herolist">
				<ul class="imgtextlist">
					<li class="heroli" v-for="item in herodata" :key='item.sname'>
						<Tooltip max-width="400" :content='item.herostory' transfer='true'>
							<a href="" :title='item.heroname'><img :src='item.herosrc' alt='item.heroname'>
								<p>{{item.herosname}}</p>
							</a>
						</Tooltip>
					</li>
				</ul>
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
				zxx: false,
				userimg: '//ossweb-img.qq.com/images/lol/v2/personal/avatar/default.png',
				isLogin: false,
				username: '',
				herodata:[],
				herodata2: [{
						heroname: '暗裔剑魔 亚托克斯',
						herosname: '暗裔剑魔',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Aatrox.png',
						herostory: '亚托克斯和他的同胞们曾是恕瑞玛对抗虚空之地时满载荣耀的守护者一族，最终却变成了符文之地的一个更大的威胁，并且仅被击败于被诡诈的致命巫术。但在被囚禁了数个世纪后，亚托克斯率先找到重获自由之法，那就是对那些蠢得妄图尝试挥舞那把含有他灵魂精华的神奇武器的愚妄之徒进行腐蚀和转化。现在，凭借偷来的血肉躯体，他以一种近似他之前形态的凶残外表行走于符文之地中，寻求着一次毁天灭地且久未兑现的复仇。'
					},
					{
						heroname: '九尾妖狐 阿狸',
						herosname: '九尾妖狐',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ahri.png',
						herostory: '符文之地的潜在力量和她有着与生俱来的共鸣。原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每一个被吞噬的灵魂，都伴随着他们生前的记忆。'
					},
					{
						heroname: '离群之刺 阿卡丽',
						herosname: '离群之刺',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Akali.png',
						herostory: '无论是均衡教派还是暗影之拳的称号，都已被阿卡丽抛弃，如今的阿卡丽独来独往，随时可以成为她的人民所需要的夺命武器。虽然她牢牢铭记着她从宗师慎身上学来的一切，但她效忠的保护艾欧尼亚并铲除敌人，每次一条命。或许阿卡丽的出击悄然无声，但她传达的信息将响亮无比：不听命于任何人的刺客最为可怕。'
					},
					{
						heroname: '牛头酋长 阿利斯塔',
						herosname: '牛头酋长',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Alistar.png',
						herostory: '阿利斯塔一直都是威名远扬的巨力勇士，他要为自己被屠杀的氏族向诺克萨斯帝国复仇。虽然他曾被奴役，并被迫成为斗兽场中的角斗士，但他坚不可摧的意志使他免于沦为真正的野兽。现在，挣脱了奴役枷锁的他继续以受苦之人和弱者的名义战斗。他的愤怒，还有犄角、蹄子和拳头，都是他的武器。'
					},
					{
						heroname: '殇之木乃伊 阿木木',
						herosname: '殇之木乃伊',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Amumu.png',
						herostory: '在远古的恕瑞玛，有一个孤独而又忧郁的灵魂，阿木木。他在世间游荡，只为找到一个朋友。他遭受了一种远古的巫术诅咒，注定忍受永世的孤单，因为被他触碰就意味着死亡，他的喜爱便是毁灭。所有自称见过阿木木的人都说他是一具活生生的死尸，身材矮小，通体捆绑着青灰色的绷带。世人围绕阿木木编造了许多神话故事、民间传说和史诗传奇。这些故事世代传颂，以至于再也没人能分得清哪些是真相，哪些是幻想。'
					},
					{
						heroname: '冰晶凤凰 艾尼维亚',
						herosname: '冰晶凤凰',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Anivia.png',
						herostory: '艾尼维亚是一个充满仁慈的飞禽形态灵体，曾经历过无数次诞生、死亡与重生的轮回，始终眷顾着弗雷尔卓德。她是生于凛冽冰风中的半神，可以操控冰雪的元素之力，阻挡那些胆敢侵犯她家园的人。艾尼维亚指引并保护着北方贫瘠土地上的人类部落，而这些人类也将她奉为希望的象征和重大变革的预兆。她的每一次奋战都不遗余力，因为她知道，自己的记忆将会超越牺牲，长久地留存，而她也将在崭新的明天中重生。'
					},
					{
						heroname: '黑暗之女 安妮',
						herosname: '黑暗之女',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Annie.png',
						herostory: '既拥有危险夺命的能力，又拥有小大人儿的可爱模样，安妮是一名掌握着深不可测的占火魔法的幼女魔法师。安妮生活在诺克萨斯北边的山脚下，即使是在这种地方，她也仍然是魔法师中的异类。她与火焰的紧密关系与生俱来，最初是伴随着喜怒无常的情绪冲动出现的，不过后来她学会了如何掌握这些“好玩的小把戏”。其中她最喜欢的就是召唤她亲爱的泰迪熊提伯斯——一头狂野的守护兽。安妮已经迷失在了永恒的天真里。她在黑暗的森林中游荡，始终寻觅着能陪自己玩耍的人。'
					},
					{
						heroname: '寒冰射手 艾希',
						herosname: '寒冰射手',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ashe.png',
						herostory: '作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。'
					},
					{
						heroname: '铸星龙王 奥瑞利安·索尔',
						herosname: '铸星龙王',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/AurelionSol.png',
						herostory: '奥瑞利安•索尔曾创造了奇迹般的群星，为无垠的荒芜太空布下他宏伟的恩典。而如今，他的威能却遭人设计，被迫服务于某个潜藏在深空中的帝国。为了重返铸星大道，奥瑞利安•索尔誓要夺回属于自己的自由。哪怕召星降怒，倾覆众生。'
					},
					{
						heroname: '沙漠皇帝 阿兹尔',
						herosname: '沙漠皇帝',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Azir.png',
						herostory: '阿兹尔是上古时期恕瑞玛的一位凡人皇帝，一位站在不朽神话巅峰的自豪之人。但他的狂妄引来了旁人的背叛，在最伟大胜利降临的那一刻将他杀害。而现在，数千年后，他重获新生并成为了力量无边的飞升者。阿兹尔的城市已经从黄沙之下崛起，他要让恕瑞玛恢复曾经的荣光。'
					},
					{
						heroname: '星界游神 巴德',
						herosname: '星界游神',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Bard.png',
						herostory: '巴德是星界彼端的旅者，是奇缘巧遇的使者。他艰难地维护着宇宙的平衡，从而让生命能够抵御无情的混乱。符文之地有许多人传唱关于他的歌谣，内容里流露出对他超凡本质的猜想，而所有这些歌谣都会提及同一件事：这位星界游荡者总是会被强大的魔法圣物所吸引。一群木灵欢唱乐团始终围绕在巴德身边充当小帮手，他的行为绝不会被误会带有任何恶意，因为他永远都是在为更大的良善尽职尽责，只不过他的方式不为常人理解。'
					},
					{
						heroname: '蒸汽机器人 布里茨',
						herosname: '蒸汽机器人',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Blitzcrank.png',
						herostory: '布里茨是来自祖安的一个巨大的、几乎坚不可摧的机械体，最初被制造出来的目的是为了处理有毒肥料。然而他觉得自己存在的意义太过狭隘，于是就改装了自己的形态，以便更好地效力于地沟区的孱弱人群。布里茨无私地使用自己的力量和钢铁之躯保护其他人，伸出长长的机械援手，或者发出能量脉冲，制服任何带来麻烦的人。'
					},
					{
						heroname: '复仇焰魂 布兰德',
						herosname: '复仇焰魂',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Brand.png',
						herostory: '基根·诺和曾经是一名普通弗雷尔卓德部族居民，现在则变成了另一种生物，布兰德。他的身世警醒着后人，被更强大的力量所诱惑会带来什么后果。基根为了追寻传说中的世界符文，背叛了自己的同伴并将符文据为己有，就在那一瞬间，这个人彻底消失了。他的灵魂被彻底燃尽，他的身躯成为了活体烈焰的容器，如今，布兰德游荡在瓦洛兰，寻觅着其他的符文。他曾遭受的苦难，凡人活上十几辈子也未必能够经历，而他发誓此仇必报。'
					},
					{
						heroname: '弗雷尔卓德之心 布隆',
						herosname: '弗雷尔之心',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Braum.png',
						herostory: '拥有大块肌肉和更大颗心脏的布隆，是弗雷尔卓德的一个受人爱戴的英雄。弗雷尔卓德北部的任何一家蜜酒坊里都有人会致敬他传奇般的强壮，据说他曾在一夜之间扫平一整片橡树森林，还曾用拳头把一整座山打成碎石子。一扇附有魔法的秘库大门被他拿在手中当做盾牌，布隆在北方的冻土上漫游，小胡子勾勒出的微笑和他的肌肉块头一样大， 真诚友善地帮助所有危难之中的人。'
					},
					{
						heroname: '皮城女警 凯特琳',
						herosname: '皮城女警',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Caitlyn.png',
						herostory: '凯特琳被誉为皮尔特沃夫最顶尖的和平卫士，同时也是让这座城市真正摆脱地下隐秘犯罪的最有希望的人选。她经常和蔚联手执行任务，以冷静和沉着弥补自己搭档的鲁莽天性。虽然她的海克斯科技步枪独一无二，但凯特琳最强大的武器其实是她过人的智谋，总是能设下天罗地网，迎接任何傻到敢在进步之城作案的不法之徒。'
					},
					{
						heroname: '青钢影 卡蜜尔',
						herosname: '青钢影',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Camille.png',
						herostory: '卡蜜尔是菲罗斯家族的首席密探，游走于法律已然失效的边缘地带，小心地维护着皮尔特沃夫这台机器和其下的祖安，保证一切都能顺畅地运转。灵活而精准的她认为，任何浮皮潦草的技术都是必须被禁绝的丑陋行径。她的心智也如同身下的刀刃一般锐利。为了追求极致，她对自己进行了大幅度的海克斯人体增强手术。这也让很多人不禁怀疑，她根本就是一台纯粹的机器，而不是一个女人。'
					},
					{
						heroname: '魔蛇之拥 卡西奥佩娅',
						herosname: '魔蛇之拥',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Cassiopeia.png',
						herostory: '卡西奥佩娅是个夺命的生物，决心要操纵其他人屈服于自己的阴险意志之下。身为诺克萨斯贵族杜·克卡奥家族的最年轻、最漂亮的女儿，她冒险深入恕瑞玛古代墓穴找寻远古的力量。在墓穴中，她被恐怖的墓穴守卫咬中，在毒液的作用下变成了毒蛇外形的掠食者。狡猾而敏捷的卡西奥佩娅如今在夜幕的掩护下蜿蜒滑行，用阴森的凝视让敌人石化。'
					},
					{
						heroname: '虚空恐惧 科加斯',
						herosname: '虚空恐惧',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Chogath.png',
						herostory: '自从科加斯出现在符文之地烈日照射之下的那一刻起，它就被永不餍足的饥饿所驱使。虚空吞噬一切生命的欲望完美地体现在科加斯的身上，它复杂的生物构造能够迅速将物质转化为身体的成长，不仅会增加肌肉的质量和密度，还能让外壳变得有如钻石般坚硬。当单纯的体型增长已经不能满足它时，这只虚空生物就会将多余的物质形成锋利的骨刺吐出体外，刺穿猎物，为稍后的盛宴进行准备。'
					},
					{
						heroname: '英勇投弹手 库奇',
						herosname: '英勇投弹手',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Corki.png',
						herostory: '约德尔飞行员库奇最爱两件事物：一是飞行，二是自己英俊的小胡子，排名不分先后。离开班德尔城以后，他在皮尔特沃夫安家，从此爱上了这里奇异壮观的各式机器。他决定投身于飞行装置的开发事业，带领一群老练飞行员组成了一只空中防御力量，得名“尖啸之蛇”。临危不乱的库奇在他第二故乡的空域戒备巡逻，而他还从没见过什么问题是一轮导弹齐射不能解决的。'
					},
					{
						heroname: '诺克萨斯之手 德莱厄斯',
						herosname: '诺克萨斯之手',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Darius.png',
						herostory: '提到诺克萨斯力量的象征，帝国上下没有人能比德莱厄斯这名久经沙场的指挥官更加适合。他从无名小卒逐渐成长为诺克萨斯之手，劈开了无数敌人的身躯 —— 其中也不乏诺克萨斯自己人。他从不怀疑自己执行的公义，也从不会在举起战斧后迟疑。作为崔法利军团的领导者，德莱厄斯的任何对手都不用指望他手下留情。'
					},
					{
						heroname: '皎月女神 黛安娜',
						herosname: '皎月女神',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Diana.png',
						herostory: '戴安娜永远都佩着她的月刃 ，她是皎月教派的武士，不过她的教派在巨神峰周围地区几乎已经销声匿迹。黛安娜身穿闪烁着冬夜寒雪之光的铠甲，是皎月神力的凡间化身。她在巨神峰之巅与星灵精魄相融，不再是单纯的凡人。现在的她努力抗争着，寻找着神的启示，以及自己的力量和存在对于这个世界的意义。'
					},
					{
						heroname: '荣耀行刑官 德莱文',
						herosname: '荣耀行刑官',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Draven.png',
						herostory: '在诺克萨斯，有一种战士被称为“清算人”。他们在竞技场里互相厮杀，以鲜血作为赌注进行力量的考验，不过没有任何人能像德莱文那样受人追捧。曾经参过军的他，发现竞技场的观众们尤为喜爱他的耀武扬威和刻意表演，和他使用飞斧的无匹技艺。这种狂傲的完美带来的赞叹令他上瘾，因此德莱文发誓要不惜代价打败任何对手，以此确保自己的名字在帝国之中永世传唱。'
					},
					{
						heroname: '祖安狂人 蒙多医生',
						herosname: '祖安狂人',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/DrMundo.png',
						herostory: '精神与认知彻底崩坏、杀人的欲望永不满足、浑身皮肤紫得发黑，这就是蒙多医生，这就是祖安人在漆黑的夜里不敢出门的原因。这个头脑简单的恐怖怪人似乎唯一关心的东西就是痛苦，不仅是施加痛苦，而且也是感受痛苦。他抡着一把巨大的切肉刀，举重若轻。他曾经捕捉并折磨过数十名祖安居民，因此声名狼藉。他将自己的行为称为“手术”，但却没有任何真正的目的。他残酷无情。他神出鬼没。他想去哪儿就去哪儿。另外，准确地说，他并不是一名医生。'
					},
					{
						heroname: '时间刺客 艾克',
						herosname: '时间刺客',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ekko.png',
						herostory: '艾克是一名来自祖安不良街区的奇才。他可以操纵时间，从而让任何处境都变得对自己有利。通过使用他自己的发明——Z型驱动——他可以探索其他平行现实的分支并创造最完美的条件。尽管他酷爱这种自由，但只要他的朋友们遇到了威胁，他就会不顾一切地去保护他们。在旁观者眼里，艾克总是能初次尝试就完成不可能之举，屡试不爽。'
					},
					{
						heroname: '蜘蛛女皇 伊莉丝',
						herosname: '蜘蛛女皇',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Elise.png',
						herostory: '诺克萨斯帝国最古老城市的地下深处，有一处不见天日的禁地，这是夺命的掠食者伊莉丝的宫殿。当她还是一个凡人的时候，她是曾经显赫一时的家族女主人，但是自从被一个卑鄙的半神咬伤之后，她就化身成了美丽的不死异类，一个形似蜘蛛的生物，用蛛网诱捕毫无防备的猎物。为了永葆青春，伊莉丝现在喜欢捕食那些无戒心、无信仰的人，而这世上也鲜少有人能够抗拒她的诱惑。'
					},
					{
						heroname: '痛苦之拥 伊芙琳',
						herosname: '痛苦之拥',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Evelynn.png',
						herostory: '在符文之地的黑暗裂缝中，恶魔伊芙琳一直在搜寻着下一个目标。她披着人类女性的撩人外表，勾引她的猎物。只要有人被她魅惑，伊芙琳就会显露出真正的形态。她会施加难以言喻的折磨，从而让自己在猎物的疼痛中获得满足。对于这个恶魔来说，这样的欢愉只是无心无邪的滥情。但是对于符文之地上的其他人，听到的则是血肉模糊的传说，提醒着人们肉欲的危险和纵欲的代价。'
					},
					{
						heroname: '探险家 伊泽瑞尔',
						herosname: '探险家',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ezreal.png',
						herostory: '神采奕奕的冒险家伊泽瑞尔拥有自己不知道的魔法天赋，他搜刮失落已久的古墓，触碰古老的诅咒，还举重若轻地挑战常人不可能完成的极限。他的勇气和壮举无边无际，总是喜欢随机应变地解决任何情况，一定程度上依赖他的小聪明，但更主要是依赖他神秘的恕瑞玛护手，在他的操控下释放出破坏性的奥术爆弹。有一件事可以肯定——只要伊泽瑞尔出现，那么麻烦一定接踵而至。或是还没走远。范围大概是随时随地。'
					},
					{
						heroname: '末日使者 费德提克',
						herosname: '末日使者',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiddlesticks.png',
						herostory: '费德提克是一个骇人的活体稻草人，一个徘徊在黑暗中的憎恶之物，他挥舞着一把镰刀并捕食着粗心的生物们。在群鸦们的凶蛮啄杀的协助下，费德提克会先品味猎物们的恐惧，然后再于飓风般的羽毛与溅血的利喙之中取走猎物们的性命。'
					},
					{
						heroname: '无双剑姬 菲奥娜',
						herosname: '无双剑姬',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiora.png',
						herostory: '菲奥娜是全瓦洛兰最可怕的决斗家。她以雷厉风行、狡黠聪慧闻名于世，同样著名的还有她舞弄自己蓝钢佩剑的矫健。菲奥娜出生在德玛西亚王国的劳伦特家族，她从父亲的手中接管了家业，并在一场丑闻风波中将家族拯救于于灭亡的边缘。虽然劳伦特家威严不再，但菲奥娜却一直在不懈地努力，希望重振家族荣耀，让劳伦特这个名字重回德玛西亚名望贵族之列。'
					},
					{
						heroname: '潮汐海灵 菲兹',
						herosname: '潮汐海灵',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fizz.png',
						herostory: '菲兹是一名水陆两栖的约德尔人，生活在比尔吉沃特周围的群礁之间。他会经常把迷信的船长们抛进海中的什一税捡起来物归原主。不过即使是最粗鲁的水手也知道不要招惹他，因为这里流传着的各种教训，都是因为低估了这个小鬼。经常有人误会他的行为只是海洋精灵的任性举动，而事实上他可以号令来自深渊的巨型猛兽，而且不管是盟友还是敌人他都喜欢捉弄。'
					},
					{
						heroname: '正义巨像 加里奥',
						herosname: '正义巨像',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Galio.png',
						herostory: '光彩熠熠的德玛西亚城外，石巨像加里奥始终如一地守望着。他被创造出来是为了抵挡来犯的法师，但却经常要一动不动地矗立数十年，只有当强大的魔法力量出现时，他才会激活。而只要加里奥活动起来，他便会充分利用每一刻，品味荡气回肠的战斗和来之不易的守护人民的荣耀。可惜，他的胜利永远都喜忧参半，因为消灭魔法的同时，也消灭了他活跃力量的源泉。每一次胜利都会使他再次进入不知世事的休眠。'
					},
					{
						heroname: '海洋之灾 普朗克',
						herosname: '海洋之灾',
						herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Gangplank.png',
						herostory: '诡计多端、心狠手辣的普朗克是被废黜的强盗之王，他令人恐惧的名号广达远至。他一度是港口城市比尔吉沃特的统治者。虽然现在他的威权已经不再，但人们相信这只会让他变得更加可怖。普朗克若是知道有人要从他手中抢走比尔吉沃特，必然会大肆血洗这座城市。而如今有了火枪、弯刀，还有一桶桶的火药，他决心要夺回自己失去的东西。'
					},
					{
							heroname: '暗裔剑魔 亚托克斯',
							herosname: '暗裔剑魔',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Aatrox.png',
							herostory: '亚托克斯和他的同胞们曾是恕瑞玛对抗虚空之地时满载荣耀的守护者一族，最终却变成了符文之地的一个更大的威胁，并且仅被击败于被诡诈的致命巫术。但在被囚禁了数个世纪后，亚托克斯率先找到重获自由之法，那就是对那些蠢得妄图尝试挥舞那把含有他灵魂精华的神奇武器的愚妄之徒进行腐蚀和转化。现在，凭借偷来的血肉躯体，他以一种近似他之前形态的凶残外表行走于符文之地中，寻求着一次毁天灭地且久未兑现的复仇。'
						},
						{
							heroname: '九尾妖狐 阿狸',
							herosname: '九尾妖狐',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ahri.png',
							herostory: '符文之地的潜在力量和她有着与生俱来的共鸣。原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每一个被吞噬的灵魂，都伴随着他们生前的记忆。'
						},
						{
							heroname: '离群之刺 阿卡丽',
							herosname: '离群之刺',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Akali.png',
							herostory: '无论是均衡教派还是暗影之拳的称号，都已被阿卡丽抛弃，如今的阿卡丽独来独往，随时可以成为她的人民所需要的夺命武器。虽然她牢牢铭记着她从宗师慎身上学来的一切，但她效忠的保护艾欧尼亚并铲除敌人，每次一条命。或许阿卡丽的出击悄然无声，但她传达的信息将响亮无比：不听命于任何人的刺客最为可怕。'
						},
						{
							heroname: '牛头酋长 阿利斯塔',
							herosname: '牛头酋长',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Alistar.png',
							herostory: '阿利斯塔一直都是威名远扬的巨力勇士，他要为自己被屠杀的氏族向诺克萨斯帝国复仇。虽然他曾被奴役，并被迫成为斗兽场中的角斗士，但他坚不可摧的意志使他免于沦为真正的野兽。现在，挣脱了奴役枷锁的他继续以受苦之人和弱者的名义战斗。他的愤怒，还有犄角、蹄子和拳头，都是他的武器。'
						},
						{
							heroname: '殇之木乃伊 阿木木',
							herosname: '殇之木乃伊',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Amumu.png',
							herostory: '在远古的恕瑞玛，有一个孤独而又忧郁的灵魂，阿木木。他在世间游荡，只为找到一个朋友。他遭受了一种远古的巫术诅咒，注定忍受永世的孤单，因为被他触碰就意味着死亡，他的喜爱便是毁灭。所有自称见过阿木木的人都说他是一具活生生的死尸，身材矮小，通体捆绑着青灰色的绷带。世人围绕阿木木编造了许多神话故事、民间传说和史诗传奇。这些故事世代传颂，以至于再也没人能分得清哪些是真相，哪些是幻想。'
						},
						{
							heroname: '冰晶凤凰 艾尼维亚',
							herosname: '冰晶凤凰',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Anivia.png',
							herostory: '艾尼维亚是一个充满仁慈的飞禽形态灵体，曾经历过无数次诞生、死亡与重生的轮回，始终眷顾着弗雷尔卓德。她是生于凛冽冰风中的半神，可以操控冰雪的元素之力，阻挡那些胆敢侵犯她家园的人。艾尼维亚指引并保护着北方贫瘠土地上的人类部落，而这些人类也将她奉为希望的象征和重大变革的预兆。她的每一次奋战都不遗余力，因为她知道，自己的记忆将会超越牺牲，长久地留存，而她也将在崭新的明天中重生。'
						},
						{
							heroname: '黑暗之女 安妮',
							herosname: '黑暗之女',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Annie.png',
							herostory: '既拥有危险夺命的能力，又拥有小大人儿的可爱模样，安妮是一名掌握着深不可测的占火魔法的幼女魔法师。安妮生活在诺克萨斯北边的山脚下，即使是在这种地方，她也仍然是魔法师中的异类。她与火焰的紧密关系与生俱来，最初是伴随着喜怒无常的情绪冲动出现的，不过后来她学会了如何掌握这些“好玩的小把戏”。其中她最喜欢的就是召唤她亲爱的泰迪熊提伯斯——一头狂野的守护兽。安妮已经迷失在了永恒的天真里。她在黑暗的森林中游荡，始终寻觅着能陪自己玩耍的人。'
						},
						{
							heroname: '寒冰射手 艾希',
							herosname: '寒冰射手',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ashe.png',
							herostory: '作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。'
						},
						{
							heroname: '铸星龙王 奥瑞利安·索尔',
							herosname: '铸星龙王',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/AurelionSol.png',
							herostory: '奥瑞利安•索尔曾创造了奇迹般的群星，为无垠的荒芜太空布下他宏伟的恩典。而如今，他的威能却遭人设计，被迫服务于某个潜藏在深空中的帝国。为了重返铸星大道，奥瑞利安•索尔誓要夺回属于自己的自由。哪怕召星降怒，倾覆众生。'
						},
						{
							heroname: '沙漠皇帝 阿兹尔',
							herosname: '沙漠皇帝',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Azir.png',
							herostory: '阿兹尔是上古时期恕瑞玛的一位凡人皇帝，一位站在不朽神话巅峰的自豪之人。但他的狂妄引来了旁人的背叛，在最伟大胜利降临的那一刻将他杀害。而现在，数千年后，他重获新生并成为了力量无边的飞升者。阿兹尔的城市已经从黄沙之下崛起，他要让恕瑞玛恢复曾经的荣光。'
						},
						{
							heroname: '星界游神 巴德',
							herosname: '星界游神',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Bard.png',
							herostory: '巴德是星界彼端的旅者，是奇缘巧遇的使者。他艰难地维护着宇宙的平衡，从而让生命能够抵御无情的混乱。符文之地有许多人传唱关于他的歌谣，内容里流露出对他超凡本质的猜想，而所有这些歌谣都会提及同一件事：这位星界游荡者总是会被强大的魔法圣物所吸引。一群木灵欢唱乐团始终围绕在巴德身边充当小帮手，他的行为绝不会被误会带有任何恶意，因为他永远都是在为更大的良善尽职尽责，只不过他的方式不为常人理解。'
						},
						{
							heroname: '蒸汽机器人 布里茨',
							herosname: '蒸汽机器人',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Blitzcrank.png',
							herostory: '布里茨是来自祖安的一个巨大的、几乎坚不可摧的机械体，最初被制造出来的目的是为了处理有毒肥料。然而他觉得自己存在的意义太过狭隘，于是就改装了自己的形态，以便更好地效力于地沟区的孱弱人群。布里茨无私地使用自己的力量和钢铁之躯保护其他人，伸出长长的机械援手，或者发出能量脉冲，制服任何带来麻烦的人。'
						},
						{
							heroname: '复仇焰魂 布兰德',
							herosname: '复仇焰魂',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Brand.png',
							herostory: '基根·诺和曾经是一名普通弗雷尔卓德部族居民，现在则变成了另一种生物，布兰德。他的身世警醒着后人，被更强大的力量所诱惑会带来什么后果。基根为了追寻传说中的世界符文，背叛了自己的同伴并将符文据为己有，就在那一瞬间，这个人彻底消失了。他的灵魂被彻底燃尽，他的身躯成为了活体烈焰的容器，如今，布兰德游荡在瓦洛兰，寻觅着其他的符文。他曾遭受的苦难，凡人活上十几辈子也未必能够经历，而他发誓此仇必报。'
						},
						{
							heroname: '弗雷尔卓德之心 布隆',
							herosname: '弗雷尔之心',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Braum.png',
							herostory: '拥有大块肌肉和更大颗心脏的布隆，是弗雷尔卓德的一个受人爱戴的英雄。弗雷尔卓德北部的任何一家蜜酒坊里都有人会致敬他传奇般的强壮，据说他曾在一夜之间扫平一整片橡树森林，还曾用拳头把一整座山打成碎石子。一扇附有魔法的秘库大门被他拿在手中当做盾牌，布隆在北方的冻土上漫游，小胡子勾勒出的微笑和他的肌肉块头一样大， 真诚友善地帮助所有危难之中的人。'
						},
						{
							heroname: '皮城女警 凯特琳',
							herosname: '皮城女警',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Caitlyn.png',
							herostory: '凯特琳被誉为皮尔特沃夫最顶尖的和平卫士，同时也是让这座城市真正摆脱地下隐秘犯罪的最有希望的人选。她经常和蔚联手执行任务，以冷静和沉着弥补自己搭档的鲁莽天性。虽然她的海克斯科技步枪独一无二，但凯特琳最强大的武器其实是她过人的智谋，总是能设下天罗地网，迎接任何傻到敢在进步之城作案的不法之徒。'
						},
						{
							heroname: '青钢影 卡蜜尔',
							herosname: '青钢影',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Camille.png',
							herostory: '卡蜜尔是菲罗斯家族的首席密探，游走于法律已然失效的边缘地带，小心地维护着皮尔特沃夫这台机器和其下的祖安，保证一切都能顺畅地运转。灵活而精准的她认为，任何浮皮潦草的技术都是必须被禁绝的丑陋行径。她的心智也如同身下的刀刃一般锐利。为了追求极致，她对自己进行了大幅度的海克斯人体增强手术。这也让很多人不禁怀疑，她根本就是一台纯粹的机器，而不是一个女人。'
						},
						{
							heroname: '魔蛇之拥 卡西奥佩娅',
							herosname: '魔蛇之拥',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Cassiopeia.png',
							herostory: '卡西奥佩娅是个夺命的生物，决心要操纵其他人屈服于自己的阴险意志之下。身为诺克萨斯贵族杜·克卡奥家族的最年轻、最漂亮的女儿，她冒险深入恕瑞玛古代墓穴找寻远古的力量。在墓穴中，她被恐怖的墓穴守卫咬中，在毒液的作用下变成了毒蛇外形的掠食者。狡猾而敏捷的卡西奥佩娅如今在夜幕的掩护下蜿蜒滑行，用阴森的凝视让敌人石化。'
						},
						{
							heroname: '虚空恐惧 科加斯',
							herosname: '虚空恐惧',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Chogath.png',
							herostory: '自从科加斯出现在符文之地烈日照射之下的那一刻起，它就被永不餍足的饥饿所驱使。虚空吞噬一切生命的欲望完美地体现在科加斯的身上，它复杂的生物构造能够迅速将物质转化为身体的成长，不仅会增加肌肉的质量和密度，还能让外壳变得有如钻石般坚硬。当单纯的体型增长已经不能满足它时，这只虚空生物就会将多余的物质形成锋利的骨刺吐出体外，刺穿猎物，为稍后的盛宴进行准备。'
						},
						{
							heroname: '英勇投弹手 库奇',
							herosname: '英勇投弹手',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Corki.png',
							herostory: '约德尔飞行员库奇最爱两件事物：一是飞行，二是自己英俊的小胡子，排名不分先后。离开班德尔城以后，他在皮尔特沃夫安家，从此爱上了这里奇异壮观的各式机器。他决定投身于飞行装置的开发事业，带领一群老练飞行员组成了一只空中防御力量，得名“尖啸之蛇”。临危不乱的库奇在他第二故乡的空域戒备巡逻，而他还从没见过什么问题是一轮导弹齐射不能解决的。'
						},
						{
							heroname: '诺克萨斯之手 德莱厄斯',
							herosname: '诺克萨斯之手',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Darius.png',
							herostory: '提到诺克萨斯力量的象征，帝国上下没有人能比德莱厄斯这名久经沙场的指挥官更加适合。他从无名小卒逐渐成长为诺克萨斯之手，劈开了无数敌人的身躯 —— 其中也不乏诺克萨斯自己人。他从不怀疑自己执行的公义，也从不会在举起战斧后迟疑。作为崔法利军团的领导者，德莱厄斯的任何对手都不用指望他手下留情。'
						},
						{
							heroname: '皎月女神 黛安娜',
							herosname: '皎月女神',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Diana.png',
							herostory: '戴安娜永远都佩着她的月刃 ，她是皎月教派的武士，不过她的教派在巨神峰周围地区几乎已经销声匿迹。黛安娜身穿闪烁着冬夜寒雪之光的铠甲，是皎月神力的凡间化身。她在巨神峰之巅与星灵精魄相融，不再是单纯的凡人。现在的她努力抗争着，寻找着神的启示，以及自己的力量和存在对于这个世界的意义。'
						},
						{
							heroname: '荣耀行刑官 德莱文',
							herosname: '荣耀行刑官',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Draven.png',
							herostory: '在诺克萨斯，有一种战士被称为“清算人”。他们在竞技场里互相厮杀，以鲜血作为赌注进行力量的考验，不过没有任何人能像德莱文那样受人追捧。曾经参过军的他，发现竞技场的观众们尤为喜爱他的耀武扬威和刻意表演，和他使用飞斧的无匹技艺。这种狂傲的完美带来的赞叹令他上瘾，因此德莱文发誓要不惜代价打败任何对手，以此确保自己的名字在帝国之中永世传唱。'
						},
						{
							heroname: '祖安狂人 蒙多医生',
							herosname: '祖安狂人',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/DrMundo.png',
							herostory: '精神与认知彻底崩坏、杀人的欲望永不满足、浑身皮肤紫得发黑，这就是蒙多医生，这就是祖安人在漆黑的夜里不敢出门的原因。这个头脑简单的恐怖怪人似乎唯一关心的东西就是痛苦，不仅是施加痛苦，而且也是感受痛苦。他抡着一把巨大的切肉刀，举重若轻。他曾经捕捉并折磨过数十名祖安居民，因此声名狼藉。他将自己的行为称为“手术”，但却没有任何真正的目的。他残酷无情。他神出鬼没。他想去哪儿就去哪儿。另外，准确地说，他并不是一名医生。'
						},
						{
							heroname: '时间刺客 艾克',
							herosname: '时间刺客',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ekko.png',
							herostory: '艾克是一名来自祖安不良街区的奇才。他可以操纵时间，从而让任何处境都变得对自己有利。通过使用他自己的发明——Z型驱动——他可以探索其他平行现实的分支并创造最完美的条件。尽管他酷爱这种自由，但只要他的朋友们遇到了威胁，他就会不顾一切地去保护他们。在旁观者眼里，艾克总是能初次尝试就完成不可能之举，屡试不爽。'
						},
						{
							heroname: '蜘蛛女皇 伊莉丝',
							herosname: '蜘蛛女皇',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Elise.png',
							herostory: '诺克萨斯帝国最古老城市的地下深处，有一处不见天日的禁地，这是夺命的掠食者伊莉丝的宫殿。当她还是一个凡人的时候，她是曾经显赫一时的家族女主人，但是自从被一个卑鄙的半神咬伤之后，她就化身成了美丽的不死异类，一个形似蜘蛛的生物，用蛛网诱捕毫无防备的猎物。为了永葆青春，伊莉丝现在喜欢捕食那些无戒心、无信仰的人，而这世上也鲜少有人能够抗拒她的诱惑。'
						},
						{
							heroname: '痛苦之拥 伊芙琳',
							herosname: '痛苦之拥',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Evelynn.png',
							herostory: '在符文之地的黑暗裂缝中，恶魔伊芙琳一直在搜寻着下一个目标。她披着人类女性的撩人外表，勾引她的猎物。只要有人被她魅惑，伊芙琳就会显露出真正的形态。她会施加难以言喻的折磨，从而让自己在猎物的疼痛中获得满足。对于这个恶魔来说，这样的欢愉只是无心无邪的滥情。但是对于符文之地上的其他人，听到的则是血肉模糊的传说，提醒着人们肉欲的危险和纵欲的代价。'
						},
						{
							heroname: '探险家 伊泽瑞尔',
							herosname: '探险家',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ezreal.png',
							herostory: '神采奕奕的冒险家伊泽瑞尔拥有自己不知道的魔法天赋，他搜刮失落已久的古墓，触碰古老的诅咒，还举重若轻地挑战常人不可能完成的极限。他的勇气和壮举无边无际，总是喜欢随机应变地解决任何情况，一定程度上依赖他的小聪明，但更主要是依赖他神秘的恕瑞玛护手，在他的操控下释放出破坏性的奥术爆弹。有一件事可以肯定——只要伊泽瑞尔出现，那么麻烦一定接踵而至。或是还没走远。范围大概是随时随地。'
						},
						{
							heroname: '末日使者 费德提克',
							herosname: '末日使者',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiddlesticks.png',
							herostory: '费德提克是一个骇人的活体稻草人，一个徘徊在黑暗中的憎恶之物，他挥舞着一把镰刀并捕食着粗心的生物们。在群鸦们的凶蛮啄杀的协助下，费德提克会先品味猎物们的恐惧，然后再于飓风般的羽毛与溅血的利喙之中取走猎物们的性命。'
						},
						{
							heroname: '无双剑姬 菲奥娜',
							herosname: '无双剑姬',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiora.png',
							herostory: '菲奥娜是全瓦洛兰最可怕的决斗家。她以雷厉风行、狡黠聪慧闻名于世，同样著名的还有她舞弄自己蓝钢佩剑的矫健。菲奥娜出生在德玛西亚王国的劳伦特家族，她从父亲的手中接管了家业，并在一场丑闻风波中将家族拯救于于灭亡的边缘。虽然劳伦特家威严不再，但菲奥娜却一直在不懈地努力，希望重振家族荣耀，让劳伦特这个名字重回德玛西亚名望贵族之列。'
						},
						{
							heroname: '潮汐海灵 菲兹',
							herosname: '潮汐海灵',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fizz.png',
							herostory: '菲兹是一名水陆两栖的约德尔人，生活在比尔吉沃特周围的群礁之间。他会经常把迷信的船长们抛进海中的什一税捡起来物归原主。不过即使是最粗鲁的水手也知道不要招惹他，因为这里流传着的各种教训，都是因为低估了这个小鬼。经常有人误会他的行为只是海洋精灵的任性举动，而事实上他可以号令来自深渊的巨型猛兽，而且不管是盟友还是敌人他都喜欢捉弄。'
						},
						{
							heroname: '正义巨像 加里奥',
							herosname: '正义巨像',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Galio.png',
							herostory: '光彩熠熠的德玛西亚城外，石巨像加里奥始终如一地守望着。他被创造出来是为了抵挡来犯的法师，但却经常要一动不动地矗立数十年，只有当强大的魔法力量出现时，他才会激活。而只要加里奥活动起来，他便会充分利用每一刻，品味荡气回肠的战斗和来之不易的守护人民的荣耀。可惜，他的胜利永远都喜忧参半，因为消灭魔法的同时，也消灭了他活跃力量的源泉。每一次胜利都会使他再次进入不知世事的休眠。'
						},
						{
							heroname: '海洋之灾 普朗克',
							herosname: '海洋之灾',
							herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Gangplank.png',
							herostory: '诡计多端、心狠手辣的普朗克是被废黜的强盗之王，他令人恐惧的名号广达远至。他一度是港口城市比尔吉沃特的统治者。虽然现在他的威权已经不再，但人们相信这只会让他变得更加可怖。普朗克若是知道有人要从他手中抢走比尔吉沃特，必然会大肆血洗这座城市。而如今有了火枪、弯刀，还有一桶桶的火药，他决心要夺回自己失去的东西。'
						},
						{
								heroname: '暗裔剑魔 亚托克斯',
								herosname: '暗裔剑魔',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Aatrox.png',
								herostory: '亚托克斯和他的同胞们曾是恕瑞玛对抗虚空之地时满载荣耀的守护者一族，最终却变成了符文之地的一个更大的威胁，并且仅被击败于被诡诈的致命巫术。但在被囚禁了数个世纪后，亚托克斯率先找到重获自由之法，那就是对那些蠢得妄图尝试挥舞那把含有他灵魂精华的神奇武器的愚妄之徒进行腐蚀和转化。现在，凭借偷来的血肉躯体，他以一种近似他之前形态的凶残外表行走于符文之地中，寻求着一次毁天灭地且久未兑现的复仇。'
							},
							{
								heroname: '九尾妖狐 阿狸',
								herosname: '九尾妖狐',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ahri.png',
								herostory: '符文之地的潜在力量和她有着与生俱来的共鸣。原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每一个被吞噬的灵魂，都伴随着他们生前的记忆。'
							},
							{
								heroname: '离群之刺 阿卡丽',
								herosname: '离群之刺',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Akali.png',
								herostory: '无论是均衡教派还是暗影之拳的称号，都已被阿卡丽抛弃，如今的阿卡丽独来独往，随时可以成为她的人民所需要的夺命武器。虽然她牢牢铭记着她从宗师慎身上学来的一切，但她效忠的保护艾欧尼亚并铲除敌人，每次一条命。或许阿卡丽的出击悄然无声，但她传达的信息将响亮无比：不听命于任何人的刺客最为可怕。'
							},
							{
								heroname: '牛头酋长 阿利斯塔',
								herosname: '牛头酋长',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Alistar.png',
								herostory: '阿利斯塔一直都是威名远扬的巨力勇士，他要为自己被屠杀的氏族向诺克萨斯帝国复仇。虽然他曾被奴役，并被迫成为斗兽场中的角斗士，但他坚不可摧的意志使他免于沦为真正的野兽。现在，挣脱了奴役枷锁的他继续以受苦之人和弱者的名义战斗。他的愤怒，还有犄角、蹄子和拳头，都是他的武器。'
							},
							{
								heroname: '殇之木乃伊 阿木木',
								herosname: '殇之木乃伊',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Amumu.png',
								herostory: '在远古的恕瑞玛，有一个孤独而又忧郁的灵魂，阿木木。他在世间游荡，只为找到一个朋友。他遭受了一种远古的巫术诅咒，注定忍受永世的孤单，因为被他触碰就意味着死亡，他的喜爱便是毁灭。所有自称见过阿木木的人都说他是一具活生生的死尸，身材矮小，通体捆绑着青灰色的绷带。世人围绕阿木木编造了许多神话故事、民间传说和史诗传奇。这些故事世代传颂，以至于再也没人能分得清哪些是真相，哪些是幻想。'
							},
							{
								heroname: '冰晶凤凰 艾尼维亚',
								herosname: '冰晶凤凰',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Anivia.png',
								herostory: '艾尼维亚是一个充满仁慈的飞禽形态灵体，曾经历过无数次诞生、死亡与重生的轮回，始终眷顾着弗雷尔卓德。她是生于凛冽冰风中的半神，可以操控冰雪的元素之力，阻挡那些胆敢侵犯她家园的人。艾尼维亚指引并保护着北方贫瘠土地上的人类部落，而这些人类也将她奉为希望的象征和重大变革的预兆。她的每一次奋战都不遗余力，因为她知道，自己的记忆将会超越牺牲，长久地留存，而她也将在崭新的明天中重生。'
							},
							{
								heroname: '黑暗之女 安妮',
								herosname: '黑暗之女',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Annie.png',
								herostory: '既拥有危险夺命的能力，又拥有小大人儿的可爱模样，安妮是一名掌握着深不可测的占火魔法的幼女魔法师。安妮生活在诺克萨斯北边的山脚下，即使是在这种地方，她也仍然是魔法师中的异类。她与火焰的紧密关系与生俱来，最初是伴随着喜怒无常的情绪冲动出现的，不过后来她学会了如何掌握这些“好玩的小把戏”。其中她最喜欢的就是召唤她亲爱的泰迪熊提伯斯——一头狂野的守护兽。安妮已经迷失在了永恒的天真里。她在黑暗的森林中游荡，始终寻觅着能陪自己玩耍的人。'
							},
							{
								heroname: '寒冰射手 艾希',
								herosname: '寒冰射手',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ashe.png',
								herostory: '作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。'
							},
							{
								heroname: '铸星龙王 奥瑞利安·索尔',
								herosname: '铸星龙王',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/AurelionSol.png',
								herostory: '奥瑞利安•索尔曾创造了奇迹般的群星，为无垠的荒芜太空布下他宏伟的恩典。而如今，他的威能却遭人设计，被迫服务于某个潜藏在深空中的帝国。为了重返铸星大道，奥瑞利安•索尔誓要夺回属于自己的自由。哪怕召星降怒，倾覆众生。'
							},
							{
								heroname: '沙漠皇帝 阿兹尔',
								herosname: '沙漠皇帝',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Azir.png',
								herostory: '阿兹尔是上古时期恕瑞玛的一位凡人皇帝，一位站在不朽神话巅峰的自豪之人。但他的狂妄引来了旁人的背叛，在最伟大胜利降临的那一刻将他杀害。而现在，数千年后，他重获新生并成为了力量无边的飞升者。阿兹尔的城市已经从黄沙之下崛起，他要让恕瑞玛恢复曾经的荣光。'
							},
							{
								heroname: '星界游神 巴德',
								herosname: '星界游神',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Bard.png',
								herostory: '巴德是星界彼端的旅者，是奇缘巧遇的使者。他艰难地维护着宇宙的平衡，从而让生命能够抵御无情的混乱。符文之地有许多人传唱关于他的歌谣，内容里流露出对他超凡本质的猜想，而所有这些歌谣都会提及同一件事：这位星界游荡者总是会被强大的魔法圣物所吸引。一群木灵欢唱乐团始终围绕在巴德身边充当小帮手，他的行为绝不会被误会带有任何恶意，因为他永远都是在为更大的良善尽职尽责，只不过他的方式不为常人理解。'
							},
							{
								heroname: '蒸汽机器人 布里茨',
								herosname: '蒸汽机器人',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Blitzcrank.png',
								herostory: '布里茨是来自祖安的一个巨大的、几乎坚不可摧的机械体，最初被制造出来的目的是为了处理有毒肥料。然而他觉得自己存在的意义太过狭隘，于是就改装了自己的形态，以便更好地效力于地沟区的孱弱人群。布里茨无私地使用自己的力量和钢铁之躯保护其他人，伸出长长的机械援手，或者发出能量脉冲，制服任何带来麻烦的人。'
							},
							{
								heroname: '复仇焰魂 布兰德',
								herosname: '复仇焰魂',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Brand.png',
								herostory: '基根·诺和曾经是一名普通弗雷尔卓德部族居民，现在则变成了另一种生物，布兰德。他的身世警醒着后人，被更强大的力量所诱惑会带来什么后果。基根为了追寻传说中的世界符文，背叛了自己的同伴并将符文据为己有，就在那一瞬间，这个人彻底消失了。他的灵魂被彻底燃尽，他的身躯成为了活体烈焰的容器，如今，布兰德游荡在瓦洛兰，寻觅着其他的符文。他曾遭受的苦难，凡人活上十几辈子也未必能够经历，而他发誓此仇必报。'
							},
							{
								heroname: '弗雷尔卓德之心 布隆',
								herosname: '弗雷尔之心',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Braum.png',
								herostory: '拥有大块肌肉和更大颗心脏的布隆，是弗雷尔卓德的一个受人爱戴的英雄。弗雷尔卓德北部的任何一家蜜酒坊里都有人会致敬他传奇般的强壮，据说他曾在一夜之间扫平一整片橡树森林，还曾用拳头把一整座山打成碎石子。一扇附有魔法的秘库大门被他拿在手中当做盾牌，布隆在北方的冻土上漫游，小胡子勾勒出的微笑和他的肌肉块头一样大， 真诚友善地帮助所有危难之中的人。'
							},
							{
								heroname: '皮城女警 凯特琳',
								herosname: '皮城女警',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Caitlyn.png',
								herostory: '凯特琳被誉为皮尔特沃夫最顶尖的和平卫士，同时也是让这座城市真正摆脱地下隐秘犯罪的最有希望的人选。她经常和蔚联手执行任务，以冷静和沉着弥补自己搭档的鲁莽天性。虽然她的海克斯科技步枪独一无二，但凯特琳最强大的武器其实是她过人的智谋，总是能设下天罗地网，迎接任何傻到敢在进步之城作案的不法之徒。'
							},
							{
								heroname: '青钢影 卡蜜尔',
								herosname: '青钢影',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Camille.png',
								herostory: '卡蜜尔是菲罗斯家族的首席密探，游走于法律已然失效的边缘地带，小心地维护着皮尔特沃夫这台机器和其下的祖安，保证一切都能顺畅地运转。灵活而精准的她认为，任何浮皮潦草的技术都是必须被禁绝的丑陋行径。她的心智也如同身下的刀刃一般锐利。为了追求极致，她对自己进行了大幅度的海克斯人体增强手术。这也让很多人不禁怀疑，她根本就是一台纯粹的机器，而不是一个女人。'
							},
							{
								heroname: '魔蛇之拥 卡西奥佩娅',
								herosname: '魔蛇之拥',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Cassiopeia.png',
								herostory: '卡西奥佩娅是个夺命的生物，决心要操纵其他人屈服于自己的阴险意志之下。身为诺克萨斯贵族杜·克卡奥家族的最年轻、最漂亮的女儿，她冒险深入恕瑞玛古代墓穴找寻远古的力量。在墓穴中，她被恐怖的墓穴守卫咬中，在毒液的作用下变成了毒蛇外形的掠食者。狡猾而敏捷的卡西奥佩娅如今在夜幕的掩护下蜿蜒滑行，用阴森的凝视让敌人石化。'
							},
							{
								heroname: '虚空恐惧 科加斯',
								herosname: '虚空恐惧',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Chogath.png',
								herostory: '自从科加斯出现在符文之地烈日照射之下的那一刻起，它就被永不餍足的饥饿所驱使。虚空吞噬一切生命的欲望完美地体现在科加斯的身上，它复杂的生物构造能够迅速将物质转化为身体的成长，不仅会增加肌肉的质量和密度，还能让外壳变得有如钻石般坚硬。当单纯的体型增长已经不能满足它时，这只虚空生物就会将多余的物质形成锋利的骨刺吐出体外，刺穿猎物，为稍后的盛宴进行准备。'
							},
							{
								heroname: '英勇投弹手 库奇',
								herosname: '英勇投弹手',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Corki.png',
								herostory: '约德尔飞行员库奇最爱两件事物：一是飞行，二是自己英俊的小胡子，排名不分先后。离开班德尔城以后，他在皮尔特沃夫安家，从此爱上了这里奇异壮观的各式机器。他决定投身于飞行装置的开发事业，带领一群老练飞行员组成了一只空中防御力量，得名“尖啸之蛇”。临危不乱的库奇在他第二故乡的空域戒备巡逻，而他还从没见过什么问题是一轮导弹齐射不能解决的。'
							},
							{
								heroname: '诺克萨斯之手 德莱厄斯',
								herosname: '诺克萨斯之手',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Darius.png',
								herostory: '提到诺克萨斯力量的象征，帝国上下没有人能比德莱厄斯这名久经沙场的指挥官更加适合。他从无名小卒逐渐成长为诺克萨斯之手，劈开了无数敌人的身躯 —— 其中也不乏诺克萨斯自己人。他从不怀疑自己执行的公义，也从不会在举起战斧后迟疑。作为崔法利军团的领导者，德莱厄斯的任何对手都不用指望他手下留情。'
							},
							{
								heroname: '皎月女神 黛安娜',
								herosname: '皎月女神',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Diana.png',
								herostory: '戴安娜永远都佩着她的月刃 ，她是皎月教派的武士，不过她的教派在巨神峰周围地区几乎已经销声匿迹。黛安娜身穿闪烁着冬夜寒雪之光的铠甲，是皎月神力的凡间化身。她在巨神峰之巅与星灵精魄相融，不再是单纯的凡人。现在的她努力抗争着，寻找着神的启示，以及自己的力量和存在对于这个世界的意义。'
							},
							{
								heroname: '荣耀行刑官 德莱文',
								herosname: '荣耀行刑官',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Draven.png',
								herostory: '在诺克萨斯，有一种战士被称为“清算人”。他们在竞技场里互相厮杀，以鲜血作为赌注进行力量的考验，不过没有任何人能像德莱文那样受人追捧。曾经参过军的他，发现竞技场的观众们尤为喜爱他的耀武扬威和刻意表演，和他使用飞斧的无匹技艺。这种狂傲的完美带来的赞叹令他上瘾，因此德莱文发誓要不惜代价打败任何对手，以此确保自己的名字在帝国之中永世传唱。'
							},
							{
								heroname: '祖安狂人 蒙多医生',
								herosname: '祖安狂人',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/DrMundo.png',
								herostory: '精神与认知彻底崩坏、杀人的欲望永不满足、浑身皮肤紫得发黑，这就是蒙多医生，这就是祖安人在漆黑的夜里不敢出门的原因。这个头脑简单的恐怖怪人似乎唯一关心的东西就是痛苦，不仅是施加痛苦，而且也是感受痛苦。他抡着一把巨大的切肉刀，举重若轻。他曾经捕捉并折磨过数十名祖安居民，因此声名狼藉。他将自己的行为称为“手术”，但却没有任何真正的目的。他残酷无情。他神出鬼没。他想去哪儿就去哪儿。另外，准确地说，他并不是一名医生。'
							},
							{
								heroname: '时间刺客 艾克',
								herosname: '时间刺客',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ekko.png',
								herostory: '艾克是一名来自祖安不良街区的奇才。他可以操纵时间，从而让任何处境都变得对自己有利。通过使用他自己的发明——Z型驱动——他可以探索其他平行现实的分支并创造最完美的条件。尽管他酷爱这种自由，但只要他的朋友们遇到了威胁，他就会不顾一切地去保护他们。在旁观者眼里，艾克总是能初次尝试就完成不可能之举，屡试不爽。'
							},
							{
								heroname: '蜘蛛女皇 伊莉丝',
								herosname: '蜘蛛女皇',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Elise.png',
								herostory: '诺克萨斯帝国最古老城市的地下深处，有一处不见天日的禁地，这是夺命的掠食者伊莉丝的宫殿。当她还是一个凡人的时候，她是曾经显赫一时的家族女主人，但是自从被一个卑鄙的半神咬伤之后，她就化身成了美丽的不死异类，一个形似蜘蛛的生物，用蛛网诱捕毫无防备的猎物。为了永葆青春，伊莉丝现在喜欢捕食那些无戒心、无信仰的人，而这世上也鲜少有人能够抗拒她的诱惑。'
							},
							{
								heroname: '痛苦之拥 伊芙琳',
								herosname: '痛苦之拥',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Evelynn.png',
								herostory: '在符文之地的黑暗裂缝中，恶魔伊芙琳一直在搜寻着下一个目标。她披着人类女性的撩人外表，勾引她的猎物。只要有人被她魅惑，伊芙琳就会显露出真正的形态。她会施加难以言喻的折磨，从而让自己在猎物的疼痛中获得满足。对于这个恶魔来说，这样的欢愉只是无心无邪的滥情。但是对于符文之地上的其他人，听到的则是血肉模糊的传说，提醒着人们肉欲的危险和纵欲的代价。'
							},
							{
								heroname: '探险家 伊泽瑞尔',
								herosname: '探险家',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ezreal.png',
								herostory: '神采奕奕的冒险家伊泽瑞尔拥有自己不知道的魔法天赋，他搜刮失落已久的古墓，触碰古老的诅咒，还举重若轻地挑战常人不可能完成的极限。他的勇气和壮举无边无际，总是喜欢随机应变地解决任何情况，一定程度上依赖他的小聪明，但更主要是依赖他神秘的恕瑞玛护手，在他的操控下释放出破坏性的奥术爆弹。有一件事可以肯定——只要伊泽瑞尔出现，那么麻烦一定接踵而至。或是还没走远。范围大概是随时随地。'
							},
							{
								heroname: '末日使者 费德提克',
								herosname: '末日使者',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiddlesticks.png',
								herostory: '费德提克是一个骇人的活体稻草人，一个徘徊在黑暗中的憎恶之物，他挥舞着一把镰刀并捕食着粗心的生物们。在群鸦们的凶蛮啄杀的协助下，费德提克会先品味猎物们的恐惧，然后再于飓风般的羽毛与溅血的利喙之中取走猎物们的性命。'
							},
							{
								heroname: '无双剑姬 菲奥娜',
								herosname: '无双剑姬',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiora.png',
								herostory: '菲奥娜是全瓦洛兰最可怕的决斗家。她以雷厉风行、狡黠聪慧闻名于世，同样著名的还有她舞弄自己蓝钢佩剑的矫健。菲奥娜出生在德玛西亚王国的劳伦特家族，她从父亲的手中接管了家业，并在一场丑闻风波中将家族拯救于于灭亡的边缘。虽然劳伦特家威严不再，但菲奥娜却一直在不懈地努力，希望重振家族荣耀，让劳伦特这个名字重回德玛西亚名望贵族之列。'
							},
							{
								heroname: '潮汐海灵 菲兹',
								herosname: '潮汐海灵',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fizz.png',
								herostory: '菲兹是一名水陆两栖的约德尔人，生活在比尔吉沃特周围的群礁之间。他会经常把迷信的船长们抛进海中的什一税捡起来物归原主。不过即使是最粗鲁的水手也知道不要招惹他，因为这里流传着的各种教训，都是因为低估了这个小鬼。经常有人误会他的行为只是海洋精灵的任性举动，而事实上他可以号令来自深渊的巨型猛兽，而且不管是盟友还是敌人他都喜欢捉弄。'
							},
							{
								heroname: '正义巨像 加里奥',
								herosname: '正义巨像',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Galio.png',
								herostory: '光彩熠熠的德玛西亚城外，石巨像加里奥始终如一地守望着。他被创造出来是为了抵挡来犯的法师，但却经常要一动不动地矗立数十年，只有当强大的魔法力量出现时，他才会激活。而只要加里奥活动起来，他便会充分利用每一刻，品味荡气回肠的战斗和来之不易的守护人民的荣耀。可惜，他的胜利永远都喜忧参半，因为消灭魔法的同时，也消灭了他活跃力量的源泉。每一次胜利都会使他再次进入不知世事的休眠。'
							},
							{
								heroname: '海洋之灾 普朗克',
								herosname: '海洋之灾',
								herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Gangplank.png',
								herostory: '诡计多端、心狠手辣的普朗克是被废黜的强盗之王，他令人恐惧的名号广达远至。他一度是港口城市比尔吉沃特的统治者。虽然现在他的威权已经不再，但人们相信这只会让他变得更加可怖。普朗克若是知道有人要从他手中抢走比尔吉沃特，必然会大肆血洗这座城市。而如今有了火枪、弯刀，还有一桶桶的火药，他决心要夺回自己失去的东西。'
							},
							{
									heroname: '暗裔剑魔 亚托克斯',
									herosname: '暗裔剑魔',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Aatrox.png',
									herostory: '亚托克斯和他的同胞们曾是恕瑞玛对抗虚空之地时满载荣耀的守护者一族，最终却变成了符文之地的一个更大的威胁，并且仅被击败于被诡诈的致命巫术。但在被囚禁了数个世纪后，亚托克斯率先找到重获自由之法，那就是对那些蠢得妄图尝试挥舞那把含有他灵魂精华的神奇武器的愚妄之徒进行腐蚀和转化。现在，凭借偷来的血肉躯体，他以一种近似他之前形态的凶残外表行走于符文之地中，寻求着一次毁天灭地且久未兑现的复仇。'
								},
								{
									heroname: '九尾妖狐 阿狸',
									herosname: '九尾妖狐',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ahri.png',
									herostory: '符文之地的潜在力量和她有着与生俱来的共鸣。原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每一个被吞噬的灵魂，都伴随着他们生前的记忆。'
								},
								{
									heroname: '离群之刺 阿卡丽',
									herosname: '离群之刺',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Akali.png',
									herostory: '无论是均衡教派还是暗影之拳的称号，都已被阿卡丽抛弃，如今的阿卡丽独来独往，随时可以成为她的人民所需要的夺命武器。虽然她牢牢铭记着她从宗师慎身上学来的一切，但她效忠的保护艾欧尼亚并铲除敌人，每次一条命。或许阿卡丽的出击悄然无声，但她传达的信息将响亮无比：不听命于任何人的刺客最为可怕。'
								},
								{
									heroname: '牛头酋长 阿利斯塔',
									herosname: '牛头酋长',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Alistar.png',
									herostory: '阿利斯塔一直都是威名远扬的巨力勇士，他要为自己被屠杀的氏族向诺克萨斯帝国复仇。虽然他曾被奴役，并被迫成为斗兽场中的角斗士，但他坚不可摧的意志使他免于沦为真正的野兽。现在，挣脱了奴役枷锁的他继续以受苦之人和弱者的名义战斗。他的愤怒，还有犄角、蹄子和拳头，都是他的武器。'
								},
								{
									heroname: '殇之木乃伊 阿木木',
									herosname: '殇之木乃伊',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Amumu.png',
									herostory: '在远古的恕瑞玛，有一个孤独而又忧郁的灵魂，阿木木。他在世间游荡，只为找到一个朋友。他遭受了一种远古的巫术诅咒，注定忍受永世的孤单，因为被他触碰就意味着死亡，他的喜爱便是毁灭。所有自称见过阿木木的人都说他是一具活生生的死尸，身材矮小，通体捆绑着青灰色的绷带。世人围绕阿木木编造了许多神话故事、民间传说和史诗传奇。这些故事世代传颂，以至于再也没人能分得清哪些是真相，哪些是幻想。'
								},
								{
									heroname: '冰晶凤凰 艾尼维亚',
									herosname: '冰晶凤凰',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Anivia.png',
									herostory: '艾尼维亚是一个充满仁慈的飞禽形态灵体，曾经历过无数次诞生、死亡与重生的轮回，始终眷顾着弗雷尔卓德。她是生于凛冽冰风中的半神，可以操控冰雪的元素之力，阻挡那些胆敢侵犯她家园的人。艾尼维亚指引并保护着北方贫瘠土地上的人类部落，而这些人类也将她奉为希望的象征和重大变革的预兆。她的每一次奋战都不遗余力，因为她知道，自己的记忆将会超越牺牲，长久地留存，而她也将在崭新的明天中重生。'
								},
								{
									heroname: '黑暗之女 安妮',
									herosname: '黑暗之女',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Annie.png',
									herostory: '既拥有危险夺命的能力，又拥有小大人儿的可爱模样，安妮是一名掌握着深不可测的占火魔法的幼女魔法师。安妮生活在诺克萨斯北边的山脚下，即使是在这种地方，她也仍然是魔法师中的异类。她与火焰的紧密关系与生俱来，最初是伴随着喜怒无常的情绪冲动出现的，不过后来她学会了如何掌握这些“好玩的小把戏”。其中她最喜欢的就是召唤她亲爱的泰迪熊提伯斯——一头狂野的守护兽。安妮已经迷失在了永恒的天真里。她在黑暗的森林中游荡，始终寻觅着能陪自己玩耍的人。'
								},
								{
									heroname: '寒冰射手 艾希',
									herosname: '寒冰射手',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ashe.png',
									herostory: '作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。'
								},
								{
									heroname: '铸星龙王 奥瑞利安·索尔',
									herosname: '铸星龙王',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/AurelionSol.png',
									herostory: '奥瑞利安•索尔曾创造了奇迹般的群星，为无垠的荒芜太空布下他宏伟的恩典。而如今，他的威能却遭人设计，被迫服务于某个潜藏在深空中的帝国。为了重返铸星大道，奥瑞利安•索尔誓要夺回属于自己的自由。哪怕召星降怒，倾覆众生。'
								},
								{
									heroname: '沙漠皇帝 阿兹尔',
									herosname: '沙漠皇帝',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Azir.png',
									herostory: '阿兹尔是上古时期恕瑞玛的一位凡人皇帝，一位站在不朽神话巅峰的自豪之人。但他的狂妄引来了旁人的背叛，在最伟大胜利降临的那一刻将他杀害。而现在，数千年后，他重获新生并成为了力量无边的飞升者。阿兹尔的城市已经从黄沙之下崛起，他要让恕瑞玛恢复曾经的荣光。'
								},
								{
									heroname: '星界游神 巴德',
									herosname: '星界游神',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Bard.png',
									herostory: '巴德是星界彼端的旅者，是奇缘巧遇的使者。他艰难地维护着宇宙的平衡，从而让生命能够抵御无情的混乱。符文之地有许多人传唱关于他的歌谣，内容里流露出对他超凡本质的猜想，而所有这些歌谣都会提及同一件事：这位星界游荡者总是会被强大的魔法圣物所吸引。一群木灵欢唱乐团始终围绕在巴德身边充当小帮手，他的行为绝不会被误会带有任何恶意，因为他永远都是在为更大的良善尽职尽责，只不过他的方式不为常人理解。'
								},
								{
									heroname: '蒸汽机器人 布里茨',
									herosname: '蒸汽机器人',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Blitzcrank.png',
									herostory: '布里茨是来自祖安的一个巨大的、几乎坚不可摧的机械体，最初被制造出来的目的是为了处理有毒肥料。然而他觉得自己存在的意义太过狭隘，于是就改装了自己的形态，以便更好地效力于地沟区的孱弱人群。布里茨无私地使用自己的力量和钢铁之躯保护其他人，伸出长长的机械援手，或者发出能量脉冲，制服任何带来麻烦的人。'
								},
								{
									heroname: '复仇焰魂 布兰德',
									herosname: '复仇焰魂',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Brand.png',
									herostory: '基根·诺和曾经是一名普通弗雷尔卓德部族居民，现在则变成了另一种生物，布兰德。他的身世警醒着后人，被更强大的力量所诱惑会带来什么后果。基根为了追寻传说中的世界符文，背叛了自己的同伴并将符文据为己有，就在那一瞬间，这个人彻底消失了。他的灵魂被彻底燃尽，他的身躯成为了活体烈焰的容器，如今，布兰德游荡在瓦洛兰，寻觅着其他的符文。他曾遭受的苦难，凡人活上十几辈子也未必能够经历，而他发誓此仇必报。'
								},
								{
									heroname: '弗雷尔卓德之心 布隆',
									herosname: '弗雷尔之心',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Braum.png',
									herostory: '拥有大块肌肉和更大颗心脏的布隆，是弗雷尔卓德的一个受人爱戴的英雄。弗雷尔卓德北部的任何一家蜜酒坊里都有人会致敬他传奇般的强壮，据说他曾在一夜之间扫平一整片橡树森林，还曾用拳头把一整座山打成碎石子。一扇附有魔法的秘库大门被他拿在手中当做盾牌，布隆在北方的冻土上漫游，小胡子勾勒出的微笑和他的肌肉块头一样大， 真诚友善地帮助所有危难之中的人。'
								},
								{
									heroname: '皮城女警 凯特琳',
									herosname: '皮城女警',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Caitlyn.png',
									herostory: '凯特琳被誉为皮尔特沃夫最顶尖的和平卫士，同时也是让这座城市真正摆脱地下隐秘犯罪的最有希望的人选。她经常和蔚联手执行任务，以冷静和沉着弥补自己搭档的鲁莽天性。虽然她的海克斯科技步枪独一无二，但凯特琳最强大的武器其实是她过人的智谋，总是能设下天罗地网，迎接任何傻到敢在进步之城作案的不法之徒。'
								},
								{
									heroname: '青钢影 卡蜜尔',
									herosname: '青钢影',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Camille.png',
									herostory: '卡蜜尔是菲罗斯家族的首席密探，游走于法律已然失效的边缘地带，小心地维护着皮尔特沃夫这台机器和其下的祖安，保证一切都能顺畅地运转。灵活而精准的她认为，任何浮皮潦草的技术都是必须被禁绝的丑陋行径。她的心智也如同身下的刀刃一般锐利。为了追求极致，她对自己进行了大幅度的海克斯人体增强手术。这也让很多人不禁怀疑，她根本就是一台纯粹的机器，而不是一个女人。'
								},
								{
									heroname: '魔蛇之拥 卡西奥佩娅',
									herosname: '魔蛇之拥',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Cassiopeia.png',
									herostory: '卡西奥佩娅是个夺命的生物，决心要操纵其他人屈服于自己的阴险意志之下。身为诺克萨斯贵族杜·克卡奥家族的最年轻、最漂亮的女儿，她冒险深入恕瑞玛古代墓穴找寻远古的力量。在墓穴中，她被恐怖的墓穴守卫咬中，在毒液的作用下变成了毒蛇外形的掠食者。狡猾而敏捷的卡西奥佩娅如今在夜幕的掩护下蜿蜒滑行，用阴森的凝视让敌人石化。'
								},
								{
									heroname: '虚空恐惧 科加斯',
									herosname: '虚空恐惧',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Chogath.png',
									herostory: '自从科加斯出现在符文之地烈日照射之下的那一刻起，它就被永不餍足的饥饿所驱使。虚空吞噬一切生命的欲望完美地体现在科加斯的身上，它复杂的生物构造能够迅速将物质转化为身体的成长，不仅会增加肌肉的质量和密度，还能让外壳变得有如钻石般坚硬。当单纯的体型增长已经不能满足它时，这只虚空生物就会将多余的物质形成锋利的骨刺吐出体外，刺穿猎物，为稍后的盛宴进行准备。'
								},
								{
									heroname: '英勇投弹手 库奇',
									herosname: '英勇投弹手',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Corki.png',
									herostory: '约德尔飞行员库奇最爱两件事物：一是飞行，二是自己英俊的小胡子，排名不分先后。离开班德尔城以后，他在皮尔特沃夫安家，从此爱上了这里奇异壮观的各式机器。他决定投身于飞行装置的开发事业，带领一群老练飞行员组成了一只空中防御力量，得名“尖啸之蛇”。临危不乱的库奇在他第二故乡的空域戒备巡逻，而他还从没见过什么问题是一轮导弹齐射不能解决的。'
								},
								{
									heroname: '诺克萨斯之手 德莱厄斯',
									herosname: '诺克萨斯之手',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Darius.png',
									herostory: '提到诺克萨斯力量的象征，帝国上下没有人能比德莱厄斯这名久经沙场的指挥官更加适合。他从无名小卒逐渐成长为诺克萨斯之手，劈开了无数敌人的身躯 —— 其中也不乏诺克萨斯自己人。他从不怀疑自己执行的公义，也从不会在举起战斧后迟疑。作为崔法利军团的领导者，德莱厄斯的任何对手都不用指望他手下留情。'
								},
								{
									heroname: '皎月女神 黛安娜',
									herosname: '皎月女神',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Diana.png',
									herostory: '戴安娜永远都佩着她的月刃 ，她是皎月教派的武士，不过她的教派在巨神峰周围地区几乎已经销声匿迹。黛安娜身穿闪烁着冬夜寒雪之光的铠甲，是皎月神力的凡间化身。她在巨神峰之巅与星灵精魄相融，不再是单纯的凡人。现在的她努力抗争着，寻找着神的启示，以及自己的力量和存在对于这个世界的意义。'
								},
								{
									heroname: '荣耀行刑官 德莱文',
									herosname: '荣耀行刑官',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Draven.png',
									herostory: '在诺克萨斯，有一种战士被称为“清算人”。他们在竞技场里互相厮杀，以鲜血作为赌注进行力量的考验，不过没有任何人能像德莱文那样受人追捧。曾经参过军的他，发现竞技场的观众们尤为喜爱他的耀武扬威和刻意表演，和他使用飞斧的无匹技艺。这种狂傲的完美带来的赞叹令他上瘾，因此德莱文发誓要不惜代价打败任何对手，以此确保自己的名字在帝国之中永世传唱。'
								},
								{
									heroname: '祖安狂人 蒙多医生',
									herosname: '祖安狂人',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/DrMundo.png',
									herostory: '精神与认知彻底崩坏、杀人的欲望永不满足、浑身皮肤紫得发黑，这就是蒙多医生，这就是祖安人在漆黑的夜里不敢出门的原因。这个头脑简单的恐怖怪人似乎唯一关心的东西就是痛苦，不仅是施加痛苦，而且也是感受痛苦。他抡着一把巨大的切肉刀，举重若轻。他曾经捕捉并折磨过数十名祖安居民，因此声名狼藉。他将自己的行为称为“手术”，但却没有任何真正的目的。他残酷无情。他神出鬼没。他想去哪儿就去哪儿。另外，准确地说，他并不是一名医生。'
								},
								{
									heroname: '时间刺客 艾克',
									herosname: '时间刺客',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ekko.png',
									herostory: '艾克是一名来自祖安不良街区的奇才。他可以操纵时间，从而让任何处境都变得对自己有利。通过使用他自己的发明——Z型驱动——他可以探索其他平行现实的分支并创造最完美的条件。尽管他酷爱这种自由，但只要他的朋友们遇到了威胁，他就会不顾一切地去保护他们。在旁观者眼里，艾克总是能初次尝试就完成不可能之举，屡试不爽。'
								},
								{
									heroname: '蜘蛛女皇 伊莉丝',
									herosname: '蜘蛛女皇',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Elise.png',
									herostory: '诺克萨斯帝国最古老城市的地下深处，有一处不见天日的禁地，这是夺命的掠食者伊莉丝的宫殿。当她还是一个凡人的时候，她是曾经显赫一时的家族女主人，但是自从被一个卑鄙的半神咬伤之后，她就化身成了美丽的不死异类，一个形似蜘蛛的生物，用蛛网诱捕毫无防备的猎物。为了永葆青春，伊莉丝现在喜欢捕食那些无戒心、无信仰的人，而这世上也鲜少有人能够抗拒她的诱惑。'
								},
								{
									heroname: '痛苦之拥 伊芙琳',
									herosname: '痛苦之拥',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Evelynn.png',
									herostory: '在符文之地的黑暗裂缝中，恶魔伊芙琳一直在搜寻着下一个目标。她披着人类女性的撩人外表，勾引她的猎物。只要有人被她魅惑，伊芙琳就会显露出真正的形态。她会施加难以言喻的折磨，从而让自己在猎物的疼痛中获得满足。对于这个恶魔来说，这样的欢愉只是无心无邪的滥情。但是对于符文之地上的其他人，听到的则是血肉模糊的传说，提醒着人们肉欲的危险和纵欲的代价。'
								},
								{
									heroname: '探险家 伊泽瑞尔',
									herosname: '探险家',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ezreal.png',
									herostory: '神采奕奕的冒险家伊泽瑞尔拥有自己不知道的魔法天赋，他搜刮失落已久的古墓，触碰古老的诅咒，还举重若轻地挑战常人不可能完成的极限。他的勇气和壮举无边无际，总是喜欢随机应变地解决任何情况，一定程度上依赖他的小聪明，但更主要是依赖他神秘的恕瑞玛护手，在他的操控下释放出破坏性的奥术爆弹。有一件事可以肯定——只要伊泽瑞尔出现，那么麻烦一定接踵而至。或是还没走远。范围大概是随时随地。'
								},
								{
									heroname: '末日使者 费德提克',
									herosname: '末日使者',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiddlesticks.png',
									herostory: '费德提克是一个骇人的活体稻草人，一个徘徊在黑暗中的憎恶之物，他挥舞着一把镰刀并捕食着粗心的生物们。在群鸦们的凶蛮啄杀的协助下，费德提克会先品味猎物们的恐惧，然后再于飓风般的羽毛与溅血的利喙之中取走猎物们的性命。'
								},
								{
									heroname: '无双剑姬 菲奥娜',
									herosname: '无双剑姬',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiora.png',
									herostory: '菲奥娜是全瓦洛兰最可怕的决斗家。她以雷厉风行、狡黠聪慧闻名于世，同样著名的还有她舞弄自己蓝钢佩剑的矫健。菲奥娜出生在德玛西亚王国的劳伦特家族，她从父亲的手中接管了家业，并在一场丑闻风波中将家族拯救于于灭亡的边缘。虽然劳伦特家威严不再，但菲奥娜却一直在不懈地努力，希望重振家族荣耀，让劳伦特这个名字重回德玛西亚名望贵族之列。'
								},
								{
									heroname: '潮汐海灵 菲兹',
									herosname: '潮汐海灵',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fizz.png',
									herostory: '菲兹是一名水陆两栖的约德尔人，生活在比尔吉沃特周围的群礁之间。他会经常把迷信的船长们抛进海中的什一税捡起来物归原主。不过即使是最粗鲁的水手也知道不要招惹他，因为这里流传着的各种教训，都是因为低估了这个小鬼。经常有人误会他的行为只是海洋精灵的任性举动，而事实上他可以号令来自深渊的巨型猛兽，而且不管是盟友还是敌人他都喜欢捉弄。'
								},
								{
									heroname: '正义巨像 加里奥',
									herosname: '正义巨像',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Galio.png',
									herostory: '光彩熠熠的德玛西亚城外，石巨像加里奥始终如一地守望着。他被创造出来是为了抵挡来犯的法师，但却经常要一动不动地矗立数十年，只有当强大的魔法力量出现时，他才会激活。而只要加里奥活动起来，他便会充分利用每一刻，品味荡气回肠的战斗和来之不易的守护人民的荣耀。可惜，他的胜利永远都喜忧参半，因为消灭魔法的同时，也消灭了他活跃力量的源泉。每一次胜利都会使他再次进入不知世事的休眠。'
								},
								{
									heroname: '海洋之灾 普朗克',
									herosname: '海洋之灾',
									herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Gangplank.png',
									herostory: '诡计多端、心狠手辣的普朗克是被废黜的强盗之王，他令人恐惧的名号广达远至。他一度是港口城市比尔吉沃特的统治者。虽然现在他的威权已经不再，但人们相信这只会让他变得更加可怖。普朗克若是知道有人要从他手中抢走比尔吉沃特，必然会大肆血洗这座城市。而如今有了火枪、弯刀，还有一桶桶的火药，他决心要夺回自己失去的东西。'
								},
								{
										heroname: '暗裔剑魔 亚托克斯',
										herosname: '暗裔剑魔',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Aatrox.png',
										herostory: '亚托克斯和他的同胞们曾是恕瑞玛对抗虚空之地时满载荣耀的守护者一族，最终却变成了符文之地的一个更大的威胁，并且仅被击败于被诡诈的致命巫术。但在被囚禁了数个世纪后，亚托克斯率先找到重获自由之法，那就是对那些蠢得妄图尝试挥舞那把含有他灵魂精华的神奇武器的愚妄之徒进行腐蚀和转化。现在，凭借偷来的血肉躯体，他以一种近似他之前形态的凶残外表行走于符文之地中，寻求着一次毁天灭地且久未兑现的复仇。'
									},
									{
										heroname: '九尾妖狐 阿狸',
										herosname: '九尾妖狐',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ahri.png',
										herostory: '符文之地的潜在力量和她有着与生俱来的共鸣。原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每一个被吞噬的灵魂，都伴随着他们生前的记忆。'
									},
									{
										heroname: '离群之刺 阿卡丽',
										herosname: '离群之刺',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Akali.png',
										herostory: '无论是均衡教派还是暗影之拳的称号，都已被阿卡丽抛弃，如今的阿卡丽独来独往，随时可以成为她的人民所需要的夺命武器。虽然她牢牢铭记着她从宗师慎身上学来的一切，但她效忠的保护艾欧尼亚并铲除敌人，每次一条命。或许阿卡丽的出击悄然无声，但她传达的信息将响亮无比：不听命于任何人的刺客最为可怕。'
									},
									{
										heroname: '牛头酋长 阿利斯塔',
										herosname: '牛头酋长',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Alistar.png',
										herostory: '阿利斯塔一直都是威名远扬的巨力勇士，他要为自己被屠杀的氏族向诺克萨斯帝国复仇。虽然他曾被奴役，并被迫成为斗兽场中的角斗士，但他坚不可摧的意志使他免于沦为真正的野兽。现在，挣脱了奴役枷锁的他继续以受苦之人和弱者的名义战斗。他的愤怒，还有犄角、蹄子和拳头，都是他的武器。'
									},
									{
										heroname: '殇之木乃伊 阿木木',
										herosname: '殇之木乃伊',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Amumu.png',
										herostory: '在远古的恕瑞玛，有一个孤独而又忧郁的灵魂，阿木木。他在世间游荡，只为找到一个朋友。他遭受了一种远古的巫术诅咒，注定忍受永世的孤单，因为被他触碰就意味着死亡，他的喜爱便是毁灭。所有自称见过阿木木的人都说他是一具活生生的死尸，身材矮小，通体捆绑着青灰色的绷带。世人围绕阿木木编造了许多神话故事、民间传说和史诗传奇。这些故事世代传颂，以至于再也没人能分得清哪些是真相，哪些是幻想。'
									},
									{
										heroname: '冰晶凤凰 艾尼维亚',
										herosname: '冰晶凤凰',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Anivia.png',
										herostory: '艾尼维亚是一个充满仁慈的飞禽形态灵体，曾经历过无数次诞生、死亡与重生的轮回，始终眷顾着弗雷尔卓德。她是生于凛冽冰风中的半神，可以操控冰雪的元素之力，阻挡那些胆敢侵犯她家园的人。艾尼维亚指引并保护着北方贫瘠土地上的人类部落，而这些人类也将她奉为希望的象征和重大变革的预兆。她的每一次奋战都不遗余力，因为她知道，自己的记忆将会超越牺牲，长久地留存，而她也将在崭新的明天中重生。'
									},
									{
										heroname: '黑暗之女 安妮',
										herosname: '黑暗之女',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Annie.png',
										herostory: '既拥有危险夺命的能力，又拥有小大人儿的可爱模样，安妮是一名掌握着深不可测的占火魔法的幼女魔法师。安妮生活在诺克萨斯北边的山脚下，即使是在这种地方，她也仍然是魔法师中的异类。她与火焰的紧密关系与生俱来，最初是伴随着喜怒无常的情绪冲动出现的，不过后来她学会了如何掌握这些“好玩的小把戏”。其中她最喜欢的就是召唤她亲爱的泰迪熊提伯斯——一头狂野的守护兽。安妮已经迷失在了永恒的天真里。她在黑暗的森林中游荡，始终寻觅着能陪自己玩耍的人。'
									},
									{
										heroname: '寒冰射手 艾希',
										herosname: '寒冰射手',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ashe.png',
										herostory: '作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。'
									},
									{
										heroname: '铸星龙王 奥瑞利安·索尔',
										herosname: '铸星龙王',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/AurelionSol.png',
										herostory: '奥瑞利安•索尔曾创造了奇迹般的群星，为无垠的荒芜太空布下他宏伟的恩典。而如今，他的威能却遭人设计，被迫服务于某个潜藏在深空中的帝国。为了重返铸星大道，奥瑞利安•索尔誓要夺回属于自己的自由。哪怕召星降怒，倾覆众生。'
									},
									{
										heroname: '沙漠皇帝 阿兹尔',
										herosname: '沙漠皇帝',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Azir.png',
										herostory: '阿兹尔是上古时期恕瑞玛的一位凡人皇帝，一位站在不朽神话巅峰的自豪之人。但他的狂妄引来了旁人的背叛，在最伟大胜利降临的那一刻将他杀害。而现在，数千年后，他重获新生并成为了力量无边的飞升者。阿兹尔的城市已经从黄沙之下崛起，他要让恕瑞玛恢复曾经的荣光。'
									},
									{
										heroname: '星界游神 巴德',
										herosname: '星界游神',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Bard.png',
										herostory: '巴德是星界彼端的旅者，是奇缘巧遇的使者。他艰难地维护着宇宙的平衡，从而让生命能够抵御无情的混乱。符文之地有许多人传唱关于他的歌谣，内容里流露出对他超凡本质的猜想，而所有这些歌谣都会提及同一件事：这位星界游荡者总是会被强大的魔法圣物所吸引。一群木灵欢唱乐团始终围绕在巴德身边充当小帮手，他的行为绝不会被误会带有任何恶意，因为他永远都是在为更大的良善尽职尽责，只不过他的方式不为常人理解。'
									},
									{
										heroname: '蒸汽机器人 布里茨',
										herosname: '蒸汽机器人',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Blitzcrank.png',
										herostory: '布里茨是来自祖安的一个巨大的、几乎坚不可摧的机械体，最初被制造出来的目的是为了处理有毒肥料。然而他觉得自己存在的意义太过狭隘，于是就改装了自己的形态，以便更好地效力于地沟区的孱弱人群。布里茨无私地使用自己的力量和钢铁之躯保护其他人，伸出长长的机械援手，或者发出能量脉冲，制服任何带来麻烦的人。'
									},
									{
										heroname: '复仇焰魂 布兰德',
										herosname: '复仇焰魂',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Brand.png',
										herostory: '基根·诺和曾经是一名普通弗雷尔卓德部族居民，现在则变成了另一种生物，布兰德。他的身世警醒着后人，被更强大的力量所诱惑会带来什么后果。基根为了追寻传说中的世界符文，背叛了自己的同伴并将符文据为己有，就在那一瞬间，这个人彻底消失了。他的灵魂被彻底燃尽，他的身躯成为了活体烈焰的容器，如今，布兰德游荡在瓦洛兰，寻觅着其他的符文。他曾遭受的苦难，凡人活上十几辈子也未必能够经历，而他发誓此仇必报。'
									},
									{
										heroname: '弗雷尔卓德之心 布隆',
										herosname: '弗雷尔之心',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Braum.png',
										herostory: '拥有大块肌肉和更大颗心脏的布隆，是弗雷尔卓德的一个受人爱戴的英雄。弗雷尔卓德北部的任何一家蜜酒坊里都有人会致敬他传奇般的强壮，据说他曾在一夜之间扫平一整片橡树森林，还曾用拳头把一整座山打成碎石子。一扇附有魔法的秘库大门被他拿在手中当做盾牌，布隆在北方的冻土上漫游，小胡子勾勒出的微笑和他的肌肉块头一样大， 真诚友善地帮助所有危难之中的人。'
									},
									{
										heroname: '皮城女警 凯特琳',
										herosname: '皮城女警',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Caitlyn.png',
										herostory: '凯特琳被誉为皮尔特沃夫最顶尖的和平卫士，同时也是让这座城市真正摆脱地下隐秘犯罪的最有希望的人选。她经常和蔚联手执行任务，以冷静和沉着弥补自己搭档的鲁莽天性。虽然她的海克斯科技步枪独一无二，但凯特琳最强大的武器其实是她过人的智谋，总是能设下天罗地网，迎接任何傻到敢在进步之城作案的不法之徒。'
									},
									{
										heroname: '青钢影 卡蜜尔',
										herosname: '青钢影',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Camille.png',
										herostory: '卡蜜尔是菲罗斯家族的首席密探，游走于法律已然失效的边缘地带，小心地维护着皮尔特沃夫这台机器和其下的祖安，保证一切都能顺畅地运转。灵活而精准的她认为，任何浮皮潦草的技术都是必须被禁绝的丑陋行径。她的心智也如同身下的刀刃一般锐利。为了追求极致，她对自己进行了大幅度的海克斯人体增强手术。这也让很多人不禁怀疑，她根本就是一台纯粹的机器，而不是一个女人。'
									},
									{
										heroname: '魔蛇之拥 卡西奥佩娅',
										herosname: '魔蛇之拥',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Cassiopeia.png',
										herostory: '卡西奥佩娅是个夺命的生物，决心要操纵其他人屈服于自己的阴险意志之下。身为诺克萨斯贵族杜·克卡奥家族的最年轻、最漂亮的女儿，她冒险深入恕瑞玛古代墓穴找寻远古的力量。在墓穴中，她被恐怖的墓穴守卫咬中，在毒液的作用下变成了毒蛇外形的掠食者。狡猾而敏捷的卡西奥佩娅如今在夜幕的掩护下蜿蜒滑行，用阴森的凝视让敌人石化。'
									},
									{
										heroname: '虚空恐惧 科加斯',
										herosname: '虚空恐惧',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Chogath.png',
										herostory: '自从科加斯出现在符文之地烈日照射之下的那一刻起，它就被永不餍足的饥饿所驱使。虚空吞噬一切生命的欲望完美地体现在科加斯的身上，它复杂的生物构造能够迅速将物质转化为身体的成长，不仅会增加肌肉的质量和密度，还能让外壳变得有如钻石般坚硬。当单纯的体型增长已经不能满足它时，这只虚空生物就会将多余的物质形成锋利的骨刺吐出体外，刺穿猎物，为稍后的盛宴进行准备。'
									},
									{
										heroname: '英勇投弹手 库奇',
										herosname: '英勇投弹手',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Corki.png',
										herostory: '约德尔飞行员库奇最爱两件事物：一是飞行，二是自己英俊的小胡子，排名不分先后。离开班德尔城以后，他在皮尔特沃夫安家，从此爱上了这里奇异壮观的各式机器。他决定投身于飞行装置的开发事业，带领一群老练飞行员组成了一只空中防御力量，得名“尖啸之蛇”。临危不乱的库奇在他第二故乡的空域戒备巡逻，而他还从没见过什么问题是一轮导弹齐射不能解决的。'
									},
									{
										heroname: '诺克萨斯之手 德莱厄斯',
										herosname: '诺克萨斯之手',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Darius.png',
										herostory: '提到诺克萨斯力量的象征，帝国上下没有人能比德莱厄斯这名久经沙场的指挥官更加适合。他从无名小卒逐渐成长为诺克萨斯之手，劈开了无数敌人的身躯 —— 其中也不乏诺克萨斯自己人。他从不怀疑自己执行的公义，也从不会在举起战斧后迟疑。作为崔法利军团的领导者，德莱厄斯的任何对手都不用指望他手下留情。'
									},
									{
										heroname: '皎月女神 黛安娜',
										herosname: '皎月女神',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Diana.png',
										herostory: '戴安娜永远都佩着她的月刃 ，她是皎月教派的武士，不过她的教派在巨神峰周围地区几乎已经销声匿迹。黛安娜身穿闪烁着冬夜寒雪之光的铠甲，是皎月神力的凡间化身。她在巨神峰之巅与星灵精魄相融，不再是单纯的凡人。现在的她努力抗争着，寻找着神的启示，以及自己的力量和存在对于这个世界的意义。'
									},
									{
										heroname: '荣耀行刑官 德莱文',
										herosname: '荣耀行刑官',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Draven.png',
										herostory: '在诺克萨斯，有一种战士被称为“清算人”。他们在竞技场里互相厮杀，以鲜血作为赌注进行力量的考验，不过没有任何人能像德莱文那样受人追捧。曾经参过军的他，发现竞技场的观众们尤为喜爱他的耀武扬威和刻意表演，和他使用飞斧的无匹技艺。这种狂傲的完美带来的赞叹令他上瘾，因此德莱文发誓要不惜代价打败任何对手，以此确保自己的名字在帝国之中永世传唱。'
									},
									{
										heroname: '祖安狂人 蒙多医生',
										herosname: '祖安狂人',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/DrMundo.png',
										herostory: '精神与认知彻底崩坏、杀人的欲望永不满足、浑身皮肤紫得发黑，这就是蒙多医生，这就是祖安人在漆黑的夜里不敢出门的原因。这个头脑简单的恐怖怪人似乎唯一关心的东西就是痛苦，不仅是施加痛苦，而且也是感受痛苦。他抡着一把巨大的切肉刀，举重若轻。他曾经捕捉并折磨过数十名祖安居民，因此声名狼藉。他将自己的行为称为“手术”，但却没有任何真正的目的。他残酷无情。他神出鬼没。他想去哪儿就去哪儿。另外，准确地说，他并不是一名医生。'
									},
									{
										heroname: '时间刺客 艾克',
										herosname: '时间刺客',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ekko.png',
										herostory: '艾克是一名来自祖安不良街区的奇才。他可以操纵时间，从而让任何处境都变得对自己有利。通过使用他自己的发明——Z型驱动——他可以探索其他平行现实的分支并创造最完美的条件。尽管他酷爱这种自由，但只要他的朋友们遇到了威胁，他就会不顾一切地去保护他们。在旁观者眼里，艾克总是能初次尝试就完成不可能之举，屡试不爽。'
									},
									{
										heroname: '蜘蛛女皇 伊莉丝',
										herosname: '蜘蛛女皇',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Elise.png',
										herostory: '诺克萨斯帝国最古老城市的地下深处，有一处不见天日的禁地，这是夺命的掠食者伊莉丝的宫殿。当她还是一个凡人的时候，她是曾经显赫一时的家族女主人，但是自从被一个卑鄙的半神咬伤之后，她就化身成了美丽的不死异类，一个形似蜘蛛的生物，用蛛网诱捕毫无防备的猎物。为了永葆青春，伊莉丝现在喜欢捕食那些无戒心、无信仰的人，而这世上也鲜少有人能够抗拒她的诱惑。'
									},
									{
										heroname: '痛苦之拥 伊芙琳',
										herosname: '痛苦之拥',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Evelynn.png',
										herostory: '在符文之地的黑暗裂缝中，恶魔伊芙琳一直在搜寻着下一个目标。她披着人类女性的撩人外表，勾引她的猎物。只要有人被她魅惑，伊芙琳就会显露出真正的形态。她会施加难以言喻的折磨，从而让自己在猎物的疼痛中获得满足。对于这个恶魔来说，这样的欢愉只是无心无邪的滥情。但是对于符文之地上的其他人，听到的则是血肉模糊的传说，提醒着人们肉欲的危险和纵欲的代价。'
									},
									{
										heroname: '探险家 伊泽瑞尔',
										herosname: '探险家',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Ezreal.png',
										herostory: '神采奕奕的冒险家伊泽瑞尔拥有自己不知道的魔法天赋，他搜刮失落已久的古墓，触碰古老的诅咒，还举重若轻地挑战常人不可能完成的极限。他的勇气和壮举无边无际，总是喜欢随机应变地解决任何情况，一定程度上依赖他的小聪明，但更主要是依赖他神秘的恕瑞玛护手，在他的操控下释放出破坏性的奥术爆弹。有一件事可以肯定——只要伊泽瑞尔出现，那么麻烦一定接踵而至。或是还没走远。范围大概是随时随地。'
									},
									{
										heroname: '末日使者 费德提克',
										herosname: '末日使者',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiddlesticks.png',
										herostory: '费德提克是一个骇人的活体稻草人，一个徘徊在黑暗中的憎恶之物，他挥舞着一把镰刀并捕食着粗心的生物们。在群鸦们的凶蛮啄杀的协助下，费德提克会先品味猎物们的恐惧，然后再于飓风般的羽毛与溅血的利喙之中取走猎物们的性命。'
									},
									{
										heroname: '无双剑姬 菲奥娜',
										herosname: '无双剑姬',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fiora.png',
										herostory: '菲奥娜是全瓦洛兰最可怕的决斗家。她以雷厉风行、狡黠聪慧闻名于世，同样著名的还有她舞弄自己蓝钢佩剑的矫健。菲奥娜出生在德玛西亚王国的劳伦特家族，她从父亲的手中接管了家业，并在一场丑闻风波中将家族拯救于于灭亡的边缘。虽然劳伦特家威严不再，但菲奥娜却一直在不懈地努力，希望重振家族荣耀，让劳伦特这个名字重回德玛西亚名望贵族之列。'
									},
									{
										heroname: '潮汐海灵 菲兹',
										herosname: '潮汐海灵',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Fizz.png',
										herostory: '菲兹是一名水陆两栖的约德尔人，生活在比尔吉沃特周围的群礁之间。他会经常把迷信的船长们抛进海中的什一税捡起来物归原主。不过即使是最粗鲁的水手也知道不要招惹他，因为这里流传着的各种教训，都是因为低估了这个小鬼。经常有人误会他的行为只是海洋精灵的任性举动，而事实上他可以号令来自深渊的巨型猛兽，而且不管是盟友还是敌人他都喜欢捉弄。'
									},
									{
										heroname: '正义巨像 加里奥',
										herosname: '正义巨像',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Galio.png',
										herostory: '光彩熠熠的德玛西亚城外，石巨像加里奥始终如一地守望着。他被创造出来是为了抵挡来犯的法师，但却经常要一动不动地矗立数十年，只有当强大的魔法力量出现时，他才会激活。而只要加里奥活动起来，他便会充分利用每一刻，品味荡气回肠的战斗和来之不易的守护人民的荣耀。可惜，他的胜利永远都喜忧参半，因为消灭魔法的同时，也消灭了他活跃力量的源泉。每一次胜利都会使他再次进入不知世事的休眠。'
									},
									{
										heroname: '海洋之灾 普朗克',
										herosname: '海洋之灾',
										herosrc: '//ossweb-img.qq.com/images/lol/img/champion/Gangplank.png',
										herostory: '诡计多端、心狠手辣的普朗克是被废黜的强盗之王，他令人恐惧的名号广达远至。他一度是港口城市比尔吉沃特的统治者。虽然现在他的威权已经不再，但人们相信这只会让他变得更加可怖。普朗克若是知道有人要从他手中抢走比尔吉沃特，必然会大肆血洗这座城市。而如今有了火枪、弯刀，还有一桶桶的火药，他决心要夺回自己失去的东西。'
									}
				]
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
			goindex() {
				this.$router.push({
					path: '/'
				});
			},
			gomy_msg() {
				this.$router.push({
					path: '/my_msg'
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
		},
		created() {
			// this.axios.get('http://localhost:3000/newsmsgs/list').then((data) => {
			// 	this.newsdata = data.data.data;
			// 	console.log(data.data)
			//    此时登录成功
						      this.$http.get('http://localhost:3000/admin/hero').then((data) => {
			  this.herodata = data.body.data;
			  console.log(data.body)
							console.log(this.herodata)
			})
			this.power = localStorage.getItem('power')
			let token = localStorage.getItem('token')
			//    console.log(token)
			if (token) {
				this.zxx = true
				this.userimg = 'http://q1.qlogo.cn/g?b=qq&k=WNHAgjibhlEicUgIjictl5Bibw&s=140&t=1441633435'
				this.isLogin = true
				this.username = localStorage.getItem('username')
				this.id = localStorage.getItem('_id')
				console.log('用户获得成功');
				console.log(this.id);
			} else {
				console.log('用户获得登录失败');
			}
		}
	}
</script>

<style>
	.zx {
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

	.gamelistbody {
		width: 100%;

		display: flex;
		flex-flow: column;
		text-align: left;
	}

	.head-userinfo-avatar:hover .zx {
		display: block;
	}

	.header_menu {
		margin-top: -20px;
	}

	.footer {
		margin-top: 20px;
		width: 100%;
		height: 266px;
		background-image: url(../assets/foot.png);
	}

	.header {
		height: 360px;
	}

	.comm-head {
		display: flex;
		align-items: center;
		width: 100%;
		height: 4.875rem;
		background-color: #363636;
		background: linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.05));
		margin-top: -22.5rem;
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
		height: 181px;
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

	.herolist {
		border: 1px #BBBBBB solid;
		margin: 40px 60px;
		padding: 20px 20px;
		width: 90%;
		height: auto;
	}

	.imgtextlist {
		list-style: none;
		display: flex;
		flex-flow: row wrap;
		/* justify-content: space-between; */
	}

	.heroli {
		height: 66px;
		width: 65px;
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
		flex: 0 0 7.6923%;
		transition: All 0.4s ease-in-out;
		    -webkit-transition: All 0.4s ease-in-out;
		    -moz-transition: All 0.4s ease-in-out;
		    -o-transition: All 0.4s ease-in-out;
	}

	.heroli p {
		width: 65px;
		text-align: center;
	}

	.heroli img {
		height: 66px;
		width: 65px;
	}
	.heroli:hover{
		transform: translate(0, -10px);
	        -webkit-transform: translate(0, -10px);
	        -moz-transform: translate(0, -10px);
	        -o-transform: translate(0, -10px);
	        -ms-transform: translate(0, -10px);
	}
</style>

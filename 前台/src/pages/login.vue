<template>
	<div class="bbox">
		<div class="cbox">
		<div class="left">
			
			<Carousel loop dots="none" arrow="none" autoplay='true' autoplay-speed=3000>
				<CarouselItem>
					<img src="//4.url.cn/zc/v3/img/01-1.jpg" width="539" height="662"/>
				</CarouselItem>
				<CarouselItem>
					<img src="//4.url.cn/zc/v3/img/01-2.jpg" width="539" height="662"/>
				</CarouselItem>
				<CarouselItem>
					<img src="//4.url.cn/zc/v3/img/01-3.jpg" width="539" height="662"/>
				</CarouselItem>
				<CarouselItem>
					<img src="//4.url.cn/zc/v3/img/01-4.jpg" width="539" height="662"/>
				</CarouselItem>
			</Carousel>
		</div>
		<div class="right">
			<div class="rightbox">
			<img src="../assets/logo.png" width="132" height="49" style="margin-left: 520px;margin-top: 20px;margin-bottom: 50px;"/>
			<div class="titles">
				<div class="welcome">
					欢迎登陆英雄联盟
				</div>
				
			</div>
			<div>
			<div class="come">
				英雄，去超越
			</div>
			</div>
			<Form ref="formInline" :model="formInline" :rules="ruleInline" style="display: flex; flex-flow: column;">
				<FormItem prop="username">
					<Input size="large" type="text" v-model="formInline.username" placeholder="请输入账号">
					<Icon type="ios-person-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
				<FormItem prop="password">
					<Input size="large" type="password" v-model="formInline.password" placeholder="请输入密码">
					<Icon type="ios-lock-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
				<a style="margin-left: 470px; margin-top: -10px; margin-bottom: 20px;" @click="gochangepwd()">忘记密码</a>
				<FormItem>
					<Button style="width: 100%;font-size: 20px;" type="primary" @click="userLogin()">登入</Button>
				</FormItem>
				<FormItem>
					<Button style="width: 100%;font-size: 20px; margin-top: -20px;" type="error" @click="userregistered()">注册</Button>
				</FormItem>
			</Form>
		</div>
		</div>
		</div>
	</div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
	export default {
		data() {
			return {
				formInline: {
					username: '',
					password: ''
				},
				ruleInline: {
					username: [{
						required: true,
						message: 'Please fill in the user name',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: 'Please fill in the password.',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: 'The password length cannot be less than 6 bits',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			userLogin: function(event) {
				if (this.formInline.username.length == 0 || this.formInline.password.length == 0) {
					alert("用户名或密码不能为空！")
				} else {
					this.axios.post('http://localhost:3000/users/login', {
							username: this.formInline.username,
							password: this.formInline.password
						}).then((data) => {
							// console.log(data.body.status);
							console.log(data);
							console.log(data.data.message);
							if (data.data.status == 1) {
								alert(data.data.message)
							} else {
								let save_token = {
									token: data.data.data.token,
									username: this.username,
								}
								//          console.log(data.body.data.user[0])
								localStorage.setItem('token', data.data.data.token);
								localStorage.setItem('username', data.data.data.user[0].username);
								localStorage.setItem('_id', data.data.data.user[0]._id);
								localStorage.setItem('power', data.data.data.user[0].userPower);
								//          localStorage.setItem('username',this.username);
								this.$router.push({path:'/'});
							}

						})
						.catch(function(error) {
							console.log(error);
						});
				}
			},
			userregistered(){
				this.$router.push({path:'/registered'});
			},
			gochangepwd(){
				this.$router.push({path:'/changepwd'});
			}
		}
	}
</script>

<style>
	.come{
		margin-bottom: 20px;
		float: left;
		font-size: 28px;
		color: #333;
	}
	.welcome{
		margin-bottom: 30px;
		font-size: 44px;
		font-weight: 400;
		color: #000000;
		float: left;
	}
	.cbox {
		display: flex;
	}
	.left {
		width: 39%;
	}
	.right{
		width: 40%;
		margin-left: 160px;
	}
	.rightbox{
		display: flex;
		flex-flow: column;
		justify-content: center;
	}
</style>

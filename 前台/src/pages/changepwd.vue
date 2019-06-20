<template>
	<div class="layout">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark">
					<div class="layout-logo">
						<img src="../assets/logo.png" />
					</div>
					<div class="layout-nav">
						<MenuItem name="1">
						<Icon type="ios-navigate"></Icon>
						问题反馈
						</MenuItem>
						<MenuItem name="2">
						<Icon type="ios-keypad"></Icon>
						手机App
						</MenuItem>
						<MenuItem name="3" @click.native="goshouye()">
						<Icon type="ios-analytics"></Icon>
						返回登陆
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<div style="height: 30px;"></div>
			<Card style="display: flex;justify-content: center;">
				<div style="width: 450px; ">
					<div>
						<Steps :current="current">
							<Step title="填写用户名"></Step>
							<Step title="身份信息验证"></Step>
							<Step title="设置新密码"></Step>
							<Step title="修改密码完成"></Step>
						</Steps>
					</div>
				</div>
			</Card>
			<div style="height: 10px;"></div>
			<Card>
				<div style="min-height: 370px; text-align: center; align-content: center;">
					<div v-if="current==0" style="padding-top: 100px; padding-bottom: 100px;">
						<div style="margin-left: -230px;margin-bottom: 10px;">请输入账号:</div>
						<Input v-model="username" placeholder="请输入用户名" style="width: 300px" />
					</div>
					<div v-if="current==1" style="padding-top: 70px;padding-bottom: 70px;">
						<div style="margin-left: -230px;margin-bottom: 10px;">请输入邮箱:</div>
						<Input v-model="userMail" placeholder="请输入账号绑定的邮箱" style="width: 300px;margin-left: 3px;" />
						<br />
						<div style="margin-left: -215px;margin-bottom: 10px; margin-top: 20px;">请输入手机号:</div>
						<Input v-model="userPhone" placeholder="请输入账号绑定的手机号" style="width: 300px" />
					</div>
					<div v-if="current==2" style="padding-top: 100px; padding-bottom: 100px;">
						<div style="margin-left: -215px;margin-bottom: 10px;">请输入新密码:</div>
						<Input v-model="repassword" placeholder="请输入新密码" style="width: 300px" />
					</div>
					<div v-if="current==3"  style="padding-bottom: 40px;">
						<img src="../assets/changeok.png" />
						<div style="font-size: 20px;padding-top: 10px;">成功找回密码</div>
					</div>
					<Button v-if="current==3" type="success" @click="comeback">返回主页</Button>
					<Button v-if="current==2" type="primary" @click="nextchange()">下一步</Button>
					<Button v-if="current==1" type="primary" @click="last">上一步</Button>
					<Button v-if="current==1" type="primary" @click="nextchange()">下一步</Button>
					
					<Button v-if="current==0" type="primary" @click="next">下一步</Button>
				</div>
			</Card>
			</Content>
			<Footer class="layout-footer-center">2019-2020 &copy; 陈俊杉-英雄联盟</Footer>
		</Layout>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				st:'process',
				current: 0,
				userMail:'',
				userPhone:'',
				username:'',
				repassword:'',
				showRePassword:false,
				showUserInfo:true
			}
		},
		methods: {
			goshouye(){
				this.$router.push({
					path: '/login'
				});
			},
			last(){
				this.current -=1;
			},
			next() {
				if (this.current == 3) {
					this.current = 0;
				} else {
					this.current += 1;
				}
			},
			nextchange(){
				
				this.$http.post('http://localhost:3000/users/findPassword',{username: this.username,userMail:this.userMail,userPhone:this.userPhone,repassword:this.repassword}).then((data) => {
				  if(data.body.status==1){
				    alert(data.body.message)
				  }else{
				    alert(data.body.message)
					this.current += 1;
				  }
				})
			},
			comeback() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}

	.layout-logo {
		width: 100px;
		height: 30px;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 5px;
		left: -40px;
	}

	.layout-nav {
		width: 420px;
		margin: 0 auto;
		margin-right: -120px;
	}

	.layout-footer-center {
		text-align: center;
	}
</style>

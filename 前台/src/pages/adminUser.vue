<template>

	<div>
		<div class="layout">
			<Layout>
				<Header>
					<Menu mode="horizontal" theme="dark" active-name="4">
						<div class="layout-logo"></div>
						<div class="layout-left">
							<MenuItem name="1" @click.native="goshouye()">
							<Icon type="ios-navigate"></Icon>
							返回首页
							</MenuItem>
							<MenuItem name="2" @click.native="gonews()">
							<Icon type="ios-keypad"></Icon>
							新闻管理
							</MenuItem>
							<MenuItem name="3" @click.native="gohero()">
							<Icon type="ios-analytics"></Icon>
							英雄管理
							</MenuItem>
							<MenuItem name="4" @click.native="gouser()">
							<Icon type="ios-paper"></Icon>
							用户管理
							</MenuItem>
						</div>
					</Menu>
				</Header>
				<Content :style="{padding: '0 50px'}">
					<div style="width: 100%;height: 50px;"></div>
					<Card>
						<div style="min-height: 450px;">
						<Table ref="selection" stripe :columns="columns1" :data="data1">
							 <template slot-scope="{ row, index }" slot="usersrc">
							  <img :src="data1[index].usersrc" style="width: 20px; height: 20px;" />
							</template>
						  <template slot-scope="{ row, index }" slot="action">
						    <Button type="error" size="small" @click="remove(index)" v-show="!row.userStop">封禁用户</Button>
						    <Button type="success" size="small" @click="unban(index)" v-show="row.userStop">解除状态</Button>
						    <Button type="success" size="small" @click="updateAdmin(index)">晋升</Button>
						  </template>
						  <template slot-scope="{ row }" slot="userStop">
						    <strong> {{getUserStop(row.userStop) }}</strong>
						  </template>
						  <template slot-scope="{ row }" slot="userAdmin">
						    <strong> {{getUserAdmin(row.userAdmin) }}</strong>
						  </template>
						</Table>
						</div>
					</Card>
				</Content>
				<Footer class="layout-footer-center" >2011-2016 &copy; TalkingData</Footer>
			</Layout>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'update_table_page',
		data() {
			return {
				
				userItems: [],
				currentPage: 1,
				data1: [],
				ifStop: '',
				columns1: [
				  {
				    title: 'id',
				    key: '_id',
				    sortable: true
				  },
					{
						title:'头像',
						width: 100,
						slot: 'usersrc',
						align: 'center'
					},
				  {
				    title: '用户名',
				    key: 'username',
				    sortable: true
				  },
				  // {
				  //   title: '密码',
				  //   key: 'password'
				  // },
				  {
				    title: '邮箱',
				    key: 'userMail'
				  },
				  {
				    title: '手机号',
				    key: 'userPhone'
				  },
				  {
				    title: '权限',
				    key: 'userAdmin',
				    sortable: true,
				    width: 100,
				    slot: 'userAdmin'
				  },
				  {
				    title: '是否停权',
				    key: 'userStop',
				    sortable: true,
				    width: 120,
				    slot: 'userStop'
				  },
				  {
				    title: '操作',
				    slot: 'action',
				    width: 260,
				    align: 'center'
				  }
				],
				}
		},
		//创建时的表格
		created() {
		  this.token = localStorage.getItem('token');
		  this.id = localStorage.getItem('_id');
		  this.username = localStorage.getItem('username');
		  this.$http.post('http://localhost:3000/admin/showUser', {
		    username: this.username,
		    token: this.token,
		    id: this.id
		  }).then((data) => {
		    this.userItems = data.body.data;
		    this.data1 = this.userItems;
		    // for (let i = 0; i < this.userItems.length; i++) {
		    //   this.data1[i] = this.userItems[i];
		    // }
		    return this.data1;
		  });
		},
		
		methods: {
			goshouye(){
				this.$router.push({
					path: '/'
				});
			},
			gonews(){
				this.$router.push({
					path: '/admin'
				});
			},
			gohero(){
				this.$router.push({
					path: '/adminhero'
				});
			},
			gouser(){
					this.$router.push({
						path: '/adminuser'
					});
			},
			 remove(index) {
			  this.$http.post('http://localhost:3000/admin/stopUser', {
			    username: this.username,
			    token: this.token,
			    id: this.id,
			    userId: this.data1[index]._id
			  }).then((data) => {
			    if (data.status == 1) {
			      alert(data.message);
			      // alert(data1.message)
			    } else {
				location.reload();
			     this.$Message.success('停权成功');
			    }
			  });
			},
			updateAdmin(index) {
			  this.$http.post('http://localhost:3000/admin/powerUpdate', {
			    username: this.username,
			    token: this.token,
			    id: this.id,
			    userId: this.data1[index]._id
			  }).then((data) => {
			    if (data.status == 1) {
			      alert(data.message);
			      // alert(data1.message)
			    } else {
			      location.reload();
				  this.$Message.success('停权成功');
			    }
			  });
			},
			unban(index) {
			  this.$http.post('http://localhost:3000/admin/unban', {
			    username: this.username,
			    token: this.token,
			    id: this.id,
			    userId: this.data1[index]._id
			  }).then((data) => {
			    if (data.status == 1) {
			      alert(data.message);
			      // alert(data1.message)
			    } else {
			      location.reload();
			    }
			  });
			},
			getUserStop(userStop) {
			  if (userStop == false) return '正常状态'
			  else return '停权状态'
			},
			getUserAdmin(userStop) {
			  if (userStop == false) return '普通用户'
			  else return '管理员'
			}
			
		},
		mounted() {
			this.newList = this.tableData
		}
	}
</script>

 

<style>
		.layout-left{
		display: flex;
	}
	.handle-box {

		text-align: right;

		margin-bottom: 10px;

	}

	.topBody {

		width: 100%;

		background-color: #ffffff;

		padding-top: 30px;

	}

	.tableText {

		width: 100%;

	}

	.mleft {

		margin-left: 10px;

	}

	.search-btn {

		float: right;

		margin-right: 10px;

	}

	.input-label {

		display: inline-block;

		line-height: 16px;

		margin-right: 15px;

		font-size: 16px;

	}

	.search {

		width: 230px;

	}
</style>


<template>

	<div>
		<div class="layout">
			<Layout>
				<Header>
					<Menu mode="horizontal" theme="dark" active-name="2">
						<div class="layout-logo"></div>
						<div class="layout-left">
							<MenuItem name="1" @click.native="goshouye()">
							<Icon type="ios-navigate"></Icon>
							返回首页
							</MenuItem>
							<MenuItem name="2">
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
							<div class="topBody">
								<Form>

									<Row>
										<FormItem>
											<Button class="search-btn" type="primary" @click="addBus">
												<Icon type="search" />&nbsp;&nbsp;新增
											</Button>
										</FormItem>
										</Col>
									</Row>
								</Form>
							</div>
							<div class="tableText">
								<Table :columns="columns" :data="newList" border />
							</div>
							<Modal :title="modalTitle" v-model="handleModal" :footer-hide="true" :mask-closable="false" @on-visible-change="handleReset('formValidate')">
								<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
									<FormItem label="新闻名称" prop="newsname">
										<Input v-model="formValidate.newsname" placeholder="请输入新闻名称"></Input>
									</FormItem>
									<FormItem label="新闻类型" prop="newstype">
										<Input v-model="formValidate.newstype" placeholder="请输入新闻类型"></Input>
									</FormItem>
									<FormItem label="新闻时间" prop="newstime">
										<Input v-model="formValidate.newstime" placeholder="请输入新闻时间"></Input>
									</FormItem>
									<FormItem label="新闻图片" prop="newssrc">
										<Input v-model="formValidate.newssrc" placeholder="请输入新闻图片"></Input>
									</FormItem>
									<FormItem>
										<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
										<Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
									</FormItem>
								</Form>
							</Modal>
						</div>
					</Card>
				</Content>
				<Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
			</Layout>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'update_table_page',
		data() {
			return {
				newsItems: [],
				handleModal: false,
				token: '',
				id: '',
				username: '',
				modalTitle: '',
				newList: [], //表格显示数据
				companyName: '',
				formValidate: {
					newsname: '',
					newstype: '',
					newstime: '',
					newssrc: '',
					newsId: ''
				},
				ruleValidate: {
					newsname: [{
						required: true,
						message: '新闻名称不能为空',
						trigger: 'blur'
					}],
					newstype: [{
						required: true,
						message: '新闻类型不能为空',
						trigger: 'blur'
					}],
					newstime: [{
						required: true,
						message: '新闻时间不能为空',
						trigger: 'blur'
					}],
					newssrc: [{
						required: true,
						message: '新闻图片不能为空',
						trigger: 'blur'
					}]
				},
				columns: [{
						title: '编号',
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: '新闻ID',
						key: '_id'
					},
					{
						title: '新闻名称',
						key: 'newsname'
					},
					{
						title: '新闻类型',
						key: 'newstype'
					},

					{
						title: '新闻时间',
						key: 'newstime'
					},
					{
						title: '新闻图片',
						key: 'newssrc'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h(
									'Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px'
										},
										on: {
											click: () => {
												this.editBus(params.row, params.index)
											}
										}
									},
									'编辑'
								),
								h(
									'Button', {
										props: {
											type: 'error',
											size: 'small'
										},
										on: {
											click: () => {
												this.remove(params.index)
											}
										}
									},
									'删除'
								)
							])
						}
					}
				],
				tableData: []
			}
		},
		//创建时的表格
		created() {
			this.token = localStorage.getItem('token');
			this.id = localStorage.getItem('_id');
			this.username = localStorage.getItem('username');
			this.$http.get('http://localhost:3000/newsmsg/list').then((data) => {
				this.tableData = data.body.data;
				console.log(data.body)
				console.log(this.tableData)
				this.newList = this.tableData;
			})
		},
		//在判断与select下拉框的值对应后，查询到的新的数据数组用push的方法，添加到newlist里面
		methods: {
			goshouye(){
				this.$router.push({
					path: '/'
				});
			},
			gohero(){
				this.$router.push({
					path: '/adminhero'
				});
			},
			gouser(){
				
			},
			search() {
				var len = this.tableData
				var arr = []
				for (var i in len) {
					if (len[i].name == this.companyName) {
						arr.push(len[i])
					} else if (this.companyName == '') {
						this.newList = this.tableData
						return
					}
				}
				this.newList = arr
			},
			// 增加用户时使用push方法，把用户的信息添加到list数组的最后
			addBus() {
				//添加
				this.handleModal = true
				this.modalTitle = '新增'
			},
			editBus(item, index) {
				this.handleModal = true
				this.modalTitle = '修改'
				this.itemIndex = index
				this.formValidate = JSON.parse(JSON.stringify(item))
			},
			handleSubmit(name) {
				var self = this
				self.$refs[name].validate(valid => {
					if (valid) {
						var params = JSON.parse(JSON.stringify(self.formValidate))
						if (self.modalTitle === '新增') {
							// 获取需要渲染到页面中的数据
							this.$http.post('http://localhost:3000/admin/newAdd', {
								token: this.token,
								id: this.id,
								username: this.username,
								newsname: this.formValidate.newsname,
								newstype: this.formValidate.newstype,
								newstime: this.formValidate.newstime,
								newssrc: this.formValidate.newssrc,
							}).then((data) => {
								if (data.body.status == 1) {
									alert(data.body.message);
									this.$Message.error('添加失败');
								} else {
									// this.$router.go(-1);v
									// location.reload();
									this.$Message.success('添加成功');

									self.newList.push(params)
									self.handleModal = false
								}
							})
						} else {

							// 获取需要渲染到页面中的数据
							this.$set(self.newList, self.itemIndex, params)
							console.log("这是newlist:" + self.newList);
							console.log("这是item:" + self.itemIndex);
							console.log("这是params:" + self.params);
							this.$http.post('http://localhost:3000/admin/newUpdate', {
								username: this.username,
								token: this.token,
								id: this.id,
								newsId: self.newList[self.itemIndex]._id,
								newsname: self.newList[self.itemIndex].newsname,
								newssrc: self.newList[self.itemIndex].newssrc,
								newstype: self.newList[self.itemIndex].newstype,
								newstime: self.newList[self.itemIndex].newstime
							}).then((data) => {
								if (data.body.status == 1) {
									alert(data.body.message);
									this.$Message.error('修改失败');
								} else {
									this.$Message.success('修改成功');
									console.log(this.formValidate.newstype)
									self.handleModal = false
								}
							})
						}
					} else {
						if (self.modalTitle === '新增') {
							self.$Message.error('新增失败!')
						} else {
							self.$Message.error('修改失败!')
						}
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields()
			},
			//删除用户时，通过splice(index, 1)，可以删除index位置的数据，页面上的数据自动就会更新
			remove(index) {
				this.$http.post('http://localhost:3000/admin/newDel', {
					id: this.id,
					token: this.token,
					username: this.username,
					newsId: this.newList[index]._id
				}).then((data) => {
					if (data.status == -1) {
						alert(data.message);
					} else {
						this.$Message.success('删除成功');
						this.newList.splice(index, 1)
					}
				})
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

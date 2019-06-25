<template>
	<div>
	<div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="3">
                    <div class="layout-logo"></div>
                    <div class="layout-left">
                        <MenuItem name="1" @click.native="goshouye()">
                            <Icon type="ios-navigate"></Icon>
                            返回首页
                        </MenuItem>
                        <MenuItem name="2" @click.native="gosnews()">
                            <Icon type="ios-keypad"></Icon>
                            新闻管理
                        </MenuItem>
                        <MenuItem name="3">
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
				<div style="width: 100%; height: 50px;"></div>
                <Card>
                    <div style="min-height: 200px;">
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
                        		<FormItem label="英雄名称" prop="heroname">
                        			<Input v-model="formValidate.heroname" placeholder="请输入英雄名称"></Input>
                        		</FormItem>
                        		<FormItem label="英雄简称" prop="herosname">
                        			<Input v-model="formValidate.herosname" placeholder="请输入英雄简称"></Input>
                        		</FormItem>
                        		<FormItem label="英雄图片" prop="herosrc">	
                        			<Input v-model="formValidate.herosrc" placeholder="请输入英雄图片"></Input>				
                        		</FormItem>
                        		<FormItem label="英雄历史" prop="herostory">				
                        			<Input v-model="formValidate.herostory" placeholder="请输入英雄历史"></Input>				
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
				handleModal: false,
				token:'',
				id:'',
				username:'',

				modalTitle: '',
				
				newList: [],//表格显示数据

				companyName: '',

				formValidate: {

					hreoname: '',

					hreosname: '',
					hreosrc:'',
					hreostory:'',
					hreoId:''

				},

				ruleValidate: {

					hreoname: [

						{

							required: true,

							message: '英雄名称不能为空',

							trigger: 'blur'

						}

					],

					hreosname: [

						{

							required: true,

							message: '英雄简称不能为空',

							trigger: 'blur'

						}

					],
					hreosrc: [
					
						{
					
							required: true,
					
							message: '英雄图片不能为空',
					
							trigger: 'blur'
					
						}
					
					],
					hreostory: [
					
						{
					
							required: true,
					
							message: '英雄历史不能为空',
					
							trigger: 'blur'
					
						}
					
					]

				},

				columns: [

					{

						title: '编号',

						type: 'index',

						width: 60,

						align: 'center'

					},
					{

						title: '英雄ID',

						key: '_id'

					},
					{

						title: '英雄名称',

						key: 'heroname'

					},

					{

						title: '英雄简称',

						key: 'herosname'

					},
					
					{
					
						title: '英雄图片',
					
						key: 'herosrc'
					
					},
					{
					
						title: '英雄历史',
					
						key: 'herostory'
					
					},
					
					{

						title: '操作',

						key: 'action',

						width: 150,

						align: 'center',

						render: (h, params) => {

							return h('div', [

								h(

									'Button',

									{

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

									'Button',

									{

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
      this.$http.get('http://localhost:3000/admin/hero').then((data) => {
        this.tableData = data.body.data;
        console.log(data.body)
				console.log(this.tableData)
				this.newList = this.tableData;
      })
		},
		//在判断与select下拉框的值对应后，查询到的新的数据数组用push的方法，添加到newlist里面

		methods: {
			goshouye (){
				this.$router.push({
					path: '/'
				});
			},
			gouser (){
					this.$router.push({
						path: '/adminuser'
					});
			},
			gosnews(){
				this.$router.push({
					path: '/admin'
				});
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
							
							this.$http.post('http://localhost:3000/admin/addHero', {
							  token: this.token,
							  id: this.id,
							  username: this.username,
							  heroname: this.formValidate.heroname,
							  herosname: this.formValidate.herosname,
								herosrc: this.formValidate.herosrc,
								herostory: this.formValidate.herostory,
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
							console.log("这是newlist:"+self.newList);
							console.log("这是item:"+self.itemIndex);
							console.log("这是params:"+self.params);
								this.$http.post('http://localhost:3000/admin/heroUpdate', {
							  username: this.username,
							  token: this.token,
							  id: this.id,
								heroId:self.newList[self.itemIndex]._id,
								heroname:self.newList[self.itemIndex].heroname,
							  herosrc: self.newList[self.itemIndex].herosrc,
							  herosname: self.newList[self.itemIndex].herosname,
							  herostory: self.newList[self.itemIndex].herostory
							}).then((data) => {
							  if (data.body.status == 1) {
							    alert(data.body.message);
							    this.$Message.error('修改失败');
							  } else {
							    this.$Message.success('修改成功');
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
				this.$http.post('http://localhost:3000/admin/delHero', {
				  id: this.id,
				  token: this.token,
				  username: this.username,
				  heroId: this.newList[index]._id
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
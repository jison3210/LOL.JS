import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import index from '../pages/index.vue'
import login from '../pages/login.vue'
import registered from '../pages/registered.vue'
import changepwd from '../pages/changepwd.vue'
import my_msg from '../pages/my_msg.vue'
import gamelist from '../pages/gamelist.vue'
import news from '../pages/news.vue'
import admin from '../pages/admin.vue'
import adminhero from '../pages/adminhero.vue'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/index'], resolve),
      meta: {
        title: 'home'
      }
    },
		{
			//登入界面
			path:'/login',
			component:login
		},
		{
			//新闻界面
			path:'/news',
			component:news
		},
		{
			//注册界面
			path:'/registered',
			component:registered
		},
		{
			//修改密码界面
			path:'/changepwd',
			component:changepwd
		},
		{
			//我的信息界面
			path:'/my_msg',
			component:my_msg
		},
		{
			//英雄信息界面
			path:'/gamelist',
			component:gamelist
		},
		{
			//管理员界面
			path:'/admin',
			component:admin
		},
		{
			//管理英雄界面
			path:'/adminhero',
			component:adminhero
		}
  ],
})

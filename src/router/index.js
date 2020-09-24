import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/vuex/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes
});


const exclude = ['login','entry']
router.beforeEach((to, from, next) => {
	// Vue.prototype.$loading.show()	

	// setTimeout(()=>{
	// Vue.prototype.$loading.close()	
	// },500)
	// next()
	// return 


	let bool = !!exclude.find((e)=>{
		return to.path.indexOf(e) !== -1 
	})
	// if (paths.indexOf(to.path)!==-1) {
	//   if (!store.state.user.token) {
	// 	return //next('/login')
	//   }
	// }
	if(bool){
		next()

	}else{
		if(!store.state.user.token){
			return next('/login')
		}
	}

	next()
  })
export default router;

import Vue from 'vue';
import Vant from 'vant';
import FastClick from 'fastclick';
import moment from "moment";

import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.prototype.$moment = moment ;
moment.locale('zh-cn')
import 'lib-flexible';

if ('addEventListener' in document) {
	document.addEventListener(
		'DOMContentLoaded',
		function() {
			FastClick.attach(document.body);
		},
		false
	);
}
Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router
}).$mount('#app');

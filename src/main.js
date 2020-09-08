import Vue from 'vue';
import Vant, { Toast } from 'vant';
import FastClick from 'fastclick';
import moment from 'moment';

import App from './App.vue';
import router from './router';
import loading from '@/components/Loading';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(Toast);
Vue.prototype.$moment = moment;
Vue.prototype.$loading = loading;
moment.locale('zh-cn');
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
	render: (h) => h(App),
	router,
}).$mount('#app');

import Vue from 'vue';

import Vant from 'vant';
import moment from 'moment';
import FastClick from 'fastclick';
// import Vuex from 'vuex';
import loading from '@/components/Loading';
import request from '@/api'

if ('addEventListener' in document) {
	document.addEventListener(
		'DOMContentLoaded',
		function() {
			FastClick.attach(document.body);
		},
		false
	);
}
// Vue.use(Vuex);
Vue.use(Vant);
Vue.prototype.$moment = moment;
Vue.prototype.$loading = loading;
Vue.prototype.console = console;
Vue.prototype.$request = request;

moment.locale('zh-cn');

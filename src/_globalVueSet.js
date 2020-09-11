import Vue from 'vue';

import Vant from 'vant';
import moment from 'moment';
import FastClick from 'fastclick';
// import Vuex from 'vuex';
import loading from '@/components/Loading';
import http from '@/http'

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
Vue.prototype.$http = http;
moment.locale('zh-cn');

import Vue from 'vue';

import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
import store from './vuex/store';

import './_globalComponent.js';
import './_globalVueSet.js';

import 'lib-flexible';

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
	router,
	store,
}).$mount('#app');

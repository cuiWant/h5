import Vue from 'vue';

import Vant from 'vant';
import moment from 'moment';
// import Vuex from 'vuex';
import loading from '@/components/Loading';
import request from '@/api'
import http from '@/http'

// Vue.use(Vuex);
Vue.use(Vant);
Vue.prototype.$moment = moment;
Vue.prototype.$loading = loading;
Vue.prototype.console = console;
Vue.prototype.$request = request;

Vue.prototype.$http = http;
moment.locale('zh-cn');

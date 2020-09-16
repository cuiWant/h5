/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
// import router from '@/router';
// import {
//   Message
// } from 'element-ui';

/**
 * 提示函数tip
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {
//   Message({
//     showClose: true,
//     message: msg,
//     type: 'error'
//   });
// };
/**
 * 跳转登录页 toLogin
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     path: './',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// };
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} other 请求失败提示信息
 */
const errorHandle = () => {
  // switch (status) {
  //     case 400:
  //         tip('请求参数输入有误');
  //         break;
  //     case 401:
  //         tip('未授权');
  //         break;
  //     case 403:
  //         tip('登录过期，请重新登录');
  //         localStorage.removeItem('token');
  //         store.commit('loginSuccess', null);
  //         setTimeout(() => {
  //             toLogin();
  //         }, 1000);
  //         break;
  //     case 404:
  //         toLogin();
  //         break;
  //     case 409:
  //         tip('业务逻辑异常');
  //         break;
  //     case 500:
  //         tip('服务器内部错误');
  //         break;
  //     case 503:
  //         tip('服务器正在维护或过载');
  //         break;
  //     case 504:
  //         tip('充当网关或代理的服务器，未及时从远端服务器获取请求');
  //         break;
  //     default:
  //         tip('未知错误');
  //         break;
  // };
  // router.replace({
  //     path: '/serverError',
  //     query: {
  //         redirect: router.currentRoute.fullPath
  //     }
  // });
};
//创建实例
const instance = axios.create({
  // baseURL: baseUrl,
  timeout: 1000 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
    // 'token': store.state.token
  }
});
//请求拦截
instance.interceptors.request.use(
  (config) => {
    // const token = store.state.token;
    // token && (config.headers.token = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
//响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const data = response.data;
      return Promise.resolve(data);
    }
      return Promise.reject(response);

  },
  (error) => {
    const {
      response
    } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);

  }
);
export default instance;

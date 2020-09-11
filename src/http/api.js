import service from '@/http/axios';
import qs from 'qs';
const baseUrl = '127.0.0.1'
const api = {
  //get请求
  getFun(url, params) {
    return service.get(baseUrl + url, params);
  },
  //post请求
  postFun(url, params) {
    return service.post(baseUrl + url, params);
  },
  // 序列化请求
  qsPostFun(url, params) {
    return service.post(baseUrl + url + '?' + qs.stringify(params));
  }
};
export default api;
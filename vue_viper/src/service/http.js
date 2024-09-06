import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8811/api/v1'
// axios.defaults.baseURL='http://192.168.31.171:8888/api/private/v1/';

// axios请求拦截器
axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token // 请求头加上token
    }
    return config
}, error => {
  return Promise.reject(error)
});
axios.interceptors.response.use(response => {
  return response ? response.data : {}
}, error => {
  console.log(error)
  return Promise.resolve(error.response)
});
Vue.prototype.$axios = axios

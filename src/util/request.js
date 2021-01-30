import axios from 'axios';

const request =   axios.create({
    baseURL: process.env.VUE_APP_ORIGIN_URL,
    timeout: 3000,
  });

// 请求拦截器
request.interceptors.request.use(config => {
        return config
        // 请求拦截
    }, error => {
        // 出现异常,抛出错误对象
        return Promise.reject(error);
    })
    // 响应拦截器
    request.interceptors.response.use(response =>{
        // response.data
        return response
    }, error => {
        return Promise.reject(error);
    })
    
    //  http://localhost:8888/dev-api/db.json 404
    // request.get('/db.json').then(response => {
    //     console.log(response.data)
    // })

export default request;
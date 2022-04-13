import axios from 'axios'
import {ElMessage} from "element-plus";
import router from "@/router";

const request = axios.create({
    // 注意！！ 这里是全局统一加上了 '/mrs' 前缀，也就是说所有接口都会加上'/mrs'前缀在，页面里面写接口的时候就不要加 '/mrs'了，否则会出现2个'/mrs'，类似 '/mrs/mrs/user'这样的报错，切记！！！
    baseURL: '/mrs',
    timeout: 5000
})

const whiteUrls = ['/user/login', '/user/register', '/movie', '/movie/info']

/**
 * request 拦截器
 * 可以自请求发送前对请求做一些处理
 * 比如统一加token，对请求参数统一加密
 */
request.interceptors.request.use(config => {
    // 设置请求头
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // 是否需要token
    const isNeedToken = (config.headers || {}).isNeedToken === false
    let token = window.localStorage.getItem('token')

    if (!isNeedToken) {
        if (!token) {
            // router.push("/login")
        } else {
            config.headers['token'] = token
        }
    }
    return config
}, error => {
    return Promise.reject(error)
});

/**
 * response 拦截器
 * 可以在接口响应后统一处理结果
 */
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // // 验证token
        // if (res.code === 401) {
        //     ElMessage({
        //         type: "error",
        //         message: "token过期，请重新登录",
        //         showClose: true
        //     })
        // }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request


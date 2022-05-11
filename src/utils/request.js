import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8888',
    // baseURL: 'http://121.43.101.121:8888',
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


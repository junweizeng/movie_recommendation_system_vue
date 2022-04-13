import request from "@/utils/request";

const userRequest = {
    /**
     * 用户登录
     * @param loginForm
     * @returns {*}
     */
    login: (loginForm) => {
        return request({
            url: '/user/login',
            method: 'post',
            headers: {
                isNeedToken: false
            },
            data: loginForm
        })
    },
    /**
     * 用户注册
     * @param registerForm
     * @returns {*}
     */
    register: (registerForm) => {
        return request({
            url: '/user/register',
            method: 'post',
            headers: {
                isNeedToken: false
            },
            data: registerForm
        })
    },
    /**
     * 用户注销登录
     * @returns {*}
     */
    logout: () => {
        return request({
            url: '/user/logout',
            method: 'post',
            headers: {
                isNeedToken: true
            },
        })
    },
    /**
     * 判断token是否过期
     * @returns {*}
     */
    judge: () => {
        return request({
            url: '/user/judge',
            method: 'post',
            headers: {
                isNeedToken: true
            },
        })
    },
    /**
     * 获取用户信息
     * @param userId 用户id
     * @returns {*}
     */
    getUserInfo: (userId) => {
        return request({
            url: '/user/info',
            method: 'get',
            headers: {
                isNeedToken: true
            },
            params: {
                'id': userId
            }
        })
    },
    /**
     * 通过用户id获取用户对电影类型和地区的喜好
     * @param userId
     * @returns {*}
     */
    getTypesAndRegions: (userId) => {
        return request({
            url: '/user/types/and/regions',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params: {
                'id': userId
            }
        })
    }
}

export default userRequest

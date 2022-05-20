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
     * 修改密码
     * @param updatePasswordForm
     */
    updatePassword: (updatePasswordForm) => {
        return request({
            url: '/user/update/password',
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            data: updatePasswordForm
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
     * 获取当前登录用户的基本信息
     * @returns {*}
     */
    getUserInfo: () => {
        return request({
            url: '/user/info',
            method: 'get',
            headers: {
                isNeedToken: true
            },
        })
    },
    /**
     * 获取当前登录用户的类型喜好和地区喜好
     * @returns {*}
     */
    getTypesAndRegions: () => {
        return request({
            url: '/user/like',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
        })
    },
    /**
     * 修改当前登录用户的昵称
     * @param nickname 修改后的昵称
     * @returns {*}
     */
    updateUserNickname: (nickname) => {
        return request({
            url: '/user/update/nickname',
            method: 'put',
            headers: {
                isNeedToken: true,
            },
            data: nickname
        })
    },
    /**
     * 修改当前登录用户的性别
     * @param sex 修改后的性别（0表示女，1表示男，2表示保密）
     * @returns {*}
     */
    updateUserSex: (sex) => {
        return request({
            url: '/user/update/sex',
            method: 'put',
            headers: {
                isNeedToken: true,
            },
            data: sex
        })
    },
    /**
     * 更新用户电影类型喜好
     * @param types
     * @returns {*}
     */
    updateUserTypeLike: (types) => {
        return request({
            url: '/user/like/update/types',
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            data: types
        })
    },
    /**
     * 更新用户电影地区喜好
     * @param regions
     * @returns {*}
     */
    updateUserRegionLike: (regions) => {
        return request({
            url: '/user/like/update/regions',
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            data: regions
        })
    },
    /**
     * 获取用户的邮箱
     * @returns {*}
     */
    getUserMail: () => {
        return request({
            url: '/user/get/mail',
            method: 'get',
            headers: {
                isNeedToken: true,
            }
        })
    }
}

export default userRequest

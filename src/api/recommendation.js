import request from "@/utils/request";

const recommendationRequest = {
    /**
     * 获取当前登录用户的系统推荐电影列表
     * @returns {*}
     */
    getRecommendedMoviesByUserId: () => {
        return request({
            url: '/recommendation',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
        })
    },
}

export default recommendationRequest
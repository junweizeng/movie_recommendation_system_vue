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
    /**
     * 获取看过的电影和推荐电影之间的联系，用于绘制Echarts关系图
     * @returns {*}
     */
    getLinksBetweenWatchedMoviesAndRecommendedMovies: () => {
        return request({
            url: '/recommendation/relations',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
        })
    }
}

export default recommendationRequest
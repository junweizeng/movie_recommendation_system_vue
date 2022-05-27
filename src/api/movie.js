import request from "@/utils/request";

const movieRequest = {
    /**
     *
     * @param currentPage 当前页面
     * @param pageSize 每页电影数
     * @param type 电影类型
     * @param region 电影地区
     * @param searchWord 搜索关键字
     * @returns {*}
     */
    getMovies: (currentPage, pageSize, type, region, searchWord) => {
        return request({
            url: '/movie',
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params: {
                'currentPage': currentPage,
                'pageSize': pageSize,
                'type': type,
                'region': region,
                'search': searchWord,
            }
        })
    },
    /**
     * 获取某部电影基本信息
     * @param movieId 电影id
     * @returns {*}
     */
    getMovieInfo: (movieId) => {
        return request({
            url: '/movie/info',
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params: {
                'id': movieId,
            }
        })
    },
    /**
     * 通过电影id获取“喜欢这部电影的人也喜欢...”的推荐电影
     * @param movieId 待查询的电影id
     * @returns {*}
     */
    getRecommendedMovieByMovieId: (movieId) => {
        return request({
            url: '/movie/recommend',
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params: {
                'id': movieId
            }
        })
    },
    /**
     * 获取用户评价过的所有电影的基本信息
     * @returns {*}
     */
    getMoreReviewedMovies: (currentPage, pageSize) => {
        return request({
            url: '/movie/reviewed',
            method: 'get',
            headers: {
                isNeedToken: true
            },
            params: {
                currentPage,
                pageSize
            }
        })
    },
    /**
     * 获取搜索关键字模糊匹配的电影名称列表
     * @param keywords 搜索关键字
     * @returns {*} 模糊匹配查询到的电影名称列表
     */
    getMatchMovieName: (keywords) => {
        return request({
            url: '/movie/match/name',
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params: {
                'keywords': keywords
            }
        })
    },
    /**
     * 获取最多人看过的（评论过的）电影列表
     * @returns {*}
     */
    getMostWatchedMovies: () => {
        return request({
            url: '/movie/most/watched',
            method: 'get',
            headers: {
                isNeedToken: false
            },
        })
    },
    /**
     * 获得评分最高的前n部电影列表
     * @returns {*}
     */
    getHighestRatedMovies: () => {
        return request({
            url: '/movie/highest/score',
            method: 'get',
            headers: {
                isNeedToken: false
            },
        })
    }
}

export default movieRequest

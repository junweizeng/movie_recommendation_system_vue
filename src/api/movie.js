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
                'id': movieId
            }
        })
    },
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
    }
}

export default movieRequest

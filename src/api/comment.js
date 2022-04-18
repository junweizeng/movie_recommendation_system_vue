import request from "@/utils/request";

const commentRequest = {
    /**
     * 评价
     * @param comment
     * @returns {*}
     */
    addComment: (comment) => {
        return request({
            url: '/comment',
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            data: comment
        })
    },
    /**
     * 获取当前登录用户的评价信息
     * @param mid
     * @returns {*}
     */
    getOwnComment: (mid) => {
        return request({
            url: '/comment/own',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params: {
                mid: mid
            }
        })
    },
    /**
     * 通过电影id获取这部电影所有评论
     * @param mid
     * @returns {*}
     */
    getCommentsByMovieId: (mid) => {
        return request({
            url: '/comment/all',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params: {
                mid: mid
            }
        })
    },
    /**
     * 获取当前用户的评价动态
     * @returns {*}
     */
    getCommentMovieMoments: () => {
        return request({
            url: '/comment/movie/moments',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
        })
    }
}

export default commentRequest

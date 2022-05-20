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
    getMoreCommentsByMovieId: (mid, currentPage, pageSize) => {
        return request({
            url: '/comment/all',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params: {
                mid: mid,
                currentPage: currentPage,
                pageSize: pageSize,
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
    },
    /**
     * 删除用户对于某部电影的评论
     * @param mid
     * @returns {*}
     */
    removeOwnComment: (mid) => {
        return request({
            url: '/comment/remove',
            method: 'delete',
            headers: {
                isNeedToken: true,
            },
            data: mid
        })
    },
    /**
     * 获取电影id为mid的电影下，评论词云图绘制所需的数据
     * @param mid 电影id
     * @returns {*}
     */
    getCommentsWordCloudData: (mid) => {
        return request({
            url: '/comment/word/cloud/data',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params: {
                mid: mid
            }
        })
    }
}

export default commentRequest

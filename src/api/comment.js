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
            url: '/comment/more',
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
     * 获取当前用户的评价动态（按页数获取）
     * @param currentPage 当前页数
     * @param pageSize 每页条数
     * @returns {*}
     */
    getCommentMovieMoments: (currentPage, pageSize) => {
        return request({
            url: '/comment/movie/moments',
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params: {
                currentPage,
                pageSize
            }
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
    },
    /**
     * 点赞（或取消点赞）评论
     * @param cid 评论id
     * @param status 点赞状态（1表示点赞，0表示未点赞）
     * @returns {*}
     */
    likeComment: (cid, status) => {
        return request({
            url: '/comment/like',
            method: 'put',
            headers: {
                isNeedToken: true,
            },
            data: {
                cid,
                status
            }
        })
    }
}

export default commentRequest

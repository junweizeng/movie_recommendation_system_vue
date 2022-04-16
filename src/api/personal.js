import request from "@/utils/request";

const personalRequest = {


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
    }
}

export default personalRequest

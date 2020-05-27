import request from '../plugins/request'

// 列表
export function postList(params) {
    return request({
        url: '/post/all',
        method: 'get',
        params
    })
}

// 添加一级评论
export function addPost(data) {
    return request({
        url: '/post',
        method: 'post',
        data
    })
}


// 添加二级评论
export function addPost2(data) {
    return request({
        url: '/post/comment',
        method: 'post',
        data
    })
}


// 评论点赞
export function like(params) {
    return request({
        url: '/post/like',
        method: 'get',
        params
    })
}

// 评论取消点赞
export function unlike(params) {
    return request({
        url: '/post/unlike',
        method: 'get',
        params
    })
}
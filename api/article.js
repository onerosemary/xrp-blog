import request from '../plugins/request'

// 文章分类列表
export function articleType(params) {
    return request({
        url: '/article/type',
        method: 'get',
        params
    })
}

// 文章列表
export function articleList(data) {
    return request({
        url: '/article/list',
        method: 'post',
        data
    })
}

// 文章详情
export function articleDetail(params) {
    return request({
        url: '/article/detail',
        method: 'get',
        params
    })
}

// 关键词搜索文章列表
export function searchList(data) {
    return request({
        url: '/article/searchList',
        method: 'post',
        data
    })
}

// 首页推荐热文 文章列表
export function looksList(params) {
    return request({
        url: '/article/looksList',
        method: 'get',
        params
    })
}
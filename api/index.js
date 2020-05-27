import request from '../plugins/request'

// 首页推荐文章
export function homeList(params) {
    return request({
        url: '/article/homeList',
        method: 'get',
        params
    })
}
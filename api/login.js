import request from '../plugins/request'

// 注册
export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

// 邮箱验证接口
export function emailVerify(data) {
    return request({
        url: '/user/emailVerify',
        method: 'post',
        data
    })
}

// 登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getInfo(params) {
    return request({
        url: '/user/current',
        method: 'get',
        params
    })
}

// 找回密码
export function findPassword(data) {
    return request({
        url: '/user/findPassword',
        method: 'post',
        data
    })
}
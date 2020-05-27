// auth.js
export default function ({ store, error }) {
    // 可通过组件的props接收error信息
    console.log('store.state.token---', store.state.token)
    if (!store.state.token) {
        error({
            message: 'cookie失效或未登录，请登录后操作',
            statusCode: 403
        })
    }
}
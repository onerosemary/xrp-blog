import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const store = () => {
  
  return new Vuex.Store({
    state: {
      token: '',
      userInfo: '',
      dialogFormVisible: false
    },
    mutations: {
      setToken (state, token) {
         state.token = token
         // console.log('token---', token)
      },
      setUserInfo (state, userInfo) {
        state.userInfo = userInfo
        // console.log('userInfo---', userInfo)
     },
     loginPop (state, value) { // 控制登录弹窗
          state.dialogFormVisible = value
     },
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        console.log('req.headers---', req.headers)
        if(req.headers.cookie) {
          const cookieArr = req.headers.cookie.split(';')
          const cookie = cookieArr[0].substring(11)
          const userInfo = JSON.parse(cookieArr[1].replace(/(^\s*)|(\s*$)/g, "").substring(9))
          commit('setToken', cookie)
          commit('setUserInfo', userInfo)
        }
      },
    },
    modules: {
      user,
    },
    getters
  })
}

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import cookieparser from 'cookieparser'
import {getInfo} from '../api/login'
import axios from 'axios'

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
     async nuxtServerInit({ commit }, { req }) {
        // console.log('req.headers---', req.headers.cookie)
        console.log('nuxtServerInit')
        if(req.headers.cookie) {
          const Parse = cookieparser.parse(req.headers.cookie)
          const token = Parse.blog_token
          commit('setToken', token)

          axios.defaults.headers.common['Authorization'] = token
          const res = await axios.get('http://localhost:4000/api/user/current')
          // console.log('res1', res.data)
          commit('setUserInfo', res.data)
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

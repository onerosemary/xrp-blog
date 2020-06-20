import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import cookieparser from 'cookieparser'
import {getInfo} from '../api/login'
import axios from 'axios'
import {productURI, devURI} from '../config'

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
        let target = ''
        if(process.env.NODE_ENV === 'development'){
          target = devURI
        }else {
          target = productURI
        }
        if(req.headers && req.headers.cookie) {
          const Parse = cookieparser.parse(req.headers.cookie)
          const token = Parse.blog_token
          if(token) {
            commit('setToken', token)

            axios.defaults.headers.common['Authorization'] = token
            const res = await axios.get(`${target}/api/user/current`)
            // console.log('res1', res.data)
            commit('setUserInfo', res.data)
          }
          
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

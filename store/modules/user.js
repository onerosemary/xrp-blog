// import { login, getInfo } from '@/api/user'
import { login, getInfo } from '../../api/login'
// const Cookie = process.client ? require('js-cookie') : undefined




const getDefaultState = () => {
  return {
    token: '',
    userId: '', // 当前登录用户id
    name: '',
    companyId: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_COMPANYID: (state, companyId) => {
    state.companyId = companyId
  },
  SETPERMISSIONBTNS: (state, myPermissionBtns) => {
    state.permissionBtns = myPermissionBtns
  }
}

const actions = {
  
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        console.log('登录成功---', response)
        const { token } = response
        // localStorage.setItem('blog_token', token)
        // Cookie.set('Authorization', token)

        getInfo().then(res => {
          console.log('用户信息', res)
        })
        // commit('SET_TOKEN', data)
        // setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log('')
      getInfo().then(response => {
        const { data } = response
        const {id, name, companyId, roleDetail } = data

        commit('SET_NAME', name)
        commit('SET_COMPANYID', companyId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


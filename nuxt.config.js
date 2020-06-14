import {productURI, devURI} from './config'
const _root = process.env.NODE_ENV !== 'production' ? '' : "/dist/"

console.log('process.env.NODE_ENV---', process.env.NODE_ENV)
let target = ''
if(process.env.NODE_ENV === 'development'){
  target = devURI
}else{
  target = productURI
}
console.log('target---', target)
module.exports = {
  mode: 'universal',
  router:{
    base:  _root // 此为根目录，如果有具体目录需求按实际情况写。 生成环境配置，解决图片,js,路由路径问题
  }, 
  /*
  ** Headers of the page
  */
  head: {
    title: '向瑞平个人博客-分享web前端技术的个人博客网站',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '向瑞平个人博客，是记录博主学习和成长的一个自媒体博客，关注于web前端技术学习研究。让你快速学习如何搭建自己个人网站！' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css'},
      { rel:'stylesheet', href: '/css/mobile.css', media:'only screen and (max-width: 480px)'}, // 路径注意需要使用(开发环境)./ , 打包后的路径 http://127.0.0.1:5500/dist/css/mobile.css
      { rel:'stylesheet', href: '/css/pc.css', media:'only screen and (min-width: 480px)'}
    ],
    script: [{
      src: 'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js'
    },{
      src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js'
    },{
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js'
    }]
  },
  // server: {
  //   port: 3000, // 默认3000 也可以改成其它的端口号
  //   host: '0.0.0.0', // 默认localhost
  // },
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/assets/js/iconfont.js', ssr: false } // ssr: Boolean (默认为 true) 如果值为 false，该文件只会在客户端被打包引入
  ],
  // 配置入口文件
  css:[
    '~/assets/css/iconfont.css',
    '~assets/css/normailze.css',
    'element-ui/lib/theme-chalk/index.css'
  ], 

  // 配置style-resources模块儿
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy'  // 添加proxy模块
  ],
  /*
    ** Axios module configuration
    */
  axios: {
    proxy: true  // 开启proxy
  },
  proxy: [  //proxy配置
    ['/api', {
      // target:'http://localhost:4000',  //api请求路径
      target: target,  //api请求路径
      pathRewrite: { '^/api' : '/api' }  //重定向请求路径，防止路由、api路径的冲突
    }]
  ],
  // 如下配置全局使用的变量、mixins和函数文件路径
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['element-ui'],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ],
      comments: true
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}


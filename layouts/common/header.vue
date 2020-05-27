<template>
    <div class="login-Zindex">
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style="padding: 0">
            <div class="container">
                <a class="navbar-brand" href="#"><img src="~/static/img/logo.png" width="120"/></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav navbar-nav-self mr-auto">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="{name: 'index'}"><i class="iconfont icon-shouye" style="font-size:28px"></i>首页</nuxt-link>
                        </li>
                        <!-- <li class="nav-item">
                            <nuxt-link class="nav-link" :to="{name: 'webVideo'}">前端课堂</nuxt-link>
                        </li> -->
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="{name: 'article', query: {'type': 0, 'page': 1,'size': 5}}"><i class="iconfont icon-wenzhang"></i>技术文章</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="{name: 'about'}"><i class="iconfont icon-guanyuwomen" style="font-size:28px"></i>关于我</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="{name: 'comments', query: {page:1, size:5}}"><i class="iconfont el-icon-chat-dot-round"></i>评论区</nuxt-link>
                        </li>
                    </ul>
                    <div class="loginReg" v-if="$store.state.userInfo.email">
                        {{$store.state.userInfo.email}} | <span @click="loginout">退出</span>
                    </div>
                    <div class="loginReg" v-else>
                        <span @click="handle(1)">登录</span> / <span @click="handle(0)">注册</span>
                    </div>
                </div>

                
                <!-- 登录与注册 -->
                <div v-if="$store.state.dialogFormVisible" class="dialog-bg"></div>
                <div v-if="$store.state.dialogFormVisible" class="dialog-box">
                    <div class="el-icon-close" @click="cancle"></div>
                    <h3 class="title">{{status === 1 ? '登录' : status === 0 ? '注册' : '找回密码' }}</h3>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="电子邮箱" prop="email">
                            <el-input v-model="ruleForm.email" placeholder="请输入邮箱">
                                <i slot="prefix" class="el-input__icon  el-icon-message"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item v-if="status === 0 || status === 2" label="邮箱验证码" :prop="status === 0 ? 'code' : ''">
                            <el-input v-model="ruleForm.code" placeholder="请输入邮箱验证码">
                                <i slot="prefix" class="el-input__icon iconfont icon-dunpai-"></i>
                            </el-input>
                            <el-button class="send-email" type="text" size="small" @click="sendCode">
                                {{content}}
                            </el-button>
                        </el-form-item>
                        <el-form-item v-if="status === 0" label="用户名" :prop="status === 0 ? 'name': ''">
                            <el-input v-model="ruleForm.name" placeholder="请输入用户名">
                                <i slot="prefix" class="el-input__icon  el-icon-message"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="status === 2 ? '新密码' : '密码'" prop="password">
                            <el-input v-model="ruleForm.password" :placeholder="status === 2 ? '请输入新密码' : '请输入密码'">
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="dialog-footer">
                            <el-button type="primary" @click="submitForm('ruleForm')">
                                {{status === 1 ? '登录' : status === 0 ? '注册' : '确定' }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <div class="not-account" v-if="status === 1">
                        <p>没有账号？ <el-button type="text" size="small" @click="handle(0)">注册</el-button></p>
                        <p><a href="#" @click="handle(2)">忘记密码?</a></p>
                    </div>
                    <div class="not-account" v-if="status === 0 || status === 2">
                        <p>已经拥有账户？ <el-button type="text" size="small" @click="handle(1)">登录</el-button></p>
                    </div>
                    <div class="qq-login">
                        第三方账号登录
                    </div>
                    <div class="qq-control">
                        <span class="qq-c">
                            <i class="iconfont icon-web-icon-"></i>
                        </span>
                        <span class="weibo-c">
                            <i class="iconfont icon-weibo"></i>
                        </span>
                    </div>
                </div>
            </div>
         </nav>
    </div>
</template>
<script>
import { register, emailVerify, login, getInfo, findPassword } from '../../api/login'
import cookies from 'js-cookie'
export default {
    data() {
        return {
            status: 1, // 注册/登录/忘记密码
            wait: 300, // 5分钟
            content: '点击发送',
            canClick: true,
            ruleForm: {
                email: '',
                code: '',
                name: '',
                password: '',

            },
            // dialogFormVisible: false,
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 邮箱校验
        sendCode() {
            // 校验
            this.$refs.ruleForm.validateField('email')
            if(this.ruleForm.email) {
       
                if(!this.canClick) return
                    this.canClick = false
                    this.content = this.wait + '秒' // 这里解决60秒不见了的问题
                    let clock = window.setInterval(() => {
                    this.wait--
                    this.content = this.wait + '秒'
                    if (this.wait < 0) { // 当倒计时小于0时清除定时器
                        window.clearInterval(clock)
                        this.content = '点击发送'
                        this.wait = 300
                        this.canClick = true
                    }
                }, 1000)

                emailVerify({email: this.ruleForm.email}).then(res => {
                    this.$message({
                        message: '邮箱验证码已发送',
                        type: 'success'
                    })
                })
            }
            
        },
        handle(status) {
            this.status = status
            // this.dialogFormVisible = true
            this.$store.commit('loginPop', true)
            if(status === 1) { // 登录
                
            }else if(status === 0) { // 注册
               
                // register()
            } else{ // 忘记密码

            }
        },
        cancle() {
            // this.dialogFormVisible = false
            this.$store.commit('loginPop', false)
        },
        submitForm(formName) {
     
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.status === 1) { // 登录
                        login(this.ruleForm).then(response => {
                            console.log('response---', response)
                            // const { token } = response
                            // this.$store.commit('setToken', token)
                            // window.location.reload()
                        }).catch(err => {
                            console.log('err', err)
                        })
                    }else if(this.status === 0){ // 注册
                        register(this.ruleForm).then(res => {
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            })
                            this.status = 1 // 去登录
                        }).catch(err => {
                            console.log('err', err)
                        })
                    }else { // 忘记密码
                        findPassword(this.ruleForm).then(res => {
                            this.$message({
                                message: '重置密码成功',
                                type: 'success'
                            })

                            if(this.$store.state.token) {
                                cookies.remove('token')
                                cookies.remove('userInfo')
                            }
                            this.status = 1 // 去登录
                            this.$store.commit('loginPop', true)
                        }).catch(err => {
                            console.log('err', err)
                        })
                    }
                    
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        loginout() {
            cookies.remove('blog_token')
            cookies.remove('userInfo')
            window.location.reload()
        }
    }
}
</script>
<style lang="scss" scoped>
    .loginReg{
        span{
            color: #333;
            cursor: pointer;
            &:hover{
                color: $red;
            }
        }
    }
    .dialog-box{
        background: #fff;
        width: 400px;
        z-index: 1;
        border-radius: 5px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: fixed;
        padding-bottom: 20px;
        .send-email{
            position: absolute;
            right: 10px;
            top: 45px;
            outline: none;
        }
        .el-icon-close{
            font-size: 20px;
            position: absolute;
            top: 17px;
            right: 20px;
            color: #909399;
            cursor: pointer;
            &:hover{
                color: #409EFF;
            }
        }
        .title{
             font-size: 16px;
             padding: 20px;
             font-weight: bold;
             border-bottom: 1px solid #eee;
             margin-bottom: 10px;
        }
        .not-account{
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
        }
        /deep/.el-form-item{
            padding: 0 20px;
            margin-bottom: 10px;
        }
        /deep/.el-form-item__label{
            margin: 0;
        }
        /deep/.el-input__inner{
            height: 35px;
            line-height: 35px;
        }
        /deep/.dialog-footer{
            padding: 0 20px;
            .el-button{
                width: 100%;
                margin-top: 20px;
            }
        }
        .qq-login{
            padding: 10px 0 0 20px
        }
        .qq-control{
            text-align: center;
            span{
                display: inline-block;
                margin: 0 10px;
            }
            .qq-c{
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 100%;
                background: #1a98fc;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
            }
            i.icon-web-icon-{
                color: #fff;
                font-size: 22px;
            }
            .weibo-c{
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 100%;
                background: #e93847;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
            }
            i.icon-weibo{
                color: #fff;
                font-size: 22px;
            }
        }
    }
    .dialog-bg{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
    }

    .login-Zindex{
       position: relative;
       z-index: 100;
    }
</style>
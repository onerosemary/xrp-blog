<template>
    <section class="container f-t about-me-info"> 
      <div class="f-t-1" style="flex:3">
          <div class="send-comment bg-light">
              <p><img src="~static/img/header.png" width="50"/></p>
              <div class="text-comment-box">
                  <textarea class="text-comment" placeholder="有什么想对博主说的~" v-model="message"></textarea>
                  <div class="send-btn">
                      <span class="comment-num-text"><span class="num">{{totals}}</span> 条评论</span>
                      <el-button type="primary" size="small" @click="sendComment(1)">发布评论</el-button>
                  </div>
              </div>
          </div>
          <ul class="comment-ul bg-light">
              <li v-for="(item, index) in listData" :key="index">
                  <p class="comment-l-img"><img src="~static/img/header.png" width="50"/></p>
                  <div class="comment-r">
                      <h6>{{item.name}}<span>{{item.date}}</span></h6>
                      <p class="comment-content">{{item.text}}</p>
                      <div class="comment-handle"><el-button v-if="item.user !== $store.state.userInfo._id" type="text" size="small" @click="replay(index)">回复</el-button><span :class="{active: isLike(item.likes)}" @click="clickHandle(item._id, $event)">点赞(<i>{{item.likes.length}}</i>)</span></div>
                      <!-- 二级回复 textarea-->
                      <div class="text-comment-box" v-show="currentCommentIndex === index">
                          <textarea class="text-comment" style="margin-left: 0; width: 100%;" placeholder="有什么想对博主说的~" v-model="message"></textarea>
                          <div class="send-btn">
                              <el-button type="primary" size="small" @click="sendComment(2, item._id)">发布评论</el-button>
                          </div>
                      </div>
                      <!-- 二级回复 textarea end-->
                      <ul class="comment-ul bg-light">
                          <li v-for="(child, k) in item.comments" :key="k">
                              <p class="comment-l-img"><img src="~static/img/header.png" width="50"/></p>
                              <div class="comment-r">
                                  <h6>{{child.name}}<span>{{child.date}}</span></h6>
                                  <p class="comment-content">{{child.text}}</p>
                              </div>
                          </li>
                      </ul>
                  </div>
              </li>
              
          </ul>
          <div class="pagination">
            <el-pagination
              :current-page="current"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="totals"
              background
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <div class="f-t-2">
          <div class="hot-title">
            关注博客
          </div>
          <!-- 搜索 -->
          <div class="search-index bg-light mb-4">
            <search></search>
          </div>
          <div class="bg-light mb-4">
            <!-- 微信群 -->
            <div class="Qr-code">
              <p class="Qr-code-img"><img src="https://static.zhihu.com/heifetz/assets/sidebar-download-qrcode.7caef4dd.png" width="50"/></p>
              <div class="Qr-code-text">
                <h6>加前端技术微信群</h6>
                <p>技术成就梦想， 加群交流技术</p>
              </div>
            </div>
          </div>
          <div class="bg-light">
            <hotArticle :dataList = "hotArticlesRanking"></hotArticle>
          </div>
        </div>
    </section>
</template>
<script>
import { looksList } from '../api/article'
import search from '../components/search'
import hotArticle from '../components/hotArticle'

import { postList, addPost, like, unlike, addPost2 } from '../api/comments'
import { parseTime } from '../utils/index'
import cookies from 'js-cookie'
export default {
    // middleware: 'auth',
    data() {
        return{
          current: 1,
          pageSize: 5,
          totals: 0,
          listData: [],
          message: '',
          currentCommentIndex: -1
        }
    },
    components: {
      search,
      hotArticle
    },
    // 监听参数，调用asyncData
    watchQuery: ['page','size'],
    async asyncData(ctx) {
      const params = {
        page: ctx.route.query.page,
        size: ctx.route.query.size
      }
      const postData =  await postList(params)
      
      postData.data.forEach((item) => {
        // 日期格式化
        item.date = parseTime(item.date)
        if(item.comments.length > 0){
          item.comments.forEach((citem) => {
            citem.date = parseTime(citem.date)
          })
        }
      })
      const {page, size, total} = postData

      // 热文排行榜
      const hotArticlesRanking = await looksList()
      // console.log('hotArticlesRanking', hotArticlesRanking.data)
      
      return { 
        listData: postData.data,
        current: page,
        pageSize: size,
        totals: total,
        hotArticlesRanking: hotArticlesRanking.data
        }
      },
      methods: {
        //  显示二级回复文本域
        replay(index) {
          this.currentCommentIndex = index
        },
        // 判断是否点赞过
        isLike(likes) {
          if(likes.length > 0) {
            const isClick = likes.map((a) => a.user).indexOf(this.$store.state.userInfo._id) !== -1
            return isClick
          }
        },
        handleCurrentChange(val) {
          this.current = val
          this.$router.push({
            path:'/comments',
            query: {
              page: val,
              size: this.pageSize
            }
            })
        },
        // 点赞与取消点赞
        clickHandle(id, e) {
          if(cookies.get('blog_token')) {
            
            // 设置当前class状态
            const event = e || window.event
            let target = event.target || event.srcElement
            const tagName = event.target.tagName || event.srcElement.tagName
            if(tagName === 'I'){ // 避免点i标签，导致bug
              target = target.parentNode
            }
            let targetNum = target.querySelector('i')
            const params = {
              id
            }
            if(target.className) { // 取消点赞
              target.className = ''
              unlike(params).then(res => {
                this.$message({
                    message: '已取消点赞',
                    type: 'success'
                })
                targetNum.innerHTML = parseInt(targetNum.innerHTML) - 1
              }).catch(err => {
                console.log(err)
              })
            }else { // 点赞
              target.className = 'active'
              like(params).then(res => {
                this.$message({
                    message: '已点赞',
                    type: 'success'
                })
                targetNum.innerHTML = parseInt(targetNum.innerHTML) + 1
              }).catch(err => {
                console.log(err)
              })
            }
            
          }else{
            // 去登录
            this.$store.commit('loginPop', true)
          }
        },
        sendComment(type, id) {
          if(!this.message) {
            this.$message({
                message: '请输入评论内容',
                type: 'warning'
            })
            return
          }
          if(cookies.get('blog_token')) {
            if(type === 2) { // 二级评论
              const params = {
                id,
                text: this.message,
                name: decodeURIComponent(this.$store.state.userInfo.name)
              }
              addPost2(params).then(res => {
                this.$message({
                    message: '发布评论成功',
                    type: 'success'
                })
                this.message = ''
                setTimeout(()=> {
                  window.location.reload()
                }, 1000)
              }).catch(err => {
                console.log(err)
              })
            }else{
              // 一级评论
              const params = {
                text: this.message,
                name: decodeURIComponent(this.$store.state.userInfo.name)
              }
              addPost(params).then(res => {
                this.$message({
                    message: '发布评论成功',
                    type: 'success'
                })
                this.message = ''
                setTimeout(()=> {
                  window.location.reload()
                }, 1000)
              }).catch(err => {
                console.log(err)
              })
            }
            
          }else{
            // 去登录
            this.$store.commit('loginPop', true)
          }
        }
      }
}
</script>
<style lang="scss" scoped>
    .text-comment-box{
        width: 100%;
        .text-comment{
            height: 100px;
            border-radius: 4px;
            width: calc(100% - 15px);
            margin-left: 15px;
            line-height: 22px;
            padding: 10px;
            border: 0;
        }
        .send-btn{
            text-align: right;
            padding-top: 10px;
            .comment-num-text{
                margin-right: 10px;
            }
            span.num{
                display: inline-block;
                color: $red;
            }
        }
        
    }   
    // 评论
    .pagination{
       padding-top: 20px;
      display: flex;
      justify-content: center;
    }
    .send-comment{
        display: flex;
        padding: 20px;
        p{
            img{
                border-radius: 100%;
            }
        }
        
    }
    .comment-ul{
        border-top: 1px solid #eee;
        padding: 20px;

        li{
            display: flex;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
            .comment-l-img{
                img{
                    border-radius: 100%;
                }
            }
            .comment-r{
                padding: 0 10px 0 10px;
                width: calc(100% - 15px);
                h6{
                    font-size: 12px;
                    color: #666;
                    span{
                        color: #999;
                        margin-left: 20px;
                    }
                }
                .comment-content{
                    padding: 5px 0;
                    line-height: 20px;
                }
                .comment-handle{
                   position: relative;
                    height: 32px;
                    line-height: 32px;
                    span{
                      cursor: pointer;
                      font-size: 12px;
                      position: absolute;
                      right: 0;
                      &:hover{
                        color: #409EFF;
                      }
                      &.active{
                        color: #409EFF;
                      }
                    }
                }
            }
        }
    }

    
    .hot-title{
    font-weight: 400;
    color: #333;
    padding: 2px 0 2px 10px;
    border-left: 2px solid #3472ef;
    margin: 20px 0 20px 2px;
    line-height: 25px;
    display: flex;
    align-items: center;
    font-size: 17px;
  }
  .article-ul{
    li{
      width: 100%;
      height: 220px;
      padding: 10px;
      h6{
        padding-top: 10px;
        font-weight: bold;
      }
      .article-text{
        padding-top: 10px;
        display: flex;
        .article-img{
          width: 205px;
          height: 130px;

          img{
            width: 100%;
          }
        }
        .article-content{
          flex: 1;
          padding-left: 15px;
          .article-date{
            font-size: 14px;
            padding: 10px 0;
          }
          p{
            line-height: 20px;
          }
        }
      }
      
    }
  }
  .search-index{
    padding: 10px;
  }
  .Qr-code{
    display: flex;
    padding: 10px;
    .Qr-code-img{
      margin-right: 10px;
    }
    h6{
      font-weight: bold;
      font-size: 14px;
      margin-top: 5px;
    }
  }
  .ranking-list{
    li{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #cecece;
      span{
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 4px;
        margin: 8px 5px 0;
        color: #fff;
        background-color: #979598;
      }
      .bgc1{
        background: #ff858e;
      }
      .bgc2{
        background: #77d549;
      }
      .bgc3{
        background: #62c1ff;
      }
      a{
        font-size: 13px;
      }
    }
  }
  .r-t1{
    position: relative;
    overflow: hidden;
    .today-recommend{
      position: absolute;
      top: 8px;
      right: -28px;
      background: $red;
      width: 100px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 13px;
      transform: rotate(45deg);
      color: #fff;
    }
  }
  .classify-ul{
    padding: 10px;
    padding-bottom: 0;
    display: flex;
    border-bottom: 1px solid #eee;
    li{
      width: 120px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      position: relative;
      &.active{
        color: $red;
        &::after{
          display: inline-block;
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 1px;
          background: $red;
        }
      }
    }
  }
  .classify-content{
    padding: 10px;
    .left-img{
      .left-img-t{
        position: relative;
        margin-bottom: 10px;
        h4{
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 13px;
          color: #fff;
          width: 150px;
          text-align: center;
          transform: translate(-50%, -50%)
        }
      }
    }
    .right-content{
      flex: 1;
    }
    /deep/.el-collapse-item__content{
      padding-bottom: 5px;
      padding-left: 10px;
      font-size: 12px;
    }
    /deep/.el-collapse-item__header{
      height: 42px;
      line-height: 42px;
      padding-left: 10px;
      font-size: 14px;
    }
  }
    .about-me{
        .about-t1{
            padding-left: 30px;
            p{
                font-size: 18px;
                margin: 10px 0;
                line-height: 30px;
            }
            .about-t-1{
                margin-bottom: 10px
            }
            .about-t-2{
                margin-top: 30px;
            }
        }
    }
    .about-info{
        padding-top: 30px;
        p{
            font-size: 16px;
            line-height: 30px;
            text-indent: 2em;
            margin-bottom: 10px;
        }
    }
    
</style>
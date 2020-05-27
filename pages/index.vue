<template>
  <section class="container f-t">
    <div class="banner-notice">
      <banner/>
      <div class="notice">
        <img src="~static/img/index1.jpg"  width="100%"/>
      </div>
    </div>
    <div class="hot-title">
      热门推荐
    </div>
    <div class="recommend-two">
      <div class="r-t1 bg-light">
        <div class="today-recommend">今日推荐</div>
        <img src="https://cdn.duanliang920.com/uploads/images/2019-12-29/1577617172.jpeg" width="100%"/>
      </div>
      <div class="r-t2 bg-light">
        <!-- 分类 -->
        <div class="classify">
          <ul class="classify-ul">
            <li :class="{active: typeIndex === index}" v-for="(item, index) in typeList" :key="index"  @click="handleType(item, index)">{{item.name}}</li>
          </ul>
          <div class="classify-content">
            <div class="left-img">
              <div class="left-img-t">
                <h4>织梦dede常用的调用标签（个人总结）</h4>
                <a href="#"><img src="https://cdn.duanliang920.com/uploads/allimg/140924/1-1409241QK3V2.jpg?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_200,limit_0/quality,q_90" /></a>
              </div>
              <div class="left-img-t">
                <h4>织梦dede常用的调用标签（个人总结）</h4>
                <a href="#"><img src="https://cdn.duanliang920.com/uploads/allimg/140924/1-1409241QK3V2.jpg?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_200,limit_0/quality,q_90" /></a>
              </div>
            </div>
            <div class="right-content">
              <el-collapse v-model="activeName" accordion v-for="(item, index) in hotArticleData" :key="index">
                <el-collapse-item :title="item.title" :name="index">
                  <div><nuxt-link :to="'/article/details?id=' + item._id">{{item.content}}</nuxt-link></div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-title">
      <div class="f-t-1">
        <div class="hot-title">
          文章推荐
        </div>
        <ul class="article-ul">
          <li class="bg-light mb-4" v-for="(item, index) in articleList" :key="index">
            <nuxt-link :to="'/article/details?id=' + item._id">
              <h6>{{item.title}}</h6>
              <div class="article-text">
                <p class="article-img"><img src="https://cdn.duanliang920.com/uploads/images/1537260882208.jpeg" /></p>
                <div class="article-content">
                  <div class="article-date">发布时间：{{item.date}} 
                      <span v-if="item.type === 1">分类：Javascript</span>
                      <span v-if="item.type === 2">分类：Vue</span>
                      <span v-if="item.type === 3">分类：Koa2</span>
                      <span v-if="item.type === 4">分类：H5</span>
                      <span v-if="item.type === 5">分类：Css3</span></div>
                  <p class="c6 article-text-h">{{item.content}}</p>
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
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
      
    </div>
  </section>
</template>

<script>
import { articleType, articleList, looksList } from '../api/article'
import { homeList } from '../api/index'
import banner from '../components/banner'
import { parseTime } from '../utils/index'
import search from '../components/search'
import hotArticle from '../components/hotArticle'

export default {
  data() {
    return{
      activeName: 0,
      typeIndex: 0
    }
  },
  components: {
    banner,
    search,
    hotArticle
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    async handleType(item, index = 0) {
      this.typeIndex = index
      
      const data = {
        type: index + 1,
        page: 1,
        size: 2,
      }
      const articleListData =  await articleList(data)
      
      articleListData.data.forEach((item) => {
        item.date = parseTime(item.date)
      })
      this.hotArticleData = articleListData.data
    }
  },
  async asyncData() {
    // 文章类型
    const articleTypeData =  await articleType()
    
    const res =  await homeList()
    res.data.forEach((item) => {
      item.date = parseTime(item.date)
    })

    const data = {
      type: 1, // 0全部
      page: 1,
      size: 2,
    }
    const articleListData =  await articleList(data)
  
    articleListData.data.forEach((item) => {
      item.date = parseTime(item.date)
    })
    // 热文排行榜
    const hotArticlesRanking = await looksList()
    // console.log('hotArticlesRanking', hotArticlesRanking.data)
    return { 
      typeList: articleTypeData.data.slice(1, 5),
      articleList: res.data,
      hotArticleData: articleListData.data,
      hotArticlesRanking: hotArticlesRanking.data
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>


<template>
    <section class="container f-t about-me-info"> 
    <div class="f-t-1" style="flex:3">
        <h3  class="article-details-title">{{detailData.title}}</h3>
        <div class="article-sub">
            <p><span>发布日期：</span> {{detailData.date}}</p>
            <p><span>浏览量：</span> {{detailData.looks}}</p>
            <p><span>分类：</span> <span v-if="detailData.type === 1">Javascript</span>
                    <span v-if="detailData.type === 2">Vue</span>
                    <span v-if="detailData.type === 3">Koa2</span>
                    <span v-if="detailData.type === 4">H5</span>
                    <span v-if="detailData.type === 5">Css3</span></p>
        </div>
        <div class="article-details-content" v-html="detailData.content"></div>
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

import search from '../../components/search'
import hotArticle from '../../components/hotArticle'

import { articleDetail,looksList } from '../../api/article'
import { parseTime } from '../../utils/index'
export default {
    data() {
        return{

        }
    },
    components: {
      search,
      hotArticle
    },
  watchQuery: ['id'],

  async asyncData(ctx) {

    const params = {
      id: ctx.route.query.id
    }
    const detail =  await articleDetail(params)
    const {data} = detail

    data.date = parseTime(data.date)
    console.log('data---', data)

    // 热文排行榜
    const hotArticlesRanking = await looksList()

   return { 
     detailData: data,
     hotArticlesRanking: hotArticlesRanking.data
    }
  },
}
</script>
<style lang="scss" scoped>
    .article-details-title{
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        padding: 15px 0;
    }
    .article-sub{
        display: flex;
        justify-content: center;
        font-size: 13px;
        p{
            span{
                color: #999;
            }
            margin: 0 10px;
        }
    }
    .article-details-content{
        padding-top: 40px;
        color: #666;
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
</style>
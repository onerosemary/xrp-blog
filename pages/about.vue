<template>
    <section class="container f-t about-me-info"> 
    <div class="f-t-1" style="flex:3">
        <h3 class="title">一、关于我</h3>
        <p>
          我叫向瑞平，是一个长沙的前端开发工程师，也就是一名程序员。
        </p>
        <p>
          相信很多人都知道，写程序的人与人接触的时间少于与电脑接触的时间，有时候我也有很长一段时间不与人交流，除了工作的内容与时间，但实际上我很喜欢交朋友， 很喜欢与人聊一些天南海北的话题。欢迎大家与我交朋友，一起交流，学习，成长。
        </p>
        <h3 class="title">二、关于博客</h3>
        <p>关于博客呢，主要是觉得有一个自己的博客是一件很酷的事情，再加上经常在网上搜索问题或者浏览知识的时候会看到别人的博客写的很酷，于是就萌生了自己写自己博客的想法， 由于时间技术有限，博客确实很粗糙，但是还是有那么一丢丢用的哈，至少在自己做的过程中也学习到了很多东西。我会不定期在博客里分享一些我读过或学习的文章，也算是自己学习的一个记录与总结。</p>
        <p>自己去做一个博客呢，也对于自己是一个锻炼，对学习到的知识是一个拓展应用，很多时候很多东西只有去经历一下才会有不同的体会。</p>
        <p>
          博客的功能大概有文章阅读功能，写文章功能，分享文章功能，以及一些常用工具，还有学习工作中会使用的一些文档等。如果对博客有意见或者建议可以在评论区 导航菜单列表中留言，我会经常看留言信息，并作为参考来改进博客，如果你平时有在工作学习中遇到好用的工具，也可以留言分享，如果有需要的学习资源，也可以留言或者联系我，如果方便我也可以帮忙去找。
        </p>
        <h3 class="title">三、加我微信</h3>
        <p>
          <img src="https://xiangruiping.cn/uploads/1592658365859.jpg" width="150"/>
        </p>
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
              <p class="Qr-code-img"><img src="https://xiangruiping.cn/uploads/1592658365859.jpg" width="50"/></p>
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

export default {
    data() {
        return{

        }
    },
    components: {
      search,
      hotArticle
    },
    async asyncData(ctx) {
      // 热文排行榜
      const hotArticlesRanking = await looksList()
      // console.log('hotArticlesRanking', hotArticlesRanking.data)
      
      return {
        hotArticlesRanking: hotArticlesRanking.data
        }
      },
}
</script>
<style lang="scss" scoped>
   .f-t-1{
     p{
       line-height: 22px;
       text-indent: 2em;
       margin: 15px 0;
     }
   }
    .title{
      font-size: 18px;
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
          object-fit: contain;
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
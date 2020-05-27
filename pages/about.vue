<template>
    <section class="container f-t about-me-info"> 
    <div class="f-t-1" style="flex:3">
        <div class="about-me">
                <div class="about-me-img">
                    <img src="https://c-ssl.duitang.com/uploads/item/201708/02/20170802120022_vNE5R.jpeg"/>
                </div>
                <div class="about-t1">
                    <p class="about-t-1">一、关于向瑞平</p>
                    <p>1. 一个对于"web前端"稍有研究的，90后草根站长。</p>
                    <p>2. 向瑞平博客的创始人</p>

                    <p class="about-t-2">一、关于天蝎座</p>
                    <p>我属于天蝎座:很多时候觉得自己对待任何事都很执着，一旦定了目标，就会不达目标不罢休，永不退缩！ 面对爱情也是一样，当真正遇到自己喜欢的一个人，会不顾一切去追。</p>
                </div>
            </div>
            <div class="about-info">
                <p class="text">
                    在我认为：不管学习什么东西，一定要有属于自己的“学习方法”和善于“对事物的总结”。
                    </p> 
                <p  class="text">
                    俗话说的好：“方向不对，努力白费！”很多人都是盲目的去学习，导致花了大量的时间，在学习一些没有用处的东西，到头来什么都没学会，因此会打击自己的学习欲望，也会让自己处于迷茫当中...一个优秀的传道授业者“不单单传授的是知识，更多传授的是思维和方法”。---授人以鱼不如授人以渔
                </p>
                <p class="text">
                    其实，人的一生中都是在不断的学习，不管是技术也好，做人也罢！我觉得都应该以一颗“谦卑的心态来学习，秉持利他之心来帮助他人。”
                </p> 
                <p class="text">
                    人就得学会感恩，滴水之恩应当涌泉相报。感谢那些曾经帮助过我的人，因为有你们我才会变得如此的优秀。
                </p> 
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
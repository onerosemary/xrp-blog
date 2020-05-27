<template>
    <section class="container f-t">
        <div class="f-t-1">
        <div class="classify-tag">
          <div v-for="(item, index) in typeList" :key="index" :class="{active: typeIndex === index}" class="bg-light" @click="handleType(item, index)">
            {{item.name}}
          </div>
        </div>
        <ul class="article-ul" v-if="listData.length > 0">
          <li class="bg-light mb-4" v-for="(item, index) in listData" :key="index">
            <nuxt-link :to="{path: '/article/details?id=' + item._id}">
              <h6>{{item.title}}</h6>
              <div class="article-text">
                <p class="article-img"><img src="https://cdn.duanliang920.com/uploads/images/1537260882208.jpeg" /></p>
                <div class="article-content">
                  <div class="article-date">
                    发布时间：{{item.date}} 
                    <span v-if="item.type === 1">分类：Javascript</span>
                    <span v-if="item.type === 2">分类：Vue</span>
                    <span v-if="item.type === 3">分类：Koa2</span>
                    <span v-if="item.type === 4">分类：H5</span>
                    <span v-if="item.type === 5">分类：Css3</span>
                  </div>
                  <p class="c6 article-text-h">{{item.content}}</p>
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
        
        <div class="no-data" v-else>
          暂无数据
        </div>
    
          <el-pagination
            :current-page="current"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="totals"
            background
            @current-change="handleCurrentChange"
          />
        
      </div>
    </section>
</template>
<script>
import { articleType, articleList } from '../../api/article'
import { parseTime } from '../../utils/index'
export default {
  data() {
    return {

    }
  },
  watchQuery: ['type','page', 'size'],

  async asyncData(ctx) {
   const articleTypeData =  await articleType()
   
   const data = {
     type: ctx.route.query.type, // 0全部
     page: ctx.route.query.page,
     size: ctx.route.query.size,
   }
   const articleListData =  await articleList(data)
  
   articleListData.data.forEach((item) => {
     item.date = parseTime(item.date)
   })
   const {page, size, total} = articleListData

   
   return { 
     typeList: articleTypeData.data,
     listData: articleListData.data,
     current: page,
     pageSize: size,
     totals: total,
     typeIndex: ctx.route.query.type
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.current = val
      this.$router.push({
        path: '/article',
        query: {
          type: this.typeIndex,
          page: val,
          size: this.pageSize,
        }
      })
    },
    handleType(item, index) {
      
      // 重置第一页
      this.current = 1
    
      this.$router.push({
        path: '/article',
        query: {
          type: index,
          page: this.current,
          size: this.pageSize,
        }
      })

      this.typeIndex = index   
    }
  }
}
</script>
<style lang="scss" scoped>
  .classify-tag{
      padding-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      div{
          cursor: pointer;
          padding: 15px 20px;
          margin-right: 30px;
          font-size: 15px;
          border-radius: 3px;
          margin-bottom: 20px;
          &.active{
              color: #fff;
              background: $red!important;
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
</style>


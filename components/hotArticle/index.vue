<template>
    <div class="bg-light">
        <div class="hot-title" style="padding-top: 0">
            热文排行
        </div>
        <ul class="ranking-list">
          
            <li v-for="(item, index) in hotRanking" :key="index">
                <span :class="'bgc'+ (index + 1)">{{index + 1}}</span>
                <nuxt-link :to="'/article/details?id=' + item._id">{{item.title}}</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    data() {
        return {
            hotRanking: []
        }
    },
    props: ['dataList'],
    created() {
        this.hotRanking = this.dataList
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
</style>
<template>
    <section class="container f-t">
        <dl class="video-type">
            <dt>类型：</dt>
            <dd class="active">全部</dd>
            <dd>免费</dd>
            <dd>VIP视频</dd>
        </dl>
        <dl class="video-type">
            <dt>分类：</dt>
            <dd>javascript</dd>
            <dd class="active">vuejs</dd>
            <dd>koa2</dd>
        </dl>
        <div>
            <ul class="video-ul">
                <li>
                    <nuxt-link :to="{path: '/webVideo/details', query: {id: 123}}">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                            <div style="padding: 14px;">
                                <div class="title">vuex 的基本使用, 工作中常用的写法</div>
                                <div class="bottom">
                                <div class="time"><span>888</span> 人看过</div>
                                <el-button type="text" class="button">观看</el-button>
                                </div>
                            </div>
                        </el-card>
                    </nuxt-link>
                </li>
                <li>
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;">
                            <div class="title">vuex 的基本使用, 工作中常用的写法</div>
                            <div class="bottom">
                            <div class="time"><span>888</span> 人看过</div>
                            <el-button type="text" class="button">观看</el-button>
                            </div>
                        </div>
                    </el-card>
                </li>
                <li>
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;">
                            <div class="title">vuex 的基本使用, 工作中常用的写法</div>
                            <div class="bottom">
                            <div class="time"><span>888</span> 人看过</div>
                            <el-button type="text" class="button">观看</el-button>
                            </div>
                        </div>
                    </el-card>
                </li>
                <li>
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;">
                            <div class="title">vuex 的基本使用, 工作中常用的写法</div>
                            <div class="bottom">
                            <div class="time"><span>888</span> 人看过</div>
                            <el-button type="text" class="button">观看</el-button>
                            </div>
                        </div>
                    </el-card>
                </li>
                <li>
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;">
                            <div class="title">vuex 的基本使用, 工作中常用的写法</div>
                            <div class="bottom">
                            <div class="time"><span>888</span> 人看过</div>
                            <el-button type="text" class="button">观看</el-button>
                            </div>
                        </div>
                    </el-card>
                </li>
            </ul>
            <div class="page-bottom">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="30">
                </el-pagination>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return{
            currentDate: '2020-03-25'
        }
    }
}
</script>
<style lang="scss" scoped>
    .video-type{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        dt{
            font-weight: lighter;
            font-size: 16px;
        }
        dd{
            margin: 0 10px;
            cursor: pointer;
            color: #666;
        }
        .active{
            color: #ef4868;
        }
    }
    .video-ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
            margin-bottom: 20px;
            .title{
                line-height: 22px;
            }
            .bottom{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .time{
                    font-size: 12px;
                    color: #999;
                    span{
                        color:#ef4868
                    }
                }
            }
        }
    }
    .page-bottom{
        text-align: center;
    }
    
</style>
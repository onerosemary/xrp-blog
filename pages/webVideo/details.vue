<template>
    <section class="container f-t">
        <div class="video-plays">
            <div class="video-content-box">
                <video width="100%" height="100%" controls>
                    <source src="https://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">
                    <source src="https://www.runoob.com/try/demo_source/movie.ogg" type="video/ogg">
                    您的浏览器不支持 HTML5 video 标签。
                </video>
            </div>
       
            <div class="video-text-list">
                <h3>html+css基础视频学习资料</h3>
                <ul>
                    <li>课前准备</li>
                    <li class="active"><div>html常见标签1</div><p>16分钟</p></li>
                    <li><div>html常见标签1</div><p>16分钟</p></li>
                    <li><div>html常见标签1</div><p>16分钟</p></li>
                    <li><div>html常见标签1</div><p>16分钟</p></li>
                </ul>
            </div>
          
        </div>
        <div class="details-video">
            <div class="video-left bg-light">   
                <ul class="video-left-ul">
                    <li class="active">
                        课程概述
                    </li>
                     <li>
                        目录
                    </li>
                     <li>
                        评论(28)
                    </li>
                </ul>
                <div class="video-content">
                    本节课主要讲解网页入门的一些基本知识。网页分为：头部和身体，那你有知道这分别代表着什么吗？
                </div>
            </div>
            <div class="video-right">
                <!-- 搜索 -->
                <div class="search-index bg-light mb-4">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="课堂视频搜索" aria-label="Recipient's username" aria-describedby="搜索">
                        <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">搜索</button>
                        </div>
                    </div>
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
            </div>
        </div>
    </section>
</template>
<script>
// https://ke.qq.com/course/133640?taid=2748809134344712
export default {
    data() {
        return{
            currentDate: '2020-03-25'
        }
    }
}
</script>
<style lang="scss" scoped>
   .video-plays{
       margin-bottom: 20px;
       background: #333;
   }
   .details-video{
       .video-left{
           .video-content{
               padding: 30px 10px 10px 10px;
           }
           .video-content-box{
               width: 100%;
               margin-bottom: 20px;
           }
       } 
   }
   .video-plays {
       .video-text-list{
           li{
               cursor: pointer;
               &.active{
                    div{
                        color: #ef4868;
                    }  
                }
           }
       }
   } 
</style>
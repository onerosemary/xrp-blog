<template>
    <div class="jingjing">
        <div class="w-j">
            <img :src="t1" class="m1"/>
            <div class="w-n">
                <div class="nav-j">
                    <img :src="t2" />
                    <img :src="t3" />
                    <img :src="t4" />
                    <img :src="t5" />
                </div>
                <el-image v-for="url in urls" :key="url" :src="url" :lazy="true"></el-image>
            </div>
        </div>
       
    </div>
</template>
<script>
export default {
    data(){
        return{
            t1: require('../assets/jingjing/j8.jpg'),
            t2: require('../assets/jingjing/j0.jpg'),
            t3: require('../assets/jingjing/j1.jpg'),
            t4: require('../assets/jingjing/j2.jpg'),
            t5: require('../assets/jingjing/j3.jpg'),
            urls: [
                require('../assets/jingjing/j4.jpg'),
                require('../assets/jingjing/j5.jpg'),
                require('../assets/jingjing/j6.jpg'),
                require('../assets/jingjing/j7.jpg'),

                require('../assets/jingjing/a1.jpg'),
                require('../assets/jingjing/a2.jpg'),
                require('../assets/jingjing/a3.jpg'),
                require('../assets/jingjing/a4.jpg'),
                require('../assets/jingjing/a5.jpg'),
                require('../assets/jingjing/a6.jpg'),
                require('../assets/jingjing/a7.jpg'),
                require('../assets/jingjing/a8.jpg'),
                require('../assets/jingjing/a9.jpg'),
                require('../assets/jingjing/a10.jpg'),
                require('../assets/jingjing/a11.jpg'),
                require('../assets/jingjing/a12.jpg'),
                require('../assets/jingjing/a13.jpg'),
                require('../assets/jingjing/a14.jpg'),
                require('../assets/jingjing/a15.jpg'),
                require('../assets/jingjing/a16.jpg'),
                require('../assets/jingjing/a17.jpg'),
                require('../assets/jingjing/a18.jpg'),
                require('../assets/jingjing/a19.jpg'),
                require('../assets/jingjing/a20.jpg'),
                require('../assets/jingjing/a21.jpg'),
                require('../assets/jingjing/a22.jpg'),
                require('../assets/jingjing/a23.jpg'),
                require('../assets/jingjing/a24.jpg'),
                require('../assets/jingjing/a25.jpg'),
                require('../assets/jingjing/a26.jpg'),
                require('../assets/jingjing/a27.jpg'),
                require('../assets/jingjing/a28.jpg'),
                require('../assets/jingjing/a29.jpg'),
                require('../assets/jingjing/a30.jpg'),
                require('../assets/jingjing/a31.jpg'),
                require('../assets/jingjing/a32.jpg'),
                require('../assets/jingjing/a33.jpg'),
                require('../assets/jingjing/a34.jpg'),
                require('../assets/jingjing/a35.jpg'),
                require('../assets/jingjing/a36.jpg'),
                require('../assets/jingjing/a37.jpg'),
                require('../assets/jingjing/a38.jpg'),
                require('../assets/jingjing/a39.jpg'),
                require('../assets/jingjing/a40.jpg'),
                require('../assets/jingjing/a41.jpg'),
                require('../assets/jingjing/a42.jpg'),
                require('../assets/jingjing/a43.jpg'),
                require('../assets/jingjing/a44.jpg'),
                require('../assets/jingjing/a45.jpg'),
                require('../assets/jingjing/a46.jpg'),
                
            ]
            
        }
    },
    layout: 'jingjing',
    head () {
        return{
            title: '晶晶-个人作品展示'
        }
    },
}
</script>
<style lang="scss" scoped>
img{
    vertical-align:top!important;
}
.jingjing{
    background: #1dc726;
    height: 100vh;
    overflow-y: auto;
}
.jingjing .el-image {
    display: block;
    min-height: 50px;
}
.nav-j{
    display: flex;
    img{
        width: 25%;
    }
}
// .demo-image__lazy {
//     height: 100vh;
//     overflow-y: auto;
// }

.w-n{
    background: #fff;
    border-radius: 20px;

}
</style>
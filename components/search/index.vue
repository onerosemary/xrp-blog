<template>
    <div class="input-group">
        <input type="text" class="form-control" v-model="keyword" placeholder="全站搜索" >
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="searchKeyword">搜索</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        searchKeyword(){
            this.$router.push({
                path: `/search?keyword=${this.keyword}&page=1&size=5`
            })
        }
    }
}
</script>
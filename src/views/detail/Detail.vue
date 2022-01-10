<template>
    <div class="detail">
        <detail-nav-bar/>
        <detail-swiper :top-imgs="topImages">
        </detail-swiper>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'

import {getDetail} from 'network/detail.js'
import DetailSwiper from './childComps/DetailSwiper.vue'

export default {
    name:"Detail",
    data(){
        return {
            iid:null,
            topImages:[],
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper
    },
    created(){
        //取得iid
        this.iid = this.$route.params.iid;

        //数据请求
        getDetail(this.iid).then(res => {
        // console.log(res);
        this.topImages = res.result.itemInfo.topImages;
        console.log(res.result.itemInfo.topImages.length);
        });
    }
}
</script>

<style scoped>
</style>
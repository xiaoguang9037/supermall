<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" :pull-up-load="true">
            <detail-swiper :top-imgs="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo"/>
            <detail-param-info :paramInfo="paramsInfo"/>
        </scroll>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail.js'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'

export default {
    name:"Detail",
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramsInfo:{},
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll ,
        DetailGoodsInfo,
        DetailParamInfo
    },
    created(){
        //取得iid
        this.iid = this.$route.params.iid;

        //数据请求
        getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
            // 获取轮播图数据
            this.topImages = res.result.itemInfo.topImages;
            // console.log(res.result.itemInfo.topImages.length);

            //获取商品数据
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

            // 获取店铺信息
            this.shop = new Shop(data.shopInfo);
            
            //保存商品详情数据
            this.detailInfo = data.detailInfo;

            //获取参数数据
            this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
            console.log(this.goods);

        });
    }
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 10;
    background-color: white;
}
.content{
    height: calc(100vh - 44px);
}
.detail-nav{
    position: relative;
    background-color: white;
    z-index: 9;
}
</style>
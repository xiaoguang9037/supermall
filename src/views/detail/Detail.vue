<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="navBar"/>
        <scroll class="content" :pull-up-load="true" ref="scroll" :probeType="3" @scroll="contentScroll">
            <detail-swiper :top-imgs="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
            <detail-param-info ref="params" :paramInfo="paramsInfo"/>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <detail-bottom-bar/>
    </div>
</template>

<script>

import {getDetail, Goods, Shop, GoodsParam, getRecommends} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailNavBar from './childComps/DetailNavBar.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

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
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll ,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
    },
    created(){
        //取得iid
        this.iid = this.$route.params.iid;

        //数据请求数据
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

            // 获取评论数据
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]; 
            }
            //渲染完调用，但是不包括图片高度
            this.$nextTick(() => {
                // this.themeTopYs=[];
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.setoffTop);
                // this.themeTopYs.push(this.$refs.comment.$el.setoffTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.setoffTop);
            });
        });
        
        //请求推荐数据
        getRecommends().then(res => {
            this.recommends = res.data.list;
        });

        this.getThemeTopY = debounce(()=>{
            this.themeTopYs=[];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
            // console.log(this.themeTopYs);
            },300)
    },
    methods:{
        itemClick(index){
            this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 300)
            // console.log(index)
        },
        imgLoad(){
            this.getThemeTopY();
        },
        contentScroll(opsition){
            const opsitonY = -opsition.y;
            for(let i=0; i < this.themeTopYs.length; i++){
                // var nextI = parseInt(i) +1;
                if(this.currentIndex == i) continue;
                if(i < this.themeTopYs.length -1 ){
                    // console.log(this.themeTopYs[i] +'_'+opsitonY+'_'+this.themeTopYs[i+1])
                    if(opsitonY>this.themeTopYs[i] && opsitonY<this.themeTopYs[i+1]) {
                        this.currentIndex = (i);
                        this.$refs.navBar.currentIndex = i;
                        break;
                        //console.log(i);
                    }
                } else {
                    if(opsitonY > this.themeTopYs[i]){
                        this.currentIndex = (i);
                        this.$refs.navBar.currentIndex = i;
                        // console.log(i);
                        break;
                    }
                }
            }
        }
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
<template>
    <div id='home'>
      <nav-bar class='home-nav'><div slot="center">购物街</div></nav-bar>
      <tab-control class="tab-control" :titles="['流行','新款','经典']" @tabClick="tabClick" ref='tabControl1' v-show='isTabControl1Show'/>
      <scroll class="content" :pull-up-load="true" @pulllingUp='loadMore()' ref='scroll' @scroll="scrolChange">
        <home-swiper :banners="banners" @swipwerFirst="swipwerFirst"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行','新款','经典']" @tabClick="tabClick" ref='tabControl' />
        <goods-list :goods="showGoods"/>
      </scroll>
    </div>
</template>
<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'

  import {getHomeMultidata, getHomeGoods} from  'network/home.js'
  
    export default {
        name:'Home',
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll
        },
        data(){
            return {
              banners:[],
              recommends:[],
              goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
              },
              currentType:'pop',
              currentType1:'pop',
              tabControlOffSetTop:0,
              isTabControl1Show:false,
            }
        },
        created(){
            //1.请求多个数据
            this.getHomeMultidata();
            //2.请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
        },
        methods:{
          /**
          * 事件监听相关的方法
          */
          scrolChange(position){
            if((-position.y) > this.tabControlOffSetTop) {
              this.isTabControl1Show = true;
            } else {
              this.isTabControl1Show = false;
            }
          },
          swipwerFirst(){
            this.tabControlOffSetTop = this.$refs.tabControl.$el.offsetTop;
          },
          tabClick(index) {
            switch (index) {
              case 0:
                this.currentType = 'pop'
                break
              case 1:
                this.currentType = 'new'
                break
              case 2:
                this.currentType = 'sell'
              break
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl.currentIndex = index;
          },
          // 加载更多数据
          loadMore(){
            this.getHomeGoods(this.currentType)
          },
          // 网络请求相关
          getHomeMultidata(){
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            }, err => {
                console.log(err)
            });
          },
          getHomeGoods(type){
            const page = this.goods[type].page + 1;
            // console.log(page);

            getHomeGoods(type, page).then((res => {
              // ...表示遍历,然后将元素以此放入原本的list中
              this.goods[type].list.push(...res.data.list);
              this.goods[type].page += 1;

              this.$refs.scroll.scroll.finishPullUp();
            }))}
        },
				computed:{
					showGoods(){
						return this.goods[this.currentType].list
					}
				},
        activated(){
          // console.log('路由转移回来时调用');
        },
        deactivated(){
          // console.log('路由转移出去时调用');
        }
    }
</script>
<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /* position: fixed;
    left: 0;
    right: 0;
    top:0;*/
    margin-top: -44px;
    z-index: 10; 
    }
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .tab-control{
    position: relative;
    background-color: white;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
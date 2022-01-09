<template>
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt=""  @load="swiperLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
    ,data(){
      return {
        isFirstLoad:true,//是否为第一次加载
      }
    },
    methods:{
      swiperLoad(){
        if(this.isFirstLoad){
          this.$emit('swipwerFirst');
        }
        this.isFirstLoad = false;
      },
    }
  }
</script>

<style scoped>
</style>

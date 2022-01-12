<template>
    <div>
        <nav-bar>
            <div slot="left"  @click="homeBack">
                <img src="~assets/img/common/back.svg" alt="" class="left-img">
            </div>
            <div slot='center' class="title">
                <div v-for="(item, index) in titles" :key='item' class="title-item" :class="{active: index == currentIndex}" @click="itemClick(index)">
                    <span>{{item}}</span>
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
    name:"DetailNavBar",
    components:{
       NavBar
    },
    data(){
        return {
            titles :['商品','参数','评论','推荐'],
            currentIndex :0,
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('itemClick', index)
        },
        homeBack(){
            this.$router.back();
        }
    }
}
</script>
<style scoped>
.title{
    display: flex;
}
.title-item{
    flex: 1;
    font-size: 13px;
}
.active{
    color: var(--color-high-text);
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
.left-img{
    margin-top:15px;
}
</style>
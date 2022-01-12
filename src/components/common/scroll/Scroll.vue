<template>
    <div class="warpper" ref="warpper">
        <div class="content">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:"Scroll",
    data(){
        return {
            scroll:null

        }
    },
    props:{
        pullUpLoad:{
            type: Boolean,
            default:false
        },
        probeType:{
            type:Number,
            default:2
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.warpper, {
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            click:true,
            observeImage:true
        });

        this.scroll.on('scroll',(position) => {
            this.$emit('scroll', position)
        });

        this.scroll.on('pullingUp', () => {
            // console.log('上拉加载更多');

            this.$emit('pulllingUp');
        });

        //this.scroll.refresh();
    }
}
</script>

<style scoped>

</style>
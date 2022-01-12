<template>
    <div class="good-list">
      <good-list-item v-for="(item, index) in goods" :key="index" :good-item="item"/>
    </div>
</template>

<script>
  import GoodListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props:{
        goods:{
            type:Array,
            default() {
                return []
            }
        }
    },
    components:{
      GoodListItem
    }
  }
</script>

<style scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px;
  }

</style>

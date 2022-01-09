<template><tab-bar>
		<tab-bar-item path='/home'>
			<img slot='item-icon' src="~assets/img/tabbar/home_1.svg">
			<img slot='item-icon-active' src="~assets/img/tabbar/home_2.svg">
			<div slot='item-text'>首页</div>
		</tab-bar-item>
		<tab-bar-item path='/class'>
			<img slot='item-icon' src="~assets/img/tabbar/class_1.svg">
			<img slot='item-icon-active' src="~assets/img/tabbar/class_2.svg">
			<div slot='item-text'>分类</div>
		</tab-bar-item>
		<tab-bar-item path='/shopcar'>
			<img slot='item-icon'  src="~assets/img/tabbar/shopcar_1.svg">
			<img slot='item-icon-active'  src="~assets/img/tabbar/shopcar_2.svg">
			<div slot='item-text'>购物车</div>
		</tab-bar-item>
		<tab-bar-item path='/my'>
			<img slot='item-icon'  src="~assets/img/tabbar/my_1.svg">
			<img slot='item-icon-active'  src="~assets/img/tabbar/my_2.svg">
			<div slot='item-text'>我的</div>
		</tab-bar-item>
	</tab-bar>
</template>
<script>

	import TabBar from 'components/common/tabbar/TabBar.vue'
	import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
	
	export default{
		name:'MainTabBar'
		,components:{
			TabBar
			,TabBarItem
		}
	}
</script>
<style scoped>
</style>
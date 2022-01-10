import Vue from 'vue'
import VuerRouter from 'vue-router'

Vue.use(VuerRouter)
const Home = () =>
    import ('views/home/Home.vue')
const Class = () =>
    import ('views/class/Class.vue')
const Shopcar = () =>
    import ('views/shopcar/Shopcar.vue')
const My = () =>
    import ('views/my/My.vue')
const Detail = () =>
    import ('views/detail/Detail.vue')

const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: Home
}, {
    path: '/class',
    component: Class
}, {
    path: '/shopcar',
    component: Shopcar
}, {
    path: '/my',
    component: My
}, {
    path: '/detail/:iid',
    component: Detail
}]
const router = new VuerRouter({
    routes,
    mode: 'history'
})
export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie';

const token = Cookies.get('token');

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    // redirect:token ? '/personal' : '/login'
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/addressBook',
    component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/index.vue')
  },
  {
    path: '/shareFile',
    component: () => import(/* webpackChunkName: "shareFile" */ '../views/share-file/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

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
  }
]

const router = new VueRouter({
  routes
})

export default router

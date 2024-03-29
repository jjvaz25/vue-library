import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLibrary from '../views/MyLibrary.vue'
import WishList from '../views/WishList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'my-library',
    component: MyLibrary
  },
  {
    path: '/wish-list',
    name: 'wish-list',
    component: WishList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

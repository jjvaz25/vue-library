import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WishList from '../views/WishList.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/wish-list',
    name: 'wish-list',
    component: WishList
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

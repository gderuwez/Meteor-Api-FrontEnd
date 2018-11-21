import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Search from './components/Search.vue'
import Best from './components/Best.vue'
import Update from './components/Update.vue'
import NewMeteor from './components/NewMeteor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/best',
      name: 'best',
      component: Best
    },
    {
      path: '/update',
      name: 'update',
      component: Update
    },
    {
      path: '/new',
      name: 'new',
      component: NewMeteor
    }
  ]
})

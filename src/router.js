import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewJob from './views/jobs/NewJob.vue'
import JobsIndex from './views/jobs/JobsIndex.vue'
import ShowJob from './views/jobs/ShowJob.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/jobs',
      name: 'jobs index',
      component: JobsIndex
    },
    {
      path: '/jobs/new',
      name: 'new job',
      component: NewJob
    },
    {
      path: '/jobs/:id',
      name: 'show job',
      component: ShowJob
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

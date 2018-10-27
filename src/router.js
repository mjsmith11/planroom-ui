import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import NewJob from './views/jobs/NewJob.vue'
import JobsIndex from './views/jobs/JobsIndex.vue'
import ShowJob from './views/jobs/ShowJob.vue'
import Login from './views/Login.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/jobs'
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
      component: JobsIndex,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs/new',
      name: 'new job',
      component: NewJob,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs/:id',
      name: 'show job',
      component: ShowJob,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => beforeLoginEnter(to, from, next)
    }
  ]
})

export function beforeLoginEnter (to, from, next) {
  if (store.getters.isLoggedIn) {
    next('/jobs')
  } else {
    next()
  }
}

export function beforeEach (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => beforeEach(to, from, next))

export default router

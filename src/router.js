import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

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
      path: '/jobs',
      name: 'jobs index',
      component: import(/* webpackChunkName: "contractor" */ './views/jobs/JobsIndex.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs/new',
      name: 'new job',
      component: import(/* webpackChunkName: "contractor" */ './views/jobs/NewJob.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs/:id',
      name: 'show job',
      component: () => import(/* webpackChunkName: "show_job" */ './views/jobs/ShowJob.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/expired',
      name: 'expired token',
      component: () => import(/* webpackChunkName: "expired" */ './views/subcontractor/ExpiredToken.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: import(/* webpackChunkName: "contractor" */ './views/Login.vue'),
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

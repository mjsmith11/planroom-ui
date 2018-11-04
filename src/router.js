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
      component: require(/* webpackChunkName: "contractor" */ './views/jobs/JobsIndex.vue').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs/new',
      name: 'new job',
      component: require(/* webpackChunkName: "contractor" */ './views/jobs/NewJob.vue').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs/:id',
      name: 'show job',
      component: () => require(/* webpackChunkName: "show_job" */ './views/jobs/ShowJob.vue').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/expired',
      name: 'expired token',
      component: () => require(/* webpackChunkName: "expired" */ './views/subcontractor/ExpiredToken.vue').default
    },
    {
      path: '/login',
      name: 'login',
      component: require(/* webpackChunkName: "contractor" */ './views/Login.vue').default,
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
  if (to.query.token !== undefined) {
    store.dispatch('subcontractorToken', to.query.token)
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    if (store.getters.isContractorUser) {
      next('/login')
    } else {
      next('/expired')
    }
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => beforeEach(to, from, next))

export default router

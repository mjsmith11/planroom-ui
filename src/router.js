import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const Login = resolve => {
  require.ensure(['./views/Login.vue'], () => {
    resolve(require('./views/Login.vue'))
  }, 'contractor')
}

const JobsIndex = resolve => {
  require.ensure(['./views/jobs/JobsIndex.vue'], () => {
    resolve(require('./views/jobs/JobsIndex.vue'))
  }, 'contractor')
}

const NewJob = resolve => {
  require.ensure(['./views/jobs/NewJob.vue'], () => {
    resolve(require('./views/jobs/NewJob.vue'))
  }, 'contractor')
}

const ShowJob = resolve => {
  require.ensure(['./views/jobs/ShowJob.vue'], () => {
    resolve(require('./views/jobs/ShowJob.vue'))
  }, 'show_job')
}

const Invite = resolve => {
  require.ensure(['./views/jobs/Invite.vue'], () => {
    resolve(require('./views/jobs/Invite.vue'))
  }, 'contractor')
}

const ExpiredToken = resolve => {
  require.ensure(['./views/subcontractor/ExpiredToken.vue'], () => {
    resolve(require('./views/subcontractor/ExpiredToken.vue'))
  }, 'expired')
}

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
      path: '/jobs/:id/invite',
      name: 'job invite',
      component: Invite,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/expired',
      name: 'expired token',
      component: ExpiredToken
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
  if (to.query !== undefined && to.query.token !== undefined) {
    store.dispatch('subcontractorToken', to.query.token)
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if (store.getters.isContractorUser) {
        // logged in contractor
        next()
      } else {
        if (to.path !== '/jobs/' + store.getters.job) {
          // logged in subcontractor who has wrong path
          next('/jobs/' + store.getters.job)
        } else {
          // logged in subcontractor with correct path
          next()
        }
      }
      return
    }
    if (store.getters.isContractorUser) {
      // Contractor user not logged in
      next('/login')
    } else {
      // Subcontractor not logged in
      next('/expired')
    }
  } else {
    // route doesn't require authentication
    next()
  }
}

router.beforeEach((to, from, next) => beforeEach(to, from, next))

export default router

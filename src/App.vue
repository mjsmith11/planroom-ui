<template>
  <div id="app">
  <nav class="navbar navbar-expand-lg navbar-dark">
    <router-link :to="brandLink" class="navbar-brand" tag="a">
      Planroom
    </router-link>
    <button v-if="$store.getters.isLoggedIn" class="navbar-toggler" type="button" @click = "showNav = !showNav" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div v-if="$store.getters.isLoggedIn" :class="{show: showNav}" class="collapse navbar-collapse"  id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class = "{ active: onListRoute }">
          <router-link to='/jobs' class="nav-link" tag="a">
            Job List
          </router-link>
        </li>
        <li class="nav-item" :class = "{ active: onNewRoute }">
          <router-link to='/jobs/new' class="nav-link" tag="a">
            New Job
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <div class="nav-link" id = 'logout-link' @click="logout">Logout</div>
        </li>
      </ul>
    </div>
  </nav>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      showNav: false
    }
  },
  computed: {
    brandLink () {
      if (this.$store.getters.isLoggedIn) {
        return '/jobs'
      } else {
        return '/login'
      }
    },
    onListRoute () {
      return this.$route.name === 'jobs index'
    },
    onNewRoute () {
      return this.$route.name === 'new job'
    }
  },
  created () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style>
nav{
  margin-bottom: 25px;
  background-color: #101063;
}
img {
  height: 50px;
}
div.nav-link {
  cursor: pointer;
}
</style>

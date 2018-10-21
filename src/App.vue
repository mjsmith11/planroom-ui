<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  created () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

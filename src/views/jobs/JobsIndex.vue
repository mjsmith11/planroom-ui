<template>
<div class="container">
    <div class="col-xs-12 col-sm-10 col-md-8 offset-md-2 offset-sm-1">
        <h1>Jobs</h1>
        <div class="list-group">
            <job-item v-for="job in jobs" :job="job" :key="job.id"></job-item>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import JobItem from '../../components/jobs/ListItem.vue'
export default {
  data () {
    return {
      jobs: []
    }
  },
  components: {
    JobItem
  },
  created () {
    axios.get('/jobs')
      .then(res => {
        console.log(res)
        this.jobs = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>

</style>

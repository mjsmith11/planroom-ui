<template>
    <div class="lister">
      <h4>Plans</h4>
      <ul>
        <li v-for="plan in plans" :key="plan.key"><a :href="plan.url">{{ plan.key | removeDir }}</a></li>
      </ul>
    </div>
</template>
<script>
import { EventBus } from '../../event-bus.js'
import axios from 'axios'
export default {
  data () {
    return {
      plans: []
    }
  },
  methods: {
    loadList () {
      axios.get('/jobs/' + this.jobId + '/plans')
        .then(res => {
          this.plans = res.data
        })
        // eslint-disable-next-line
        .catch(err => {
          // console.log(err)
        })
    }
  },
  props: [
    'jobId'
  ],
  filters: {
    removeDir (value) {
      var splits = value.split('/')
      splits.splice(0, 1)
      return splits.join('/')
    }
  },
  created () {
    // setTimeout(this.loadList, 1000)
    EventBus.$on('job-read', () => {
      this.$nextTick(this.loadList)
    })
    EventBus.$on('file-uploaded', this.loadList)
  }
}
</script>
<style>
  .lister {
    width: 100%;
    margin-top: 25px;
  }
</style>

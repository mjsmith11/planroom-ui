<template>
    <div class="lister">
      <h4>Bidding Documents</h4>
      <ul :class="{listborder : plans.length > 0}">
        <li v-for="plan in plans" :key="plan.key"><a :href="plan.url" download>{{ plan.key | removeDir }}</a></li>
      </ul>
    </div>
</template>
<script>
import { EventBus } from '../../event-bus.js'
import axios from 'axios'
export default {
  data () {
    return {
      plans: [],
      refresher: ''
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
      this.refresher = setInterval(this.loadList, 14 * 60 * 1000) // every 14 minutes
    })
    EventBus.$on('file-uploaded', this.loadList)
  },
  beforeDestroy () {
    clearInterval(this.refresher)
    this.refresher = ''
  }
}
</script>
<style scoped>
  .lister {
    margin-top: 25px;
    width: 100%
  }
  ul {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .listborder {
    border: 2px solid #e4e4e4;
  }
  h4 {
    font-style: italic;
    font-weight: 600;
  }
</style>

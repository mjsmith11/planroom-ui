<template>
    <router-link :to="link" class="list-group-item-action list-group-item" :class="{'list-group-item-dark': inPast, 'list-group-item-light': !inPast}">
        <div class="row">
            <div class="col-lg-9 col-xl-10">{{job.name}}</div>
            <!--Display div only on large a bigger viewport-->
            <div class="col-lg-3 col-xl-2 d-none d-lg-block"><strong>{{ job.bidDate | date }}</strong></div>
        </div>
    </router-link>
</template>
<script>
import { datetimeFilters } from '../../mixins/datetimeFilters'
export default {
  mixins: [datetimeFilters],
  props: {
    job: Object
  },
  computed: {
    inPast () {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0)
      const pieces = this.job.bidDate.split('-')
      const utc = Date.UTC(pieces[0], pieces[1] - 1, pieces[2], 0, 0, 0, 0)
      return utc < todayUTC
    },
    link () {
      return 'jobs/' + this.job.id
    }
  }
}
</script>
<style scoped>
  .list-group-item-light {
    color: #606060;
  }
</style>

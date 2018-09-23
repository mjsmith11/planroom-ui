<template>
  <div class="container">
    <div class="col-xs-12 col-sm-10 col-md-8 offset-md-2 offset-sm-1 column">
        <h1>{{ job.name }}</h1>
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-12 column">
            <div class="card">
              <h5 class="card-header">Bid</h5>
              <div class="card-body">
                <div class="card-text">
                  <h6><strong>Date:</strong></h6>
                  <div>{{ bidDate }}</div>
                  <br>
                  <h6><strong>Email:</strong></h6>
                  <div>{{ job.bidEmail }}</div>
                  <br>
                  <h6><strong>Due To Benchmark:</strong></h6>
                  <div>{{ bidsDue }}</div>
                  <div>{{ bidsDueCentral }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 column">
            <div class="card">
              <div class="card-header">Prebid</div>
              <div class="card-body">
                <div class="card-text">
                  <h6><strong>Date &amp; Time:</strong></h6>
                  <div>{{ prebid }}</div>
                  <div>{{ prebidCentral }}</div>
                  <br>
                  <h6><strong>Address</strong></h6>
                  <div>{{ job.prebidAddress }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 column">
            <div class="card">
              <div class="card-header">Details</div>
                <div class="card-body">
                  <div class="card-text">
                    <h6><strong>Taxable</strong></h6>
                    <div>{{ TFtoYN(job.taxible)}}</div>
                    <br>
                    <h6><strong>Bonding</strong></h6>
                    <div>{{ TFtoYN(job.bonding)}}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
export default {
  data () {
    return {
      job: {}
    }
  },
  methods: {
    TFtoYN (value) {
      if (value !== 1 && value !== 0) {
        return ''
      }
      return value ? 'Yes' : 'No'
    }
  },
  computed: {
    bidDate () {
      if (this.job.bidDate === undefined) {
        return ''
      }
      return moment.utc(this.job.bidDate, 'YYYY-MM-DD').format('MM/DD/YYYY')
    },
    bidsDue () {
      if (this.job.subcontractorBidsDue === undefined) {
        return ''
      }
      return moment.utc(this.job.subcontractorBidsDue, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY hh:mm A') + ' EST'
    },
    bidsDueCentral () {
      if (this.job.subcontractorBidsDue === undefined) {
        return ''
      }
      return moment.utc(this.job.subcontractorBidsDue, 'YYYY-MM-DD HH:mm:ss').subtract({'hours': 1}).format('MM/DD/YYYY hh:mm A') + ' CST'
    },
    prebid () {
      if (this.job.prebidDateTime === undefined) {
        return ''
      }
      return moment.utc(this.job.prebidDateTime, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY hh:mm A') + ' EST'
    },
    prebidCentral () {
      if (this.job.prebidDateTime === undefined) {
        return ''
      }
      return moment.utc(this.job.prebidDateTime, 'YYYY-MM-DD HH:mm:ss').subtract({'hours': 1}).format('MM/DD/YYYY hh:mm A') + ' CST'
    }

  },
  created () {
    axios.get('/jobs/' + this.$route.params.id)
      .then(res => {
        this.job = res.data
        console.log(this.job)
      })
      // eslint-disable-next-line
      .catch(err => {
        // console.log(err)
      })
  }
}
</script>
<style scoped>
  div.column {
    padding: 3px;
  }
  .card {
    height: 100%;
  }
</style>

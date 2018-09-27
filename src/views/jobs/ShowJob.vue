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
                  <div>{{ job.bidDate | date }}</div>
                  <br>
                  <h6><strong>Email:</strong></h6>
                  <div>{{ job.bidEmail }}</div>
                  <br>
                  <h6><strong>Due To Benchmark:</strong></h6>
                  <div>{{ job.subcontractorBidsDue | datetime }}</div>
                  <div>{{ job.subcontractorBidsDue | datetimeCentral }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 column">
            <div class="card">
              <h5 class="card-header">Prebid</h5>
              <div class="card-body">
                <div class="card-text">
                  <h6><strong>Date &amp; Time:</strong></h6>
                  <div>{{ job.prebidDateTime | datetime }}</div>
                  <div>{{ job.prebidDateTime | datetimeCentral }}</div>
                  <br>
                  <h6><strong>Address</strong></h6>
                  <div>{{ job.prebidAddress }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 column">
            <div class="card">
              <h5 class="card-header">Details</h5>
                <div class="card-body">
                  <div class="card-text">
                    <h6><strong>Taxable</strong></h6>
                    <div>{{ job.taxible | TFtoYN}}</div>
                    <br>
                    <h6><strong>Subcontractor Bonding</strong></h6>
                    <div>{{ job.bonding | TFtoYN }}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { datetimeFilters } from '../../mixins/datetimeFilters'
import axios from 'axios'
export default {
  data () {
    return {
      job: {}
    }
  },
  mixins: [datetimeFilters],
  filters: {
    TFtoYN (value) {
      if (value !== 1 && value !== 0) {
        return ''
      }
      return value ? 'Yes' : 'No'
    }
  },
  created () {
    axios.get('/jobs/' + this.$route.params.id)
      .then(res => {
        this.job = res.data
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

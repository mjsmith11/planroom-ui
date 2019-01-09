<template>
<div>
  <logo-header v-if="!$store.getters.isContractorUser"></logo-header>
  <div class="container">
    <div class="col-xs-12 col-sm-10 col-md-8 offset-md-2 offset-sm-1 column">
        <h1>{{ job.name }}</h1>
        <h6 v-if="!$store.getters.isContractorUser" class="expiration">You can access this job unitl {{ $store.getters.exp | unixDatetime | datetime }} </h6>
        <router-link v-else :to="'/jobs/' + this.$route.params.id + '/invite'" tag="button" class="btn btn-outline-primary btn-sm btn-invite">Invite Subcontractors</router-link>
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
                  <div> <a :href="'mailto:'+job.bidEmail">{{ job.bidEmail }}</a> </div>
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
        <div class="row">
          <plan-lister :job-id = job.id></plan-lister>
        </div>
        <div class="row" v-if="$store.getters.isContractorUser">
          <uploader :jobId = job.id></uploader>
        </div>
    </div>
    <contact-info v-if="!$store.getters.isContractorUser"></contact-info>
  </div>
</div>
</template>
<script>
import { datetimeFilters } from '../../mixins/datetimeFilters'
import uploader from '../../components/plans/Uploader'
import lister from '../../components/plans/Lister'
import axios from 'axios'
import { EventBus } from '../../event-bus.js'
import LogoHeader from '../../components/LogoHeader'
import ContactInfo from '../../components/ContactInfo'
export default {
  data () {
    return {
      job: {}
    }
  },
  components: {
    uploader: uploader,
    planLister: lister,
    logoHeader: LogoHeader,
    contactInfo: ContactInfo
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
        EventBus.$emit('job-read')
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
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19);
  }
  h1 {
    font-style: italic;
    font-weight: 600;
  }
  .expiration {
    font-style: italic;
    font-size: 0.85em;
    color: #b0b0b0;
  }
  .btn-invite{
    margin-bottom: 15px;
  }
</style>

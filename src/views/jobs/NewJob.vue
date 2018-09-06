<template>
  <div class="container">
    <h1>Add a new Job</h1>
    <form action="">
        <div class="form-group">
            <label for="jobName">Name</label>
            <input
                type="text"
                class="form-control"
                id="jobName"
                placeholder="Job Name"
                maxlength="75">
        </div>
        <div class="form-group">
            <label for="bidDate">Bid Date</label>
            <input
                type="date"
                class="form-control"
                id="bidDate">
        </div>
        <div class="form-group">
            <label for="subcontractorBidsDue">Subcontractor Bid Deadline</label>
            <input
                type="datetime-local"
                class="form-control"
                id="subcontractorBidsDue">
        </div>
        <div class="form-group">
            <label for="prebid">Prebid</label>
            <input
                type="datetime-local"
                class="form-control"
                id="prebid">
        </div>
        <div class="form-group">
            <label for="prebidAddress">Prebid Address</label>
            <vue-google-autocomplete
                id="prebidAddress"
                classname="form-control"
                placeholder="Prebid Address"
                v-on:placechanged="getAddressData"
                country="us"
            >
            </vue-google-autocomplete>
        </div>
    </form>
  </div>
</template>
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: {VueGoogleAutocomplete},
  data () {
    return {
      address: ''
    }
  },
  methods: {
    /**
    * When the location found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData (addressData, placeResultData, id) {
      this.address = addressData
    }
  }
}
</script>

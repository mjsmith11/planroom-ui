<template>
  <div class="container">
    <div class="col-xs-12 col-sm-8 col-md-6 offset-md-3 offset-sm-2">
      <h1>Add a new Job</h1>
    </div>
    <form action="" novalidate="">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 offset-md-3 offset-sm-2">
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
                  country="us">
              </vue-google-autocomplete>
          </div>
          <div class="form-group">
              <label for="bidEmail">Bid Email</label>
              <input
                  type="email"
                  class="form-control"
                  id="bidEmail"
                  placeholder="Bid Email"
                  maxlength="100">
          </div>
          <div id="checkboxes">
            <div class="form-check form-check-inline">
                <input
                    type="checkbox"
                    class="form-check-input"
                    id="bonding">
                  <label for="bonding" class="form-check-label">Bonding</label>
            </div>
            <div class="form-check form-check-inline">
                <input
                    type="checkbox"
                    class="form-check-input"
                    id="taxible">
                <label for="taxible" class="form-check-label">Taxible</label>
            </div>
          </div>
          <button class="btn btn-outline-success" type="submit">Add Job</button>
        </div>
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
      addressObj: ''
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
      this.addressObj = addressData
      console.log(this.addressObj)
    }
  }
}
</script>

<style scoped>
  input:invalid {
    border: 2px solid red;
    background-color: pink;
  }
  button {
    margin-top: 30px;
    width: 100%;
  }
</style>

<template>
  <div class="container">
    <div class="col-xs-12 col-sm-8 col-md-6 offset-md-3 offset-sm-2">
      <h1>Add a new Job</h1>
    </div>
    <form action="">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 offset-md-3 offset-sm-2">
          <div class="form-group" :class="{invalid: $v.name.$error}">
              <label for="jobName">Name</label>
              <input
                  type="text"
                  class="form-control"
                  id="jobName"
                  placeholder="Job Name"
                  maxlength="75"
                  v-model="name"
                  @blur="$v.name.$touch()">
          </div>
          <div class="form-group" :class="{invalid: $v.bidDate.$error}">
              <label for="bidDate">Bid Date</label>
              <input
                  type="date"
                  class="form-control"
                  id="bidDate"
                  v-model="bidDate"
                  @blur="$v.bidDate.$touch()">
          </div>
          <div class="form-group" :class="{invalid: $v.bidsDue.$error}">
              <label for="subcontractorBidsDue">Subcontractor Bid Deadline</label>
              <input
                  type="datetime-local"
                  class="form-control"
                  id="subcontractorBidsDue"
                  v-model="bidsDue"
                  @blur="$v.bidsDue.$touch()">
          </div>
          <div class="form-group">
              <label for="prebid">Prebid</label>
              <input
                  type="datetime-local"
                  class="form-control"
                  id="prebid"
                  v-model="prebid">
          </div>
          <div class="form-group" :class="{invalid: $v.addressStr.$error}">
              <label for="prebidAddress">Prebid Address</label>
              <vue-google-autocomplete
                  id="prebidAddress"
                  classname="form-control"
                  placeholder="Prebid Address"
                  @placechanged="getAddressData"
                  country="us">
              </vue-google-autocomplete>
          </div>
          <div class="form-group" :class="{invalid: $v.bidEmail.$error}">
              <label for="bidEmail">Bid Email</label>
              <input
                  type="email"
                  class="form-control"
                  id="bidEmail"
                  placeholder="Bid Email"
                  maxlength="100"
                  v-model="bidEmail"
                  @blur="$v.bidEmail.$touch()">
          </div>
          <div id="checkboxes">
            <div class="form-check form-check-inline">
                <input
                    type="checkbox"
                    class="form-check-input"
                    id="bonding"
                    v-model="bonding">
                  <label for="bonding" class="form-check-label">Bonding</label>
            </div>
            <div class="form-check form-check-inline">
                <input
                    type="checkbox"
                    class="form-check-input"
                    id="taxible"
                    v-model="taxible">
                <label for="taxible" class="form-check-label">Taxible</label>
            </div>
          </div>
          <button class="btn btn-outline-success" :disabled="$v.$invalid" type="submit">Add Job</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { required, email, maxLength } from 'vuelidate/lib/validators'
export default {
  components: {VueGoogleAutocomplete},
  data () {
    return {
      addressObj: '',
      name: '',
      bidDate: '',
      bidsDue: '',
      prebid: '',
      addressStr: '',
      bidEmail: '',
      bonding: false,
      taxible: false
    }
  },
  validations: {
    name: {
      required,
      maxLen: maxLength(75)
    },
    bidDate: {
      required
    },
    bidsDue: {
      required
    },
    prebid: {
      required
    },
    addressStr: {
      required,
      maxLen: maxLength(150)
    },
    bidEmail: {
      email,
      maxLen: maxLength(100)
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
      this.addressStr = this.addressObj.street_number
      this.addressStr += '^' + this.addressObj.route
      this.addressStr += '^' + this.addressObj.locality
      this.addressStr += '^' + this.addressObj.administrative_area_level_1
      this.addressStr += '^' + this.addressObj.postal_code
      this.$v.addressStr.$touch()
    }
  }
}
</script>

<style scoped>
  .form-group.invalid input {
    border: 1px solid red;
    background-color: #ffcece;
  }
  .form-group.invalid label {
    color: red;
  }
  button {
    margin-top: 30px;
    width: 100%;
  }
</style>

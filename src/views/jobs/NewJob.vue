<template>
  <div class="container">
    <div class="col-xs-12 col-sm-8 col-md-6 offset-md-3 offset-sm-2">
      <h1>Add a new Job</h1>
      <div class="alert alert-danger" role="alert" v-if="axiosFailure">Failed to add Job</div>
    </div>
    <form @submit.prevent = "onSubmit">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 offset-md-3 offset-sm-2">
          <div class="form-group" :class="{invalid: $v.name.$error}" id="jobNameGroup">
              <label for="jobName">Name</label>
              <input type="text"
                  class="form-control"
                  id="jobName"
                  placeholder="Job Name"
                  maxlength="75"
                  v-model="name"
                  @blur="$v.name.$touch()">
          </div>
          <div class="form-group" :class="{invalid: $v.bidDate.$error}" id="bidDateGroup">
              <label for="bidDate">Bid Date</label>
              <input
                  type="date"
                  class="form-control"
                  id="bidDate"
                  v-model="bidDate"
                  @blur="$v.bidDate.$touch()">
          </div>
          <div class="form-group" :class="{invalid: $v.prebid.$error}" id="prebidGroup">
              <label for="prebid">Prebid (EST)</label>
              <input
                  type="datetime-local"
                  class="form-control"
                  id="prebid"
                  v-model="prebid"
                  @blur="$v.prebid.$touch()">
          </div>
          <div class="form-group" :class="{invalid: $v.addressStr.$error}" id="prebidAddressGroup">
              <label for="prebidAddress">Prebid Address</label>
              <vue-google-autocomplete
                  id="prebidAddress"
                  classname="form-control"
                  placeholder="Prebid Address"
                  @change="onAddressChange"
                  country="us"
                  ref="addressControl">
              </vue-google-autocomplete>
          </div>
          <div class="form-group" :class="{invalid: $v.bidsDue.$error}" id="subcontractorBidsDueGroup">
              <label for="subcontractorBidsDue">Subcontractor Bids Due to Benchmark (EST)</label>
              <input
                  type="datetime-local"
                  class="form-control"
                  id="subcontractorBidsDue"
                  v-model="bidsDue"
                  @blur="$v.bidsDue.$touch()">
          </div>
          <div class="form-group" :class="{invalid: $v.bidEmail.$error}" id="bidEmailGroup">
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
import axios from 'axios'

export default {
  components: {VueGoogleAutocomplete},
  data () {
    return {
      name: '',
      bidDate: '',
      bidsDue: '',
      prebid: '',
      addressStr: '',
      bidEmail: '',
      bonding: false,
      taxible: false,
      axiosFailure: false,
      addressControl: ''
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
      maxLen: maxLength(100),
      required
    }
  },
  methods: {
    onAddressChange (text) {
      this.addressStr = text
      this.$v.addressStr.$touch()
    },
    onSubmit () {
      this.axiosFailure = false
      const formData = {
        name: this.name,
        bidDate: this.bidDate,
        subcontractorBidsDue: this.bidsDue,
        prebidDateTime: this.prebid,
        prebidAddress: this.addressStr,
        bidEmail: this.bidEmail,
        bonding: this.bonding,
        taxible: this.taxible
      }
      axios.post('/jobs', formData)
        .then(res => {
          this.clearForm()
          this.$router.push('/jobs/' + res.data.id)
        })
        // eslint-disable-next-line
        .catch(error => {
          this.axiosFailure = true
        })
    },
    clearForm () {
      this.name = ''
      this.bidDate = ''
      this.bidsDue = ''
      this.prebid = ''
      this.addressStr = ''
      this.$refs.addressControl.update('')
      this.bidEmail = ''
      this.bonding = false
      this.taxible = false
      this.$v.$reset()
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
  #checkboxes {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

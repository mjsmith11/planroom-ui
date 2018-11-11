<template>
    <div class="container">
        <h1>{{ job.name }}</h1>
        <h3>Subcontractor Invitations</h3>
        <div class="row" id="content">
            <div class="col-md-6 col-sm-12" id="left">
                <form @submit.prevent = "addEmail" class="">
                    <div class="form-group form-inline" :class="{invalid: emailInvalid}" id="formEmailGroup">
                        <label for="formEmail" class="hide">Email</label>
                        <div class="col-md-8 col-sm-12" id="emailInputDiv">
                        <input
                            type="email"
                            class="form-control"
                            id="formEmail"
                            placeholder="Email"
                            maxlength="100"
                            v-model="formEmail"
                            @blur="$v.formEmail.$touch()"
                        >
                        </div>
                        <div class="col-md-4 col-sm-12" id="addButtonDiv">
                        <button class="btn btn-outline-primary" id="addButton" type="submit" :disabled="$v.formEmail.$invalid">Add</button>
                        </div>
                    </div>
                    <div class="form-group" id="validDaysGroup">
                        <label for="validDays">Days Until Link Expiration</label>
                        <input
                            type="number"
                            class="form-control"
                            id="validDays"
                            v-model="validDays"
                            min = "1"
                            max = "99"
                        >
                    </div>
                    <button class="btn btn-outline-success float-right" id="sendButton" @click="sendEmails" :disabled = "sendEmailsDisabled">Send Emails</button>
                </form>
                <div v-if="sending" class="working float-right">
                  <img src="../../assets/working.gif" alt="Working" class="src">
                  Sending... Please do not navigate away from this page.
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
               <ul class="list-group">
                   <li v-for = "(email, index) in addresses" :key="index" class="list-group-item">{{ email }}<span class="delete float-right" @click="deleteEmail(index)"><font-awesome-icon icon="trash-alt" /></span></li>
               </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { required, email, maxLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      job: {},
      formEmail: '',
      validDays: 3,
      addresses: [],
      sending: false
    }
  },
  methods: {
    deleteEmail (index) {
      this.addresses.splice(index, 1)
    },
    addEmail () {
      if (!this.$v.formEmail.$invalid) {
        this.addresses.push(this.formEmail)
        this.formEmail = ''
        this.$v.$reset()
      }
    },
    sendEmails () {
      this.sending = true
      const postData = {
        emails: this.addresses,
        validDays: this.validDays
      }
      const postUrl = '/jobs/' + this.$route.params.id + '/invite'
      axios.post(postUrl, postData)
        .then(res => {
          this.sending = false
          console.log('success')
        })
        // eslint-disable-next-line
        .catch(error => {
          this.sending = false
          console.log('failure')
        })
    }
  },
  computed: {
    sendEmailsDisabled () {
      return ((this.addresses.length === 0) || (this.formEmail !== '')) || this.sending
    },
    emailInvalid () {
      return (this.$v.formEmail.$error) && (this.formEmail !== '')
    },
    addEmailDisabled () {
      return (this.$v.formEmail.$invalid) || this.sending
    }
  },
  validations: {
    formEmail: {
      email,
      maxLen: maxLength(100),
      required
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
  h1,h3 {
    font-style: italic;
    font-weight: 600;
  }
  .form-group.invalid input {
    border: 1px solid red;
    background-color: #ffcece;
  }
  .form-group.invalid label {
    color: red;
  }
  label.hide {
      display: none;
  }
  #content {
      margin-top: 30px;
  }
  #formEmailGroup {
      width: 100%;
  }
  #formEmail {
      width: 100%;
      margin-bottom: 5px;
  }
  #addButton {
      width: 100%;
      margin-bottom: 5px;
  }
  @media (min-width: 768px) {
    #emailInputDiv {
        padding: 0px 4px 0px 0px;
    }
    #addButtonDiv {
        padding: 0px 0px 0px 4px;
    }
  }
  #validDaysGroup {
      margin-top: 60px;
  }
  #sendButton {
      width: 33%;
  }
  #left {
      padding-bottom: 40px;
  }
  .delete {
      cursor: pointer;
  }

</style>

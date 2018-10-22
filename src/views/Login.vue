<template>
    <div class="container">
        <div class="col-xs-10 col-sm-8 col-md-6 offset-md-3 offset-sm-2 offset-xs-1 column">
            <div class="card">
                <h4 class="card-header">Login</h4>
                <div class="card-body">
                    <div class="alert alert-danger" role="alert" v-if="loginFailure">Login Failed</div>
                    <form @submit.prevent = "login">
                        <div class="form-group">
                            <input type="email"
                                class="form-control"
                                id="email"
                                placeholder="Email"
                                maxlength="50"
                                v-model="email"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <input type="password"
                                class="form-control"
                                id="password"
                                placeholder="Password"
                                maxlength="50"
                                v-model="password"
                                required
                            >
                        </div>
                        <button class="btn btn-outline-success" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      loginFailure: false
    }
  },
  methods: {
    login () {
      this.loginFailure = false
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('/jobs'))
        .catch(() => {
          this.loginFailure = true
        })
    }
  }

}
</script>

<style scoped>
  div.column {
    padding-top: 30px;
  }
button {
    width: 100%;
  }
  .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>

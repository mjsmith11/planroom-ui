<template>
    <div class='uploader'>
      <h4>Add Bidding Documents</h4>
      <div class="alert alert-danger" v-if="uploadProblem">
        <strong>Warning!</strong> One or more documents failed to upload
      </div>
      <vue-dropzone
        :awss3="awss3"
        v-on:vdropzone-s3-upload-error="s3UploadError"
        v-on:vdropzone-s3-upload-success="s3UploadSuccess"
        id=''
        :options='dzOpts'
        >
      </vue-dropzone>
    </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { EventBus } from '../../event-bus.js'
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      awss3: {
        signingURL: this.getUrl,
        headers: {'Planroom-Authorization': 'Bearer ' + this.$store.getters.token},
        params: {},
        sendFileToServer: false,
        withCredentials: false
      },
      dzOpts: {
        url: '',
        maxFilesize: 1024,
        timeout: 15 * 60 * 1000 // 15 minutes
      },
      uploadProblem: false
    }
  },
  methods: {
    s3UploadError (errorMessage) {
      this.uploadProblem = true
    },
    s3UploadSuccess (s3ObjectLocation) {
      EventBus.$emit('file-uploaded')
    },
    getUrl (file) {
      return process.env.VUE_APP_API_URL + '/jobs/' + this.jobId + '/plans?filename=' + file.name
    }
  },
  props: {
    jobId: Number
  }
}
</script>
<style>
  .uploader {
    width: 100%;
    margin-top: 25px;
  }
</style>

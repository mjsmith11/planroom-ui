<template>
<div class="container">
    <div class="col-xs-12 col-sm-8 col-md-6 offset-md-3 offset-sm-2">
        <h1>Jobs</h1>
        <div class="list-group">
            <job-item></job-item>
            <job-item></job-item>
        </div>
    </div>
</div>
</template>
<script>
import JobItem from '../../components/jobs/ListItem.vue'
export default {
  components: {
    JobItem
  }
}
</script>
<style scoped>

</style>

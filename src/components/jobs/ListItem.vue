<template>
    <a href="#" class="list-group-item-action list-group-item" :class="{'list-group-item-dark': inPast, 'list-group-item-light': !inPast}">
        <div class="row">
            <div class="col-lg-9 col-xl-10">{{job.name}}</div>
            <!--Display div only on large a bigger viewport-->
            <div class="col-lg-3 col-xl-2 d-none d-lg-block"><strong>{{date.toLocaleDateString("en-US")}}</strong></div>
        </div>
    </a>
</template>
<script>
export default {
  props: {
    job: Object
  },
  computed: {
    date () {
      var parts = this.job.bidDate.split('-')
      return new Date(parts[0], parts[1] - 1, parts[2]) // months are 0 based
    },
    inPast () {
      var today = new Date()
      return this.date < today
    }
  }
}
</script>
<style scoped>
  .list-group-item-light {
    color: #606060;
  }
</style>

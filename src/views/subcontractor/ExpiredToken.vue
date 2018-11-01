<template>
    <div class="container">
        <logo-header></logo-header>
        <div class="card message">
            <div class="card-body">
                <div class="card-text">
                    We're sorry. Your link has expired. Please contact our office if you still require access.
                </div>
              </div>
        </div>
        <contact-info></contact-info>
    </div>
</template>
<script>
import LogoHeader from '../../components/LogoHeader'
import ContactInfo from '../../components/ContactInfo'
export default {
  components: {
    logoHeader: LogoHeader,
    contactInfo: ContactInfo
  }
}
</script>
<style scoped>
    .message{
        width: 60%;
        margin: auto;
        text-align: center;
    }
</style>

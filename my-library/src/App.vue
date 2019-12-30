<template>
  <v-app>
    <top-nav />
    <v-content class="mx-5">
      <router-view></router-view>
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>
import TopNav from './components/TopNav'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    'top-nav': TopNav,
    'bottom-footer': Footer
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.theme--light.v-application {
  background: #F5F5F5
}

</style>

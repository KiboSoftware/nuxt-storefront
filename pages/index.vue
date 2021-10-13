<template>
  <!-- <div>
    <h1>Kibo Commerce</h1>
    <button @click="showMessageFromBackend">Show message from backend</button>
  </div>
   -->
  <div>
    <TopBar />
    <AppHeader />
    <AppFooter />
    <BottomNavigation />
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader.vue"
import TopBar from "~/components/TopBar.vue"
import AppFooter from "~/components/AppFooter.vue"
import BottomNavigation from "~/components/BottomNavigation.vue"

export default {
  components: { AppHeader, TopBar, AppFooter, BottomNavigation },
  methods: {
    async showMessageFromBackend() {
      /* eslint-disable no-console */
      try {
        const response = await this.$axios.get("/customerLogin")
        console.log("customerLogin: ", response.data)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

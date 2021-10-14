<template>
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
}
</script>

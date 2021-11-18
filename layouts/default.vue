<template>
  <div>
    <AppHeaderCustom />
    <LoginModal />
    <div class="content">
      <Nuxt />
    </div>

    <AppFooter />
    <BottomNavigation />
  </div>
</template>

<style>
.content {
  max-width: 81.75rem;
  margin: 0 auto;
}
</style>

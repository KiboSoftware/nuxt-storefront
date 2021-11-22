<template>
  <div>
    <TopBar />
    <AppHeader />
    <LoginModal />
    <div class="content">
      <Nuxt />
    </div>

    <AppFooter />
    <BottomNavigation />
  </div>
</template>

<style>
html,
body {
  font-family: "Roboto", serif;
}
.content {
  max-width: 81.75rem;
  margin: 0 auto;
}
</style>

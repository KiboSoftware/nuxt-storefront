<template>
  <div>
    <KiboAppHeader />
    <LoginModal />
    <StoreLocatorModal />
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
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 400;
  margin: 0;
}

.content {
  max-width: 100vw;
}
</style>

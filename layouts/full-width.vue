<template>
  <div>
    <KiboAppData />
    <KiboAppHeader />
    <LoginModal />
    <StoreLocatorModal />
    <AddToCartConfirmationModal />
    <div>
      <Nuxt />
    </div>
    <AppFooter />
    <BottomNavigation />
  </div>
</template>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

html,
body {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 400;
  margin: 0;
}
</style>

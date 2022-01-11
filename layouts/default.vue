// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div>
    <KiboAppHeader />
    <LoginModal />
    <StoreLocatorModal />
    <AddToCartConfirmationModal />
    <div class="content">
      <Nuxt />
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss">
html,
body {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 400;
  margin: 0;
}

.content {
  width: 86.5%;
  margin: 0 auto;

  @include for-desktop {
    max-width: 88rem;
  }
}
</style>

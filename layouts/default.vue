<template>
  <div class="wrapper">
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
* {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 400;
}

.wrapper {
  width: 100%;
  margin: 0 auto;
  background-color: solid 1px white;
}

.content {
  width: 86.5%;
  margin: 0 auto;

  @include for-desktop {
    width: min(95vw, 81.75rem);
    max-width: 81.75rem;
  }
}
</style>

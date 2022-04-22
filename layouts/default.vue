<template>
  <div class="wrapper">
    <KiboAppData />
    <KiboAppHeader />
    <LoginModal />
    <ModalRoot />
    <AddToCartConfirmationModal />
    <div class="content">
      <Nuxt />
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss">
.wrapper {
  width: 100%;
  margin: 0 auto;
  background-color: white;
}

.content {
  width: 86.5%;
  margin: 0 auto;

  @include for-desktop {
    width: min(95vw, 81.75rem);
    max-width: 81.75rem;
  }
}

.no-scroll {
  overflow: hidden;
}
</style>

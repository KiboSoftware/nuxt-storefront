<template>
  <div class="wrapper">
    <KiboAppHeader />
    <KiboAppData />
    <BottomNavigation />
    <LoginModal />
    <ModalRoot />
    <AddToCartConfirmationModal />
    <AtcConfirmationSidebar />
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
    margin-top: 180px;
  }
}

.no-scroll {
  overflow: hidden;
}
</style>

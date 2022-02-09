<template>
  <div class="wrapper">
    <KiboAppData />
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
:root {
  @include generate-color-variants(--_c-green-primary, #2ea195);
  @include generate-color-variants(--_c-gray-primary, #7c7c7c);
  @include generate-color-variants(--_c-gray-middle, #cdcdcd);
  @include generate-color-variants(--_c-gray-shadow, rgba(14, 10, 10, 0.5));
  @include generate-color-variants(--c-black, #2b2b2b);
  @include generate-color-variants(--_c-white-secondary, #eaeaea);
}

// * {
//   font-family: "Roboto", sans-serif;
//   font-size: 1rem;
//   line-height: 1.25rem;
//   font-weight: 400;
// }

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
</style>

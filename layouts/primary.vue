<template>
  <div>
    <KiboAppHeader />
    <LoginModal />
    <!-- <StoreLocatorModal /> -->
    <AddToCartConfirmationModal />
    <div class="content">
      <Nuxt />
    </div>
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
  max-width: 88rem;
  margin: 0 auto 20 auto;
}
</style>

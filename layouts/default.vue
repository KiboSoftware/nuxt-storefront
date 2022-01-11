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
  margin: 0 auto;
}
</style>

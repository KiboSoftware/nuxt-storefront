<template>
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <nuxt-link to="/">
      <SfBottomNavigationItem
        :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''"
        icon="home"
        size="20px"
        label="Home"
        @click="isMobileMenuOpen ? toggleMobileMenu() : false"
      />
    </nuxt-link>
    <SfBottomNavigationItem icon="menu" size="20px" label="Menu" />
    <SfBottomNavigationItem icon="heart" size="20px" label="Wishlist" />
    <SfBottomNavigationItem icon="profile" size="20px" label="Account" />
    <SfBottomNavigationItem label="Basket" icon="add_to_cart">
      <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{ margin: '0 0 0 -2px' }"
          />
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from "@storefront-ui/vue"

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
  },
}
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
</style>

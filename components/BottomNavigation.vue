<template>
  <SfBottomNavigation
    class="navigation-bottom smartphone-only"
    v-if="!checkoutSteps.includes($route.path)"
  >
    <!-- <nuxt-link to="/">
      <SfBottomNavigationItem
        :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''"
        icon="home"
        size="20px"
        label="Home"
        @click="isMobileMenuOpen ? toggleMobileMenu() : false"
      />
    </nuxt-link> -->
    <SfBottomNavigationItem icon="menu" size="20px" label="Menu" @click="toggleMobileMenu" />
    <SfBottomNavigationItem icon="heart" size="20px" label="Wishlist" />
    <SfBottomNavigationItem
      icon="profile"
      size="20px"
      label="Account"
      @click="handleAccountClick"
    />
    <SfBottomNavigationItem
      label="Basket"
      icon="add_to_cart"
      @click="toggleAddToCartConfirmationModal"
    >
      <!-- Cart icon removed -->
      <!-- <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{ margin: '0 0 0 -2px' }"
          />
        </SfCircleIcon>
      </template> -->
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation } from "@storefront-ui/vue"
import { useUiState, useUser } from "@/composables"
import { userGetters } from "@/lib/getters"
import { useNuxtApp } from "#app"

export default {
  components: {
    SfBottomNavigation,
  },
  setup() {
    const {
      toggleMobileMenu,
      isMobileMenuOpen,
      toggleLoginModal,
      toggleAddToCartConfirmationModal,
    } = useUiState()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const { user } = useUser()

    const checkoutSteps = ["/Checkout", "/checkout"]

    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })

    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return app.router.push("/my-account")
      }
      toggleLoginModal()
    }

    return {
      checkoutSteps,
      isMobileMenuOpen,
      toggleMobileMenu,
      handleAccountClick,
      isAuthenticated,
      user,
      toggleAddToCartConfirmationModal,
    }
  },
}
</script>

<style lang="scss" scoped>
// .navigation-bottom {
//   --bottom-navigation-z-index: 3;
// }

.navigation-bottom {
  --bottom-navigation-z-index: 3;

  background: var(--c-black-darken);
  z-index: 9999;

  @include for-mobile {
    bottom: -2px;
  }

  ::v-deep .sf-bottom-navigation-item {
    padding: 0 0 var(--spacer-2xs) 0;

    &__label {
      color: var(--c-white);
    }

    .sf-button {
      --button-height: unset;
    }

    .sf-icon-path {
      --icon-color: var(--c-white);
    }
  }
}
</style>

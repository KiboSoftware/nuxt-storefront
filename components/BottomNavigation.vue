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
      <template #icon>
        <!-- <SfCircleIcon aria-label="Add to cart">
            <SfIcon
              icon="add_to_cart"
              color="white"
              size="25px"
              :style="{ margin: '0 0 0 -2px' }"
            />
          </SfCircleIcon> -->

        <div class="kibo-mobile__header-column" v-if="totalItemsInCart > 0">
          <SfIcon style="font-size: 1.1rem">
            <SfBadge class="sf-badge sf-badge--number-mobile kibo-mobile__item-count">{{
              totalItemsInCart
            }}</SfBadge>
            <font-awesome-icon icon="shopping-cart" class="fa-icon" color="var(--c-white)" />
          </SfIcon>
        </div>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfBadge } from "@storefront-ui/vue"
import { useUiState, useUser, useCart } from "@/composables"
import { userGetters, cartGetters } from "@/lib/getters"
import { useNuxtApp } from "#app"

export default {
  components: {
    SfBottomNavigation,
    SfBadge,
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

    const { cart } = useCart()

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

    const totalItemsInCart = computed(() => {
      const count = cartGetters.getCartTotalQuantity(cart.value)
      return count ? count.toString() : null
    })

    return {
      checkoutSteps,
      isMobileMenuOpen,
      toggleMobileMenu,
      handleAccountClick,
      isAuthenticated,
      user,
      toggleAddToCartConfirmationModal,
      totalItemsInCart,
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

.kibo-mobile {
  &__header-column {
    align-self: center;
    align-items: center;
    position: relative;
  }

  &__header-icon {
    z-index: 2;
  }

  &__item-count {
    --badge-min-width: var(--spacer-sm);
    --badge-min-height: var(--spacer-sm);

    justify-content: center;
    font-size: calc(var(--spacer-2xs) * 2.25);
    right: -13px;
    top: -7px;
    position: absolute;
    margin-top: 2px;
  }
}
</style>

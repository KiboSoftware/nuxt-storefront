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

    <SfBottomNavigationItem
      icon="profile"
      size="20px"
      label="Account"
      @click="handleAccountClick"
    />

    <SfBottomNavigationItem
      icon="heart"
      size="20px"
      label="Wishlist"
      @click="toggleWishlistSidebar"
    >
      <template #icon>
        <SfButton class="sf-button--pure sf-header__action" style="margin: 0 auto">
          <SfBadge
            v-if="totalItemsInWishlist > 0"
            class="sf-badge sf-badge--number-mobile kibo-mobile__item-count wishlist-count"
            >{{ totalItemsInWishlist }}</SfBadge
          >
          <SfIcon icon="heart" style="top: 2px; --icon-size: 1.4rem"> </SfIcon>
        </SfButton>
      </template>
    </SfBottomNavigationItem>

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
          <SfIcon icon="add_to_cart" style="top: 2px; --icon-size: 1.4rem"></SfIcon>
          <SfBadge class="sf-badge sf-badge--number-mobile kibo-mobile__item-count">{{
            totalItemsInCart
          }}</SfBadge>
          <!-- <font-awesome-icon icon="shopping-cart" class="fa-icon" color="var(--c-white)" /> -->
        </div>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfBadge, SfIcon } from "@storefront-ui/vue"
import { useUiState, useUser, useCart, useWishlist } from "@/composables"
import { userGetters, cartGetters, wishlistGetters } from "@/lib/getters"
import { useNuxtApp } from "#app"

export default {
  components: {
    SfBottomNavigation,
    SfBadge,
    SfIcon,
  },
  setup() {
    const {
      toggleMobileMenu,
      isMobileMenuOpen,
      toggleLoginModal,
      toggleAddToCartConfirmationModal,
      toggleWishlistSidebar,
    } = useUiState()

    const { currentWishlist } = useWishlist()
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

    const totalItemsInWishlist = computed(() =>
      wishlistGetters.getTotalItems(currentWishlist.value)
    )

    return {
      checkoutSteps,
      isMobileMenuOpen,
      toggleMobileMenu,
      handleAccountClick,
      isAuthenticated,
      user,
      toggleAddToCartConfirmationModal,
      totalItemsInCart,
      toggleWishlistSidebar,
      totalItemsInWishlist,
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
    top: -4px;
    position: absolute;
    margin-top: 2px;
  }
}

.wishlist-count {
  position: relative;
  top: 14px;
  z-index: 9;
  right: -17px;
}
</style>

<template>
  <div>
    <SfHeader class="sf-header--has-mobile-search" :class="{ 'header-on-top': isSearchOpen }">
      <template #logo>
        <nuxt-link :to="localePath('/')" class="sf-header__logo">
          <SfImage src="/icons/logo.svg" alt="Nuxt Storefront Next" class="sf-header__logo-image" />
        </nuxt-link>
      </template>
      <template #navigation>
        <HeaderNavigation :is-mobile="isMobile" />
      </template>
      <template #aside>
        <LocaleSelector class="smartphone-only" />
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            v-e2e="'app-header-account'"
            class="sf-button--pure sf-header__action"
            @click="handleStoreLocatorClick"
          >
            <SfIcon icon="marker_fill" size="1.25rem" />
            <div class="selected-store">
              <span style="font-size: 12px">{{ selectedLocation }}</span>
            </div>
          </SfButton>
          <SfButton
            v-e2e="'app-header-account'"
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>
          <SfButton class="sf-button--pure sf-header__action">
            <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
          </SfButton>
          <SfButton v-e2e="'app-header-cart'" class="sf-button--pure sf-header__action">
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
            <SfBadge v-if="totalItemsInCart" class="sf-badge--number sf-badge">{{
              totalItemsInCart
            }}</SfBadge>
          </SfButton>
        </div>
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfImage, SfIcon, SfBadge, SfButton } from "@storefront-ui/vue"
import { computed, ref, onBeforeUnmount } from "@vue/composition-api"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"

import debounce from "lodash.debounce"
import { useAsync } from "@nuxtjs/composition-api"
import useUiState from "../composables/useUiState"
import { usePurchaseLocation } from "../composables"
import HeaderNavigation from "./HeaderNavigation"
import LocaleSelector from "./LocaleSelector"
import { useUser } from "@/composables/useUser"
import { storeLocationGetters, userGetters } from "@/composables/getters"
import { useCart } from "@/composables/useCart"
import { userGetters, cartGetters } from "@/composables/getters"
import { useNuxtApp } from "#app"

export default defineComponent({
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfBadge,
    SfButton,
    HeaderNavigation,
  },
  directives: { clickOutside },
  // setup(props, { root }) {
  setup() {
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const { user, load: loadUser } = useUser()

    const { purchaseLocation, load: loadPurchaseLocation } = usePurchaseLocation()

    const isSearchOpen = ref(false)
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const result = ref(null)

    const accountIcon = computed(() => {
      return isAuthenticated.value ? "profile_fill" : "profile"
    })

    const { toggleLoginModal, toggleStoreLocatorModal } = useUiState()
    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue
      } else {
        term.value = paramValue.target.value
      }
      const searchSuggestions = await loadSearchSuggestions({
        term: term.value,
      })
      result.value = {
        products: searchSuggestions.value.products,
      }
    }, 1000)

    const isMobile = computed(() => mapMobileObserver().isMobile.get())

    const { cart, load: loadCart } = useCart()

    const totalItemsInCart = computed(() => {
      const count = cartGetters.getTotalItems(cart.value)
      return count ? count.toString() : null
    })
    const removeSearchResults = () => {
      result.value = null
    }

    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return app.router.push("/my-account")
      }
      toggleLoginModal()
    }

    useAsync(async () => {
      await loadUser()
      await loadCart()
      await loadPurchaseLocation()
    }, null)

    const handleStoreLocatorClick = () => {
      toggleStoreLocatorModal()
    }

    onBeforeUnmount(() => {
      unMapMobileObserver()
    })

    const selectedLocation = computed(() => {
      return Object.keys(purchaseLocation.value).length
        ? storeLocationGetters.getName(purchaseLocation.value)
        : "Select My Store"
    })

    return {
      user,
      loadUser,
      accountIcon,
      isSearchOpen,
      handleSearch,
      isMobile,
      removeSearchResults,
      handleAccountClick,
      isAuthenticated,
      handleStoreLocatorClick,
      selectedLocation,
      loadCart,
      totalItemsInCart,
    }
  },
})
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}
.selected-store {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>

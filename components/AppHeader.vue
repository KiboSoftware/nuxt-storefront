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
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>
          <SfButton class="sf-button--pure sf-header__action">
            <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
          </SfButton>
          <SfButton v-e2e="'app-header-cart'" class="sf-button--pure sf-header__action">
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
          </SfButton>
        </div>
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfImage, SfIcon, SfButton } from "@storefront-ui/vue"
import {
  computed,
  ref,
  onBeforeUnmount,
  getCurrentInstance,
  defineComponent,
} from "@vue/composition-api"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"

import debounce from "lodash.debounce"
import { useAsync } from "@nuxtjs/composition-api"
import useUiState from "../composables/useUiState"
import LocaleSelector from "./LocaleSelector"
import HeaderNavigation from "./HeaderNavigation"
import { useUser } from "@/composables/useUser"
import { userGetters } from "@/composables/getters"

export default defineComponent({
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    HeaderNavigation,
  },
  directives: { clickOutside },
  // setup(props, { root }) {
  setup() {
    const { user, load: loadUser } = useUser()
    const isSearchOpen = ref(false)
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const result = ref(null)
    const router = ref()
    const instance = getCurrentInstance()
    router.value = instance?.root.type.router

    const accountIcon = computed(() => {
      return isAuthenticated.value ? "profile_fill" : "profile"
    })

    const { toggleLoginModal } = useUiState()
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

    const removeSearchResults = () => {
      result.value = null
    }

    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return router.value.push("/my-account")
      }
      toggleLoginModal()
    }

    useAsync(async () => {
      await loadUser()
    }, null)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // watch(isAuthenticated, (newVal, oldVal) => {
    //   if (newVal.value) {
    //     loadUser()
    //   }
    // })
    // onMounted(async () => {
    //   await loadUser()
    // })

    onBeforeUnmount(() => {
      unMapMobileObserver()
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
      router,
      isAuthenticated,
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

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>

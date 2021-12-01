<template>
  <div>
    <div class="kibo-top-bar kibo-nav-link">
      <div><SfMenuItem label="Nav Link 1" icon="chevron_right" /></div>
      <div><SfMenuItem label="Nav Link 2" icon="chevron_right" /></div>
      <div><SfMenuItem label="Nav Link 3" icon="chevron_right" /></div>
      <div><SfMenuItem label="Nav Link 4" icon="chevron_right" /></div>
    </div>
    <div class="kibo-header-container">
      <div class="kibo-header">
        <div class="kibo-img">
          <SfLink link="/">
            <SfImage v-if="logo" :src="logo" :alt="title" />
            <h1 v-else class="sf-header__title">{{ title }}</h1>
          </SfLink>
        </div>

        <div style="flex: 0.35"></div>
        <div v-click-outside="closeSearch" class="kibo-header__search-bar">
          <KiboSearchBar
            ref="searchBarRef"
            :placeholder="$t('Search for items')"
            aria-label="Search"
            class="sf-header__search"
            :value="term"
            :loading="loading"
            @input="handleSearch"
            @keydown.enter="gotoSearchResult()"
            @keydown.esc="closeSearch"
          >
            <template #icon>
              <SfButton
                v-if="!!term"
                class="sf-search-bar__button sf-button--pure"
                @click="closeOrFocusSearchBar"
              >
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="18px" icon="cross" />
                </span>
              </SfButton>
              <SfButton
                v-else
                class="sf-search-bar__button sf-button--pure"
                @click="isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)"
              >
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="20px" icon="search" />
                </span>
              </SfButton>
            </template>
          </KiboSearchBar>
          <div class="search-suggestion-div">
            <KiboSearchSuggestion
              :visible="isSearchOpen"
              :result="searchSuggestionResult"
              :loading="loading"
              @closeDialog="closeSearch()"
            >
            </KiboSearchSuggestion>
          </div>
        </div>

        <div v-if="!isMobile" class="sf-header__icons">
          <SfButton
            v-e2e="'app-header-location'"
            class="sf-button--pure sf-header__action"
            @click="handleStoreLocatorClick"
          >
            <SfIcon class="sf-header__icon">
              <font-awesome-icon icon="map-marker-alt" class="fa-icon" />
            </SfIcon>
            <div class="kibo-header__icon">
              <span class="kibo-header__icon-name"> {{ selectedLocation }}</span>
            </div>
          </SfButton>
          <SfButton
            v-e2e="'app-header-account'"
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon class="sf-header__icon">
              <font-awesome-icon :icon="[accountIcon, 'user-circle']" class="fa-icon" />
              <i class="far fa-user-circle"></i>
            </SfIcon>
            <div class="kibo-header__icon">
              <span class="kibo-header__icon-name"> My Account</span>
            </div>
          </SfButton>
          <SfButton v-e2e="'app-header-cart'" class="sf-button--pure sf-header__action">
            <SfIcon class="sf-header__icon">
              <font-awesome-icon icon="shopping-cart" class="fa-icon" />
            </SfIcon>
            <div class="kibo-header__icon">
              <span class="kibo-header__icon-name"> Cart</span>
            </div>
          </SfButton>
        </div>
      </div>

      <div class="line-2"></div>

      <div class="kibo-mega-menu"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfImage, SfIcon, SfButton, SfMenuItem, SfLink } from "@storefront-ui/vue"
import { computed, ref, onBeforeUnmount, defineComponent, watch } from "@vue/composition-api"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"
import debounce from "lodash.debounce"

import { useAsync } from "@nuxtjs/composition-api"
import useUiState from "../composables/useUiState"
import * as logo from "../assets/kibo_logo.png"
import { usePurchaseLocation } from "../composables"
import KiboSearchSuggestion from "./KiboSearchSuggestion.vue"
import KiboSearchBar from "./KiboSearchBar.vue"
import { useUser } from "@/composables/useUser"
import { userGetters, storeLocationGetters, productGetters } from "@/composables/getters"
import { useUiHelpers } from "@/composables"
import { useSearchSuggestions } from "@/composables/useSearchSuggestions"
import { useNuxtApp } from "#app"

export default defineComponent({
  components: {
    SfImage,
    SfIcon,
    SfButton,
    SfMenuItem,
    SfLink,
    KiboSearchSuggestion,
    KiboSearchBar,
  },
  directives: { clickOutside },
  setup() {
    const { setTermForUrl, getFacetsFromURL, getCatLink } = useUiHelpers()
    const { result, search, loading } = useSearchSuggestions()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const { user, load: loadUser } = useUser()
    const { purchaseLocation, load: loadPurchaseLocation } = usePurchaseLocation()

    const searchValue = ref("")
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const term = ref("")
    const isSearchOpen = ref(false)
    const results = ref(null)
    const searchBarRef = ref(null)
    const accountIcon = computed(() => {
      return isAuthenticated.value ? "fas" : "far"
    })

    const { toggleLoginModal, toggleStoreLocatorModal } = useUiState()
    const searchSuggestionResult = ref({})

    const closeSearch = () => {
      if (!isSearchOpen.value) return

      term.value = ""
      isSearchOpen.value = false
    }

    const handleSearch = debounce(async (paramValue) => {
      searchSuggestionResult.value = {}
      try {
        isSearchOpen.value = true
        if (!paramValue.target) {
          term.value = paramValue
        } else {
          term.value = paramValue.target.value
        }
        await search(term.value)
        searchSuggestionResult.value = productGetters.getSearchSuggestions(result.value)
      } catch (err) {}
    }, 1000)

    const isMobile = computed(() => mapMobileObserver().isMobile.get())

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch()
      } else {
        term.value = ""
        return searchBarRef.value.$el.children[0].focus()
      }
    }
    const gotoSearchResult = () => {
      if (term.value) {
        const searchStr = term.value
        closeSearch()
        return app.router.push({ path: "/search", query: { searchStr } })
      }
    }

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) || (newVal.length !== oldVal.length && isSearchOpen.value === false))
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true
        }
      }
    )

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
      isMobile,
      removeSearchResults,
      handleAccountClick,
      isAuthenticated,
      searchValue,
      closeSearch,
      closeOrFocusSearchBar,
      setTermForUrl,
      getFacetsFromURL,
      getCatLink,
      term,
      isSearchOpen,
      handleSearch,
      result,
      searchBarRef,
      results,
      logo,
      title: "Kibo",
      handleStoreLocatorClick,
      selectedLocation,
      searchSuggestionResult,
      loading,
      gotoSearchResult,
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

  &__icon {
    size: var(--spacer-lg);
  }

  &__icons {
    display: flex;
    flex: 1;
    justify-content: space-evenly;
    justify-items: center;
  }

  &__search {
    width: 100% !important;
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

.kibo-img {
  position: absolute;
  height: 170%;
  bottom: 12%;
  flex: 1;
}

.kibo-nav-link {
  display: flex;
  justify-content: flex-end;
  justify-items: center;
  color: white;
  padding-right: 5%;
  padding-left: 5%;
}

.kibo-nav-link div {
  margin: var(--spacer-2xs) var(--spacer-xs) 0 0;
  padding: var(--spacer-2xs);
  cursor: pointer;
}

.kibo-header {
  position: relative;
  display: flex;
  height: 4.2rem;
  align-items: center;
  padding-right: 5%;
  padding-left: 2%;

  &__search-bar {
    position: relative;
    flex: 1.5;
    width: 45%;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: var(--spacer-2xs);
  }

  &__icon-name {
    font-size: var(--font-size--xs);
  }
}

.kibo-top-bar {
  background-color: #2b2b2b;
  height: 3.5rem;
}

.sf-menu-item {
  --menu-item-label-color: #fff;

  font-size: var(--font-size--sm);
}

.line-2 {
  border: 0.06rem solid #cdcdcd;
}

.kibo-header-container {
  background-color: #fff;
  box-shadow: 0 0.13rem var(--spacer-2xs) 0 rgba(0, 0, 0, 0.5);
  height: 7.9rem;
}

.fa-icon {
  font-size: var(--spacer-base);
}

.search-suggestion-div {
  flex: 1.5;
  top: 2.65rem;
  position: absolute;
  z-index: 20;
}
</style>

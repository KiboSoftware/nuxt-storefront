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

        <div style="flex: 0.3"></div>
        <div class="kibo-header__search-bar">
          <SfSearchBar
            :value="searchValue"
            placeholder="Search for items"
            aria-label="Search"
            class="sf-header__search"
          />
        </div>

        <div class="sf-header__icons">
          <SfButton v-e2e="'app-header-location'" class="sf-button--pure sf-header__action">
            <SfIcon class="sf-header__icon">
              <font-awesome-icon icon="map-marker-alt" class="fa-icon" />
            </SfIcon>
            <div class="kibo-header__icon">
              <span class="kibo-header__icon-name"> Location</span>
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
import { SfImage, SfIcon, SfButton, SfSearchBar, SfMenuItem, SfLink } from "@storefront-ui/vue"
import { computed, ref, onBeforeUnmount, defineComponent } from "@vue/composition-api"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"

import { useAsync } from "@nuxtjs/composition-api"
import useUiState from "../composables/useUiState"
import * as logo from "../assets/kibo_logo.png"
import { useUser } from "@/composables/useUser"
import { userGetters } from "@/composables/getters"
import { useNuxtApp } from "#app"

export default defineComponent({
  components: {
    SfImage,
    SfIcon,
    SfButton,
    SfSearchBar,
    SfMenuItem,
    SfLink,
  },
  directives: { clickOutside },
  setup() {
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const { user, load: loadUser } = useUser()
    const searchValue = ref("")
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const result = ref(null)
    const accountIcon = computed(() => {
      return isAuthenticated.value ? "fas" : "far"
    })

    const { toggleLoginModal } = useUiState()

    const isMobile = computed(() => mapMobileObserver().isMobile.get())

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
    }, null)

    onBeforeUnmount(() => {
      unMapMobileObserver()
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
      logo,
      title: "Kibo",
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
    justify-content: flex-end;
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
    flex: 1.5;
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
</style>

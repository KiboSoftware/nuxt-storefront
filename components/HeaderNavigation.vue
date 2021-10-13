<template>
  <div v-if="!isMobile" class="sf-header__navigation desktop">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      v-e2e="`app-header-url_${category}`"
      class="nav-item"
      :label="category"
      :link="localePath(`/c/${category}`)"
    />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      v-e2e="`app-header-url_${category}`"
      class="nav-item"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="category"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/c/${category}`)"
          @click.native="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal } from "@storefront-ui/vue"
import useUiState from "~/composables/useUiState"

export default {
  name: "HeaderNavigation",
  components: {
    SfMenuItem,
    SfModal,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState()
    const categories = ["women", "men"]

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
    }
  },
}
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>

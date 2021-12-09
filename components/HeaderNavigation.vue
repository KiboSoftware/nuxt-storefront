<template>
  <div v-if="!isMobile" class="sf-header__navigation desktop">
    <MegaMenu />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <MegaMenu />
  </SfModal>
</template>

<script lang="ts">
import { SfModal } from "@storefront-ui/vue"
import { defineComponent } from "@vue/composition-api"
import MegaMenu from "./MegaMenu.vue"
import useUiState from "~/composables/useUiState"

export default defineComponent({
  name: "HeaderNavigation",
  components: {
    SfModal,
    MegaMenu,
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
})
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

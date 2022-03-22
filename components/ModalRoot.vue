<template>
  <SfModal
    class="sf-modal"
    :class="{ 'mobile-small-modal': isSmallModal }"
    :visible="!!componentRef"
    :cross="!isSmallModal"
    @close="handleClose"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar bar-heading"
        :class="{ 'hide-bar': isSmallModal }"
        :title="titleRef"
        :close="true"
        :back="false"
        @click:close="handleClose"
      />
    </template>
    <component :is="componentRef" :properties="properties" @onClose="handleClose" />
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfSearchBar, SfBar } from "@storefront-ui/vue"
import { ref } from "@vue/composition-api"
import { useNuxtApp } from "#app"

export default {
  components: { SfModal, SfSearchBar, SfBar },
  setup() {
    const componentRef = ref(null)
    const titleRef = ref("")
    const isSmallModal = ref(false)
    const properties = ref(null)
    const nuxt = useNuxtApp()
    const modal = nuxt.nuxt2Context.$modal

    const handleClose = () => {
      componentRef.value = null
    }

    modal.subscription.$on("open", ({ component, props }) => {
      componentRef.value = component
      titleRef.value = props?.title
      isSmallModal.value = props?.isSmallModal
      properties.value = props
    })

    return {
      handleClose,
      componentRef,
      titleRef,
      properties,
      isSmallModal,
    }
  },
}
</script>
<style lang="scss" scoped>
.sf-modal {
  --modal-content-padding: 0;
}

.bar-heading {
  color: var(--_c-dark-primary);
}

.hide-bar {
  display: none;
}

@include for-mobile {
  .mobile-small-modal {
    --modal-width: calc(var(--spacer-3xl) * 2);
    --modal-top: 50%;
    --modal-left: 50%;
    --modal-bottom: none;
    --modal-right: none;
    --modal-transform: translate3d(-50%, -50%, 0);
    --modal-height: auto;
    --modal-max-height: 90%;
    --modal-content-padding: var(--spacer-sm) var(--spacer-lg);
  }
}
</style>

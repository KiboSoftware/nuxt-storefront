<template>
  <SfModal
    class="sf-modal"
    :class="{ 'mobile-small-modal': isSmallModal }"
    :visible="!!componentRef"
    :cross="false"
    @close="handleClose"
  >
    <template #modal-bar>
      <div class="modal-header">
        <div class="bar-heading" :class="{ 'hide-bar': isSmallModal }">
          {{ titleRef }}
        </div>
        <SfIcon icon="cross" size="0.875rem" color="gray-secondary" @click="handleClose()" />
      </div>
    </template>
    <component :is="componentRef" :properties="properties" @onClose="handleClose" />
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfSearchBar, SfBar, SfIcon } from "@storefront-ui/vue"
import { ref } from "@vue/composition-api"
import { useNuxtApp } from "#app"

export default {
  components: { SfModal, SfSearchBar, SfBar, SfIcon },
  setup() {
    const componentRef = ref(null)
    const titleRef = ref("")
    const isSmallModal = ref(false)
    const properties = ref(null)
    const nuxt = useNuxtApp()
    const modal = nuxt.nuxt2Context.$modal

    const handleClose = () => {
      modal.hide({
        component: componentRef.value,
      })
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
.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 2rem 1rem 0 1rem;
}

.sf-modal {
  --modal-content-padding: 0;
}

.bar-heading {
  color: var(--_c-dark-primary);
  font-size: var(--font-size--xl);
  font-weight: var(--font-weight--semibold);
}

.hide-bar {
  display: none;
}

@include for-desktop {
  ::v-deep .sf-modal__container {
    z-index: 999;
  }

  ::v-deep .sf-modal__overlay {
    z-index: 999;
  }
}

@include for-mobile {
  .mobile-small-modal {
    --modal-width: 90%;
    --modal-top: 50%;
    --modal-left: 50%;
    --modal-bottom: none;
    --modal-right: none;
    --modal-transform: translate3d(-50%, -50%, 0);
    --modal-height: auto;
    --modal-max-height: 90%;
    --modal-content-padding: var(--spacer-sm) var(--spacer-lg);
  }

  ::v-deep .sf-modal__container {
    border-radius: 2%;
    margin-top: 55px;
    height: fit-content;

    @include for-desktop {
      margin-top: 0;
    }
  }

  ::v-deep .sf-modal__overlay {
    margin-top: 55px;

    @include for-desktop {
      margin-top: 0;
    }
  }
}
</style>

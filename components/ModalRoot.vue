<template>
  <SfModal class="sf-modal" :visible="!!componentRef" @close="handleClose">
    <template #modal-bar>
      <SfBar class="sf-modal__bar bar-heading" :title="titleRef" @click:close="handleClose" />
    </template>
    <component :is="componentRef" :properties="properties" @onClose="handleClose" />
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfSearchBar, SfBar } from "@storefront-ui/vue"
import { ref } from "@vue/composition-api"
import { ModalBus } from "../eventBus/eventBus"
export default {
  components: { SfModal, SfSearchBar, SfBar },
  setup() {
    const componentRef = ref(null)
    const titleRef = ref("")
    const properties = ref(null)

    const handleClose = () => {
      componentRef.value = null
    }

    const getTitle = (componentName) => {
      const titles = {
        StoreLocatorModal: "Select Store",
      }

      return titles[componentName] || ""
    }

    ModalBus.$on("open", ({ component, props }) => {
      componentRef.value = component
      titleRef.value = getTitle(component?.name)
      properties.value = props
    })

    return {
      handleClose,
      componentRef,
      titleRef,
      properties,
    }
  },
}
</script>
<style lang="scss" scoped>
.sf-modal {
  --modal-width: 39.375rem;
  --modal-content-padding: 0;
}

.bar-heading {
  color: var(--_c-dark-primary);
  justify-content: flex-start;
  padding-left: var(--spacer-lg);
}
</style>

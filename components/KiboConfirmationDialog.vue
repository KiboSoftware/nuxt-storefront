<template>
  <transition name="sf-fade" mode="out-in">
    <div class="modal-content">
      <div class="modal-content__header">{{ headerText }}</div>
      <div class="action-buttons" v-bind="{ actionHandler }">
        <SfButton class="color-light" :aria-disabled="false" :link="null" @click="$emit('onClose')">
          {{ $t(buttonText1) }}
        </SfButton>
        <SfButton :aria-disabled="false" :link="null" @click="handleDelete">
          {{ $t(buttonText2) }}
        </SfButton>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { SfButton } from "@storefront-ui/vue"
export default {
  name: "KiboConfirmationDialog",
  components: {
    SfButton,
  },
  props: {
    buttonText1: {
      type: String,
      default: "Cancel",
    },
    buttonText2: {
      type: String,
      default: "Delete",
    },
    properties: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props, context) {
    const { actionHandler, headerText } = props?.properties as {
      title: String
      actionHandler: Function
      headerText: String
    }

    const handleDelete = () => {
      actionHandler()
      context.emit("onClose")
    }
    return {
      handleDelete,
      headerText,
      actionHandler,
    }
  },
}
</script>
<style lang="scss" scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  padding: calc(var(--spacer-2xs) * 2.5);
  gap: var(--spacer-2xs);
  width: 90%;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-xs);

  &__header {
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-top: var(--spacer-sm);
  }
}
</style>

<template>
  <transition name="sf-fade" mode="out-in">
    <div class="modal-content">
      <div class="action-buttons" v-bind="{ actionHandler }">
        <SfButton class="color-light" :aria-disabled="false" :link="null" @click="$emit('onClose')">
          {{ $t("Cancel") }}
        </SfButton>
        <SfButton :aria-disabled="false" :link="null" @click="handleDelete">
          {{ $t("Delete") }}
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
    title: {
      type: String,
      default: "Are you sure ?",
    },
    properties: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props, context) {
    const { actionHandler } = props?.properties as { title: String; actionHandler: Function }

    const handleDelete = () => {
      actionHandler()
      context.emit("onClose")
    }
    return {
      handleDelete,
    }
  },
}
</script>
<style lang="scss" scoped>
::v-deep .sf-modal {
  &__container {
    height: 200px;
    margin: auto;
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  padding: calc(var(--spacer-2xs) * 2.5);
  gap: calc(var(--spacer-xl) / 8);
  width: 90%;
}

.modal-content {
  display: flex;
  flex-direction: column;
}
</style>

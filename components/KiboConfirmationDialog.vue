<template>
  <SfModal
    class="sf-modal modal-confirm"
    :visible="isOpen"
    overlay
    :persistent="false"
    :cross="false"
  >
    <template #modal-bar>
      <slot name="modal-bar" v-bind="{ label }">
        <div class="title">
          {{ label }}
        </div>
      </slot>
    </template>
    <transition name="sf-fade" mode="out-in">
      <div class="modal-content">
        <div class="action-buttons" v-bind="{ actionHandler }">
          <button
            class="action-buttons__cancel action-buttons__font"
            :aria-disabled="false"
            :link="null"
            @click="$emit('click:close')"
          >
            {{ $t("Cancel") }}
          </button>
          <button
            class="action-buttons__delete action-buttons__font"
            :aria-disabled="false"
            :link="null"
            @click="actionHandler"
          >
            {{ $t("Delete") }}
          </button>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import { SfModal } from "@storefront-ui/vue"
export default {
  name: "KiboConfirmationDialog",
  components: {
    SfModal,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Are you sure ?",
    },
    actionHandler: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  color: var(--c-black);
  font-size: var(--font-size--base);
  letter-spacing: 0.2px;
  line-height: calc(var(--spacer-2xs) * 4.5);
  max-width: calc(var(--spacer-2xl) * 4.25);
  text-align: left;
  margin: calc(var(--spacer-2xs) * 5) calc(var(--spacer-2xs) * 2.5);
}

.sf-modal {
  --modal-width: calc(var(--spacer-2xl) * 6);
  --modal-content-padding: 0;

  &__close {
    margin-right: var(--spacer-xs);
  }

  @include for-mobile {
    --modal-width: 90%;
    --modal-height: fit-content;

    ::v-deep &__container {
      z-index: 2;
      top: var(--spacer-base);
      margin: 0 auto;
      background-color: var(--_c-light-secondary);
      border-radius: calc(var(--spacer-2xs) / 2);
      box-shadow: 0 0 var(--spacer-sm) calc(var(--spacer-2xs) / 2) rgba(43, 43, 43, 0.25);
      padding: calc(var(--spacer-xl) / 8);
    }

    ::v-deep .sf-bar {
      justify-content: flex-start;
      border-bottom: none;
    }
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--spacer-2xs) * 2.5);
  gap: calc(var(--spacer-xl) / 8);

  &__cancel {
    background-color: #fafafa;
    border: 1px solid var(--_c-gray-middle);
    color: var(--c-black);
  }

  &__delete {
    border: none;
    background-color: var(--_c-green-primary);
    color: var(--_c-light-secondary);
  }

  &__font {
    border-radius: var(--spacer-2xs);
    height: calc(var(--spacer-2xs) * 10.5);
    font-size: var(--font-size--lg);
    line-height: calc(var(--spacer-2xs) * 5.5);
    text-align: center;
  }

  .sf-primary {
    flex-wrap: wrap;

    &__button {
      width: 80%;
    }
  }
}
</style>

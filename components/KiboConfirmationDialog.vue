<template>
  <SfModal class="sf-modal modal-confirm" :visible="isOpen" overlay :persistent="false">
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
            class="action-buttons__cancel"
            :aria-disabled="false"
            :link="null"
            @click="$emit('click:close')"
          >
            {{ $t("Cancel") }}
          </button>
          <button
            class="action-buttons__delete"
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
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.title {
  color: #2b2b2b;
  font-family: var(--font-family--secondary);
  font-size: 15px;
  letter-spacing: 0.2px;
  line-height: 18px;
  width: 333px;
  text-align: left;
  margin: 20px 10px;
}

.sf-modal {
  --modal-width: calc(var(--spacer-4xl) + var(--spacer-3xl) + var(--spacer-2xl));
  --modal-content-padding: 0;

  &__close {
    margin-right: var(--spacer-xs);
  }

  @include for-mobile {
    --modal-width: 90%;
    --modal-height: fit-content;

    ::v-deep &__container {
      z-index: 9999;
      top: calc(var(--spacer-base) + var(--spacer-lg));
      margin: 0 auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 0 15px 2px rgba(43, 43, 43, 0.25);
      padding: 5px;
    }

    ::v-deep .sf-bar {
      justify-content: flex-start;
      border-bottom: none;
      flex: 100%;
    }
  }
}

.action-buttons {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  gap: 5px;

  &__cancel {
    background-color: #fafafa;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    height: 42px;
  }

  &__delete {
    background-color: #2ea195;
    border-radius: 4px;
    height: 42px;
  }
  @include for-mobile {
    flex-direction: column;

    .column .sf-button {
      width: 100%;
      margin-bottom: var(--spacer-sm);
    }
  }

  .sf-primary {
    flex-wrap: wrap;

    &__button {
      width: 80%;
    }
  }
}
</style>

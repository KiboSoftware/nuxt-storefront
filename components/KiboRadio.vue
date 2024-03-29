<template>
  <div
    class="sf-radio"
    :class="{
      'is-active': isChecked,
      'is-disabled': disabled,
    }"
  >
    <label class="sf-radio__container">
      <input
        v-focus
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @change="changeHandler"
        @input="inputHandler"
        @click="inputHandler"
      />
      <slot name="checkmark" v-bind="{ isChecked, disabled }">
        <span
          class="sf-radio__checkmark"
          :class="{ 'sf-radio__checkmark is-active': isChecked }"
        ></span>
      </slot>
      <span class="sf-radio__content">
        <slot name="label" v-bind="{ label, isChecked, disabled }">
          <span :class="{ 'display-none': !label }" class="sf-radio__label">{{ label }}</span>
        </slot>
        <slot name="details" v-bind="{ details }">
          <span :class="{ 'display-none': !details }" class="sf-radio__details">
            {{ details }}
          </span>
        </slot>
        <slot name="description" v-bind="{ description }">
          <span :class="{ 'display-none': !description }" class="sf-radio__description">
            {{ description }}
          </span>
        </slot>
      </span>
    </label>
  </div>
</template>
<script lang="ts">
import { focus } from "@storefront-ui/vue/src/utilities/directives"
export default {
  name: "KiboRadio",
  directives: {
    focus,
  },
  model: {
    prop: "selected",
    event: "change",
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const changeHandler = () => {
      context.emit("change", props.value)
    }
    const inputHandler = () => {
      context.emit("input", props.value)
    }
    const isChecked = computed(() => {
      return props.value === props.selected
    })

    return {
      isChecked,
      changeHandler,
      inputHandler,
    }
  },
}
</script>

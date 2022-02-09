<template functional>
  <div>
    <div
      :class="[data.class, data.staticClass, 'kibo-price']"
      :style="[data.style, data.staticStyle]"
      v-bind="data.attrs"
      v-on="listeners"
    >
      <!--@slot Custom regular price -->
      <slot name="regular" v-bind="{ props }">
        <span
          :class="
            !props.regular || props.special
              ? 'display-none'
              : props.small
              ? `kibo-price__regular--small`
              : `kibo-price__regular`
          "
        >
          {{ props.regular }}
        </span>
      </slot>
      <!--@slot Custom old price (value from regular)-->
      <slot name="old" v-bind="{ props }">
        <del
          :class="
            !props.special
              ? 'display-none'
              : props.small
              ? `kibo-price__old--small`
              : `kibo-price__old`
          "
        >
          {{ props.regular }}
        </del>
      </slot>
      <!--@slot Custom special price -->
      <slot name="special" v-bind="{ props }">
        <ins
          :class="
            !props.special
              ? 'display-none'
              : props.small
              ? `kibo-price__special--small`
              : `kibo-price__special`
          "
        >
          {{ props.special }}
        </ins>
      </slot>
    </div>
  </div>
</template>
<script>
// import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "KiboPrice",
  props: {
    regular: {
      type: [String, Number],
      default: null,
    },
    special: {
      type: [String, Number],
      default: null,
    },
    small: {
      type: Boolean,
      default: false,
    },
    coupons: {
      type: Array,
      default: null,
    },
  },
})
</script>

<template>
  <div>
    <div class="kibo-price">
      <!--@slot Custom regular price -->
      <slot name="regular">
        <span
          :class="
            !regular || special
              ? 'display-none'
              : small
              ? `kibo-price__regular--small`
              : `kibo-price__regular`
          "
        >
          {{ regular }}
        </span>
      </slot>
      <!--@slot Custom old price (value from regular)-->
      <slot name="old">
        <del
          :class="!special ? 'display-none' : small ? `kibo-price__old--small` : `kibo-price__old`"
        >
          {{ regular }}
        </del>
      </slot>
      <!--@slot Custom special price -->
      <slot name="special">
        <ins
          :class="
            !special ? 'display-none' : small ? `kibo-price__special--small` : `kibo-price__special`
          "
        >
          {{ special }}
        </ins>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
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
}
</script>

<style lang="scss">
@import "@/assets/styles/components/custom/KiboPrice.scss";
</style>

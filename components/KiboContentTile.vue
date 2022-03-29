<template>
  <div class="tile">
    <div class="tile__image">
      <SfImage
        :src="contentTile.imgUrl"
        class="sf-image__picture"
        alt="title"
        :placeholder="require('@/assets/images/product_placeholder.svg')"
      />
    </div>
    <div class="tile__content">
      <div class="tile__header">{{ contentTile.content.header }}</div>
      <div class="tile__subheader">{{ contentTile.content.subHeader }}</div>
      <div class="tile__links">
        <div v-for="(link, index) in contentTile.content.links" :key="index" class="tile__link">
          {{ link.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfImage } from "@storefront-ui/vue"

export default defineComponent({
  components: { SfImage },
  props: {
    contentTile: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.tile {
  width: auto;
  align-self: center;
  color: var(--c-black);

  &__image {
    ::v-deep .sf-image {
      --image-width: 100%;

      &__picture {
        width: 100%;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacer-2xs) * 4.5);
    align-items: center;
    margin-top: var(--spacer-sm);
  }

  &__header {
    font-size: var(--font-size--3xl);
    line-height: calc(var(--spacer-2xs) * 7);
    text-align: center;
    font-weight: bold;
  }

  &__subheader {
    font-size: var(--font-size--base);
    line-height: calc(var(--spacer-2xs) * 4.75);
    text-align: center;
  }

  &__links {
    font-size: var(--font-size--base);
    line-height: calc(var(--spacer-2xs) * 4.75);
    text-align: center;
    font-weight: 600;
  }

  &__link {
    cursor: pointer;
    margin: calc(var(--spacer-2xs) * 5) auto;

    @include for-desktop {
      &:hover {
        text-decoration-line: underline;
      }
    }
  }
}
</style>

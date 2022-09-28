<template>
  <div v-if="promoBlocks" class="large-and-medium-content">
    <div v-if="promoBlocks.largeTiles" class="large-content">
      <div class="large-content__header">
        {{ $t("theLatestLineup") }}
      </div>
      <div class="large-tiles">
        <div
          v-for="(tile, index) in promoBlocks.largeTiles"
          :key="'large' + index"
          class="large-tiles__tiles"
        >
          <KiboContentTile :content-tile="tile" />
        </div>
      </div>
    </div>
    <div v-if="promoBlocks.mediumTiles" class="medium-content">
      <div class="medium-tiles">
        <div
          v-for="(tile, index) in promoBlocks.mediumTiles"
          :key="'medium' + index"
          class="medium-tiles__tiles"
        >
          <KiboContentTile :content-tile="tile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromoBlocks",
  layout: "full-width",
  props: {
    promoBlocks: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { promoBlocks } = props
    const promoBlocksTiles = promoBlocks
    return { promoBlocksTiles }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/organisms/SfHero.scss";

.large-and-medium-content {
  margin-top: calc(var(--spacer-xs) * 8.75);
  padding: 0 5.48%;

  @include for-desktop {
    padding: 0 2%;
    margin-top: calc(var(--spacer-sm) * 2);
  }
}

.large-content {
  &__header {
    color: var(--_c-green-primary);
    font-size: var(--spacer-base);
    line-height: calc(var(--spacer-2xs) * 7.125);
    text-align: left;
    font-weight: var(--font-weight--bold);
    min-width: calc(var(--spacer-3xl) * 1.806);

    @include for-desktop {
      margin: auto;
      width: 15%;
    }
  }
}

.large-tiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: calc(var(--spacer-2xs) * 4.5);

  &__tiles {
    margin-bottom: calc(var(--spacer-2xs) * 9);

    @include for-desktop {
      width: 48%;
    }

    ::v-deep .sf-image {
      height: calc(var(--spacer-2xl) * 5);
    }
  }
}

.medium-tiles {
  display: flex;
  margin-top: calc(var(--spacer-2xs) * 4.5);
  flex-wrap: wrap;
  justify-content: space-between;

  &__tiles {
    margin-bottom: calc(var(--spacer-2xs) * 9);
    width: 45%;

    @include for-desktop {
      width: 24%;
    }

    ::v-deep .sf-image {
      height: calc(var(--spacer-3xl) * 1.625);
    }
  }
}
</style>

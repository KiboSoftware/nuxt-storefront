<template>
  <div class="kibo-collectedProduct">
    <div class="kibo-collectedProduct__image">
      <SfImage
        :src="image"
        :alt="title"
        width="100%"
        height="100%"
        class="sf-collected-product__image"
      />
    </div>
    <div class="kibo-collectedProduct__info">
      <div class="kibo-collectedProduct__title-wrapper">
        <component :is="componentIs" class="kibo-collectedProduct__title" :link="link ? link : ''">
          {{ title }}
        </component>
      </div>
      <div class="kibo-collectedProduct__price-wrapper">
        <SfPrice
          v-if="regularPrice"
          :regular="regularPrice"
          :special="specialPrice"
          class="kibo-collectedProduct__price"
        />
      </div>
      <div class="kibo-collectedProduct__quantitySelector-wrapper">
        <SfQuantitySelector
          :qty="quantity"
          class="kibo-collected-product__quantity-selector"
          @input="$emit('input', $event)"
        />
      </div>
      <div class="kibo-collectedProduct__details-wrapper">
        <SfAccordion open="" show-chevron>
          <SfAccordionItem header="Details">
            <div class="sf-property">
              <span class="sf-property__name">Color</span>
              <span class="sf-property__value"> Blue </span>
            </div>
            <div class="sf-property">
              <span class="sf-property__name">Size</span>
              <span class="sf-property__value"> XL </span>
            </div>
            <div class="sf-property">
              <span class="sf-property__name">SKU</span>
              <span class="sf-property__value"> MS-4567J </span>
            </div>
          </SfAccordionItem>
        </SfAccordion>
      </div>
    </div>
    <div class="kibo-collectedProduct__verticalDivider"></div>
    <div class="kibo-collectedProduct__fullfilment">
      <div class="kibo-collectedProduct__fullfilment-options">
        <SfRadio
          name="shipToHome"
          value="store"
          label="Ship to Home"
          :disabled="false"
          selected=""
          :required="false"
        />
        <SfRadio
          name="pickup"
          value="store"
          label="Pickup in Store"
          details="Available at: Downtown store"
          description="Change Store"
          :disabled="false"
          selected=""
          :required="false"
        />
      </div>
    </div>
    <div class="kibo-collectedProduct__remove">
      <SfButton class="kibo-collectedProduct__remove-button" link="/cart">
        <SfIcon class="sf-header__icon" icon="cross" size="1.25rem" />
      </SfButton>
    </div>
  </div>
</template>
<script>
import {
  SfPrice,
  SfIcon,
  SfImage,
  SfCircleIcon,
  SfButton,
  SfQuantitySelector,
  SfLink,
  SfProperty,
  SfAccordion,
  SfRadio,
} from "@storefront-ui/vue"

export default {
  name: "KiboCollectedProduct",
  components: {
    SfButton,
    SfIcon,
    SfImage,
    SfCircleIcon,
    SfPrice,
    SfQuantitySelector,
    SfLink,
    SfProperty,
    SfAccordion,
    SfRadio,
  },
  model: {
    prop: "qty",
  },
  props: {
    /**
     * Product image
     * It should be an url of the product
     */
    image: {
      type: String,
      default: "",
    },
    /**
     * Product image width, without unit
     */
    imageWidth: {
      type: [String, Number],
      default: 140,
    },
    /**
     * Product image height, without unit
     */
    imageHeight: {
      type: [String, Number],
      default: 200,
    },
    /**
     * Product title
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Product regular price
     */
    regularPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Product special price
     */
    specialPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Selected quantity
     */
    qty: {
      type: [Number, String],
      default: 1,
    },
    /**
     * Link to product
     */
    link: {
      type: [String, Object],
      default: "",
    },
  },
  computed: {
    componentIs() {
      return this.link ? "SfLink" : "div"
    },
    quantity() {
      return typeof this.qty === "string" ? Number(this.qty) : this.qty
    },
  },
  methods: {
    removeHandler() {
      this.$emit("click:remove")
    },
  },
}
</script>
<style lang="scss">
.kibo-collectedProduct {
  height: auto;
  width: 100%;
  display: flex;
  flex: 1;
  box-sizing: border-box;
  padding: 1%;
  position: relative;
  border: 2px solid var(--_c-white-secondary) !important;
  margin: var(--collected-product-margin, 0 0 var(--spacer-sm) 0);

  &__verticalDivider {
    height: auto;
    width: 1px;
    background: var(--_c-white-secondary);
  }

  &__info {
    flex: 1;
  }

  &__fullfilment {
    flex: 1;
    padding-top: var(--collected-product-padding-top, var(--spacer-sm));
  }

  &__fullfilment-options {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    margin: var(--collected-product-main-margin, 0 0 0 var(--spacer-sm));
  }

  &__remove {
    position: absolute;
    right: 0;
  }

  &__remove-button {
    --button-border-width: 0;
    --button-background: transparent;
    --button-color: var(--c-text);
    --button-text-transform: none;
    --button-text-decoration: underline;
    --button-font-size: var(--font-size--xs);
    --button-font-weight: var(--font-weight--medium);
    --button-box-shadow: none;

    display: inline;
    &:hover {
      --button-background: transparent;
      --button-color: var(--c-primary);
    }
    &:active {
      --button-color: var(--c-gray);
    }
    @each $color, $map in $colors-map {
      $primary: map-get($map, "primary");
      &.color-#{$color} {
        --button-background: transparent;
        &:hover {
          --button-color: #{$primary};
        }
        &:active {
          --button-color: var(--c-gray);
          --button-background: transparent;
        }
      }
    }
  }

  &__details-wrapper,
  &__quantitySelector-wrapper,
  &__price-wrapper,
  &__title-wrapper {
    flex: 1;
    margin: var(--collected-product-main-margin, 0 0 0 var(--spacer-sm));
  }

  &__image {
    padding: var(--spacer-sm) var(--spacer-sm) 0 var(--spacer-sm);
    max-width: 10rem;
    max-height: var(--spacer-base);
  }

  &__quantity-selector {
    --quantity-selector-background: var(--c-light);
  }

  &__price,
  &__title {
    margin: var(--collected-product-title-margin, 0 var(--spacer-base) var(--spacer-xs) 0);
    color: var(--collected-product-title-color, var(--c-link));

    --link-text-decoration: none;
    @include font(
      --collected-product-title-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.6,
      var(--font-family--secondary)
    );
  }
}

.sf-accordion-item {
  &__header {
    display: flex;
    justify-content: flex-start;
    @include font(
      --accordion-item-header-font,
      var(--font-weight--medium),
      var(--font-size--xs),
      1,
      var(--font-family--primary)
    );
  }

  &__chevron {
    display: var(--accordion-item-chevron-display, none);
    flex: 0 0 auto;
    font-size: 12px;
    margin-left: var(--spacer-sm);
  }

  @include for-desktop {
    --accordion-item-header-padding: var(--spacer-xs) 0;
    --accordion-item-header-font-size: var(--font-size--sm);
    --accordion-item-header-font-weight: var(--font-weight--normal);
    --accordion-item-header-border-width: 0;
    --accordion-item-content-border-width: 0;
    --accordion-item-content-padding: var(--spacer-2xs) 0;
  }
}

.sf-property {
  padding: var(--property-name-margin, 0 var(--spacer-xs) var(--spacer-xs) 0);
  &__name {
    @include font(
      --property-name-font,
      var(--font-weight--semibold),
      var(--font-size--xs),
      1.2,
      var(--font-family--secondary)
    );
  }
  &__value {
    @include font(
      --property-value-font,
      var(--font-weight--normal),
      var(--font-size--xs),
      1.2,
      var(--font-family--secondary)
    );
  }
}

.sf-radio {
  &__label,
  &__details,
  &__description {
    font-size: var(--font-size--xs);
  }
}
</style>

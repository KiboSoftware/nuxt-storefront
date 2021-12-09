<template>
  <div class="store-details">
    <SfRadio
      class="sf-radio--transparent"
      :name="location.code"
      :value="location.code"
      :label="location.name"
      :required="false"
      :selected="selectedStore"
      @change="handleStoreChange(location)"
    >
      <template #details>
        <p class="sf-radio__details">
          {{ location.streetAddress }}
        </p>
        <p class="sf-radio__details">
          {{ location.cityStateZip }}
        </p>
      </template>
      <template #description>
        <SfAccordion
          open=""
          :first-open="false"
          :multiple="false"
          transition="sf-slide-left"
          :show-chevron="true"
        >
          <SfAccordionItem header="Store Info">
            <template #header="{ header, isOpen, accordionClick }">
              <SfButton
                :aria-pressed="isOpen.toString()"
                :aria-expanded="isOpen.toString()"
                :class="{ 'is-open': false }"
                class="sf-button--pure sf-accordion-item__header"
                @click="accordionClick"
              >
                {{ header }}
                <SfChevron
                  tabindex="0"
                  class="sf-accordion-item__chevron"
                  :class="{ 'sf-chevron--top': isOpen }"
                />
              </SfButton>
            </template>
            <p class="sf-radio__details">Get Directions ({{ location.phone }})</p>
            <p class="sf-radio__details">{{ location.streetAddress }}</p>
            <p class="sf-radio__details">{{ location.cityStateZip }}</p>
            <p class="sf-radio__storeHoursLabel">Store Hours</p>
            <div v-for="hours in location.hours" :key="hours[0]">
              <div class="sf-property--value-in-middle sf-property">
                <span class="sf-property__name">{{ hours.day }}</span>
                <span class="sf-property__value">
                  {{ hours.openTime }} - {{ hours.closeTime }}
                </span>
              </div>
            </div>
          </SfAccordionItem>
        </SfAccordion>
      </template>
    </SfRadio>
  </div>
</template>

<script>
import { SfRadio, SfAccordion, SfButton, SfChevron } from "@storefront-ui/vue"

export default defineComponent({
  name: "KiboStoreDetails",
  components: {
    SfRadio,
    SfAccordion,
    SfButton,
    SfChevron,
  },
  props: {
    location: {
      type: Object,
      default: () => {},
    },
    selectedStore: {
      type: String,
      default: "",
    },
  },
  setup(_, context) {
    const handleStoreChange = (location) => {
      context.emit("change", location)
    }
    return {
      handleStoreChange,
    }
  },
})
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.store-details {
  padding: var(--spacer-base) var(--spacer-base) var(--spacer-base) var(--spacer-lg);
  border-bottom: 1px solid var(--c-light);
}

.section-border {
  border-bottom: 1px solid var(--c-light);
}

.sf-accordion-item {
  &__header {
    text-decoration: underline;
  }
}

.sf-property__name {
  text-transform: capitalize;
}

.sf-radio--transparent {
  &__content {
    display: flex;
    justify-content: flex-start;
  }
}

.sf-button--pure {
  --button-height: 1.625rem;
}
</style>

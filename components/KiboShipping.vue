<template>
  <div class="sf-shipping" data-testid="shipping">
    <slot name="shipping-heading" v-bind="{ headingTitle, headingTitleLevel }">
      <SfHeading
        :title="headingTitle"
        :level="headingTitleLevel"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </slot>
    <div class="form">
      <slot name="form" v-bind="{ inputsLabels, selectLabel, countries }">
        <SfInput
          v-model="firstName"
          :value="firstName"
          :label="inputsLabels[0]"
          name="firstName"
          class="form__element form__element--half"
          required
          @input="updateField('firstName', $event)"
        />
        <SfInput
          v-model="lastName"
          :value="lastName"
          :label="inputsLabels[1]"
          name="lastName"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('lastName', $event)"
        />
        <SfInput
          v-model="streetName"
          :value="streetName"
          :label="inputsLabels[2]"
          name="streetName"
          class="form__element form__element--half"
          required
          @input="updateField('streetName', $event)"
        />
        <SfInput
          v-model="apartment"
          :value="apartment"
          :label="inputsLabels[3]"
          name="apartment"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('apartment', $event)"
        />
        <SfInput
          v-model="city"
          :value="city"
          :label="inputsLabels[4]"
          name="city"
          class="form__element form__element--half"
          required
          @input="updateField('city', $event)"
        />
        <SfInput
          v-model="state"
          :value="state"
          :label="inputsLabels[5]"
          name="state"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('state', $event)"
        />
        <SfInput
          v-model="zipCode"
          :value="zipCode"
          :label="inputsLabels[6]"
          name="zipCode"
          class="form__element form__element--half"
          required
          @input="updateField('zipCode', $event)"
        />
        <SfSelect
          v-model="country"
          :placeholder="selectLabel"
          class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
          :label="inputsLabels[7]"
          :valid="true"
          data-testid="country"
          @input="updateField('country', $event)"
        >
          <SfSelectOption
            v-for="countryOption in countries"
            :key="countryOption"
            :value="countryOption"
          >
            {{ countryOption }}
          </SfSelectOption>
        </SfSelect>
        <SfInput
          v-model="phoneNumber"
          :value="phoneNumber"
          :label="inputsLabels[8]"
          name="phone"
          class="form__element"
          required
          @input="updateField('phoneNumber', $event)"
        />

        <SfButton @click="saveShippingAddress($event)"> Save shipping address </SfButton>
      </slot>
    </div>
    <slot
      name="shipping-methods-heading"
      v-bind="{ methodsHeadingTitle, methodsHeadingTitleLevel }"
    >
      <SfHeading
        :title="methodsHeadingTitle"
        :level="methodsHeadingTitleLevel"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </slot>
    <div class="form">
      <slot name="shipping-methods-form" v-bind="{ shippingMethods }">
        <div class="form__radio-group" data-testid="shipping-method">
          <SfRadio
            v-for="item in shippingMethods"
            :key="item.value"
            v-model="shippingMethod"
            :label="item.label"
            :value="item.value"
            name="shippingMethod"
            :description="item.description"
            class="form__radio shipping"
            @input="updateField('shippingMethod', { name: item.label, code: item.value })"
          >
            <template #label="{ label }">
              <div class="sf-radio__label shipping__label">
                <div>
                  {{ label }}
                  <SfButton
                    class="sf-button--text shipping__action desktop-only"
                    :class="{ 'shipping__action--is-active': item.isOpen }"
                    @click=";(item.isOpen = !item.isOpen), $emit('toggle-info', item.value)"
                    >{{ item.isOpen ? "- info" : "+ info" }}
                  </SfButton>
                </div>
                <div class="shipping__label-price">{{ item.price }}</div>
              </div>
            </template>
            <template #description="{ description }">
              <div class="sf-radio__description shipping__description">
                <div class="shipping__delivery">
                  <span>{{ item.delivery }}</span>
                </div>
                <transition name="sf-fade">
                  <div v-if="item.isOpen" class="shipping__info">
                    {{ description }}
                  </div>
                </transition>
              </div>
            </template>
          </SfRadio>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { SfHeading, SfInput, SfButton, SfSelect, SfRadio } from "@storefront-ui/vue"
export default {
  name: "KiboShipping",
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    shippingMethods: {
      type: Array,
      default: () => [],
    },
    headingTitle: {
      type: String,
      default: "Shipping",
    },
    headingTitleLevel: {
      type: Number,
      default: 2,
    },
    inputsLabels: {
      type: Array,
      default: () => [
        "First name",
        "Last name",
        "Street name",
        "Apartment number",
        "City",
        "State/Province",
        "Zip-code",
        "Country",
        "Phone number",
      ],
    },
    selectLabel: {
      type: String,
      default: "Country",
    },
    countries: {
      type: Array,
      default: () => [],
    },
    methodsHeadingTitle: {
      type: String,
      default: "Shipping method",
    },
    methodsHeadingTitleLevel: {
      type: Number,
      default: 2,
    },
  },
  setup(props, context) {
    const firstName = ref("")
    const lastName = ref("")
    const streetName = ref("")
    const apartment = ref("")
    const city = ref("")
    const state = ref("")
    const zipCode = ref("")
    const country = ref("")
    const phoneNumber = ref("")
    const shippingMethod = ref({ name: "", code: "" })

    const updateField = (fieldName, fieldValue) => {
      context.emit("input", {
        ...props.value,
        [fieldName]: fieldValue,
      })
    }

    const saveShippingAddress = () => {
      context.emit("saveShippingAddress")
    }

    watch(props.value, () => {
      firstName.value = props.value.firstName
      lastNamefirstName.value = props.value.lastName
      streetNamefirstName.value = props.value.streetName
      cityfirstName.value = props.value.city
      statefirstName.value = props.value.state
      zipCodefirstName.value = props.value.zipCode
      countryfirstName.value = props.value.country
      phoneNumberfirstName.value = props.value.phoneNumber
      shippingMethodfirstName.value = props.value.shippingMethod
    })

    return {
      firstName,
      lastName,
      streetName,
      apartment,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      shippingMethod,
      updateField,
      saveShippingAddress,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfShipping.scss";
</style>

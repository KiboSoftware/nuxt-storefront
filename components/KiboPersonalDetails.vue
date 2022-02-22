<template>
  <div class="sf-personal-details">
    <div class="log-in">
      <slot name="log-in" v-bind="{ buttonText, logInInfo }">
        <SfButton
          class="log-in__button sf-button--full-width color-secondary"
          data-testid="login-button"
          @click="$emit('log-in')"
          >{{ buttonText }}</SfButton
        >
        <p class="log-in__info">{{ logInInfo }}</p>
      </slot>
    </div>
    <slot name="heading" v-bind="{ headingTitle, headingTitleLevel }">
      <SfHeading
        :title="headingTitle"
        :level="headingTitleLevel"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </slot>
    <div class="form">
      <slot name="form" v-bind="{ inputsLabels, additionalDetails, characteristics }">
        <SfInput
          :value="value.email"
          :label="inputsLabels[2]"
          name="email"
          class="form__element"
          required
          @input="updateField('email', $event)"
        />
        <div class="info">
          <slot name="additional-info" v-bind="{ additionalDetails, characteristics }">
            <p class="info__heading">
              {{ additionalDetails }}
            </p>
            <SfCharacteristic
              v-for="(characteristic, key) in characteristics"
              :key="key"
              :description="characteristic.description"
              :icon="characteristic.icon"
              :size-icon="characteristic.size"
              class="info__characteristic"
            />
          </slot>
        </div>

        <div class="account-info">
          <slot
            name="create-account"
            v-bind="{
              createAccountCheckboxLabel,
              transition,
              createAccountInputLabel,
            }"
          >
            <SfCheckbox
              v-model="createAccount"
              name="createAccount"
              :label="createAccountCheckboxLabel"
              class="form__checkbox"
              data-testid="create-account-checkbox"
              @change="$emit('create-account', createAccount)"
            />
            <br />
            <transition :name="transition">
              <div v-if="createAccount">
                <SfInput
                  :value="value.firstName"
                  :label="inputsLabels[0]"
                  name="firstName"
                  class="form__element form__element--half"
                  required
                  @input="updateField('firstName', $event)"
                />

                <SfInput
                  :value="value.lastName"
                  :label="inputsLabels[1]"
                  name="lastName"
                  class="form__element form__element--half"
                  required
                  @input="updateField('lastName', $event)"
                />

                <SfInput
                  :has-show-password="true"
                  type="password"
                  :label="createAccountInputLabel"
                  class="form__element"
                  required
                  data-testid="create-password-input"
                />
              </div>
            </transition>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { SfInput, SfCheckbox, SfButton, SfHeading, SfCharacteristic } from "@storefront-ui/vue"

export default {
  name: "KiboPersonalDetails",
  components: {
    SfInput,
    SfCheckbox,
    SfButton,
    SfHeading,
    SfCharacteristic,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    buttonText: {
      type: String,
      default: "Log into your account",
    },
    logInInfo: {
      type: String,
      default: "or fill the details below:",
    },
    headingTitle: {
      type: String,
      default: "Personal details",
    },
    headingTitleLevel: {
      type: Number,
      default: 2,
    },
    inputsLabels: {
      type: Array,
      default: () => ["First name", "Last name", "Your email"],
    },
    additionalDetails: {
      type: String,
      default: "Enjoy these perks with your free account!",
    },
    characteristics: {
      type: Array,
      default: () => [
        { description: "Faster checkout", icon: "clock", size: "24px" },
        {
          description: "Earn credits with every purchase",
          icon: "credits",
          size: "24px",
        },
        {
          description: "Full rewards program benefits",
          icon: "rewards",
          size: "24px",
        },
        { description: "Manage your wishlist", icon: "heart", size: "24px" },
      ],
    },
    transition: {
      type: String,
      default: "sf-fade",
    },
    createAccountCheckboxLabel: {
      type: String,
      default: "I want to create an account",
    },
    createAccountInputLabel: {
      type: String,
      default: "Create Password",
    },
  },
  setup(props, context) {
    const updateField = (fieldName, fieldValue) => {
      const values = {
        ...props.value,
        [fieldName]: fieldValue,
      }

      context.emit("input", values)
    }

    return {
      createAccount: false,
      updateField,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfPersonalDetails.scss";

.info {
  width: 100%;
}

.account-info {
  width: 100%;
}

.account-info > * {
  max-width: calc(var(--spacer-base) * 15.45);
}
</style>

<template>
  <div>
    <div v-if="!isReadonly" class="address-container">
      <div class="address-container__left">
        <div v-if="isDefaultAddress()" class="is-primary">{{ $t("Primary") }}</div>
        <p>{{ firstName }} {{ lastNameOrSurname }}</p>
        <p>{{ address1 }} {{ address2 }}</p>
        <p>{{ postalOrZipCode }}</p>
        <p>
          {{ cityOrTown }},
          {{ stateOrProvince }}
          <span v-if="phoneNumbers.home">{{ phoneNumbers.home }}</span>
        </p>
      </div>
      <div class="address-container__right">
        <div class="address-container__edit" @click="$emit('click:edit-address', address)">
          {{ $t("Edit") }}
        </div>
        <div
          v-show="!isDefaultAddress()"
          class="address-container__delete"
          @click="$emit('click:remove-address', address)"
        >
          <SfIcon size="1.25rem">
            <font-awesome-icon
              icon="trash"
              class="fa-solid"
              color="var(--_c-dark-green-secondary)"
            />
          </SfIcon>
        </div>
      </div>
    </div>
    <div v-else class="address-container">
      <div class="address-container__left">
        <SfRadio
          :key="address.address1"
          :label="address.address1"
          name="address"
          :selected="true"
          class="form__radio payment-method"
        >
          <template #label>
            <div class="radio-button">
              <div v-if="isDefaultAddress()" class="is-primary">{{ $t("Primary") }}</div>
              <p>{{ firstName }} {{ lastNameOrSurname }}</p>
              <p>{{ address1 }} {{ address2 }}</p>
              <p>{{ postalOrZipCode }}</p>
              <p>
                {{ cityOrTown }},
                {{ stateOrProvince }}
                <span v-if="phoneNumbers.home">{{ phoneNumbers.home }}</span>
              </p>
            </div>
          </template>
        </SfRadio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfIcon, SfRadio } from "@storefront-ui/vue"

import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "UserSavedAddress",
  components: {
    SfIcon,
    SfRadio,
  },
  props: {
    address: {
      type: Object,
      required: true,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const isDefaultAddress = () => {
      return false
    }
    return {
      firstName: props.address?.firstName,
      lastNameOrSurname: props.address?.lastNameOrSurname,
      phoneNumbers: props.address?.phoneNumbers,
      ...props.address?.address,
      isDefaultAddress,
    }
  },
})
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.phone {
  margin-top: var(--spacer-base);
}

.address-container {
  display: flex;

  &__left {
    flex: 90%;
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 10%;
  }

  &__edit {
    justify-content: center;
    text-decoration: underline;
    cursor: pointer;
  }
}

.is-primary {
  font-weight: bold;
  margin-bottom: var(--spacer-2xs);
}

.sf-radio {
  ::v-deep &__checkmark {
    margin-top: var(--spacer-base);
  }
}
</style>

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
        <div v-if="isDefaultAddress()" class="title">{{ $t("Your default shipping address") }}</div>
        <SfRadio
          :key="id"
          :value="id"
          :label="address1"
          name="address"
          class="sf-radio"
          selected=""
          @input="onSelect"
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
                <span v-if="phoneNumber">{{ phoneNumber }}</span>
              </p>
            </div>
          </template>
        </SfRadio>
        <div v-if="isDefaultAddress()" class="title">
          {{ $t("Previously saved shipping addresses") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfIcon, SfRadio } from "@storefront-ui/vue"
import { defineComponent } from "@vue/composition-api"
import { shopperContactGetters } from "@/lib/getters"

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

  setup(props, context) {
    const address = computed(() => shopperContactGetters.getAddressDetails(props.address))

    const isDefaultAddress = () => {
      return props.address?.types[0]?.isPrimary || false
    }

    const onSelect = () => {
      const { id, email, firstName, lastNameOrSurname, phoneNumbers, address } = props.address

      const selectedAddress = {
        id,
        email,
        firstName,
        lastNameOrSurname,
        phoneNumbers: { ...phoneNumbers },
        address: { ...address },
      }

      context.emit("onSelect", selectedAddress)
    }

    return {
      ...address.value,
      isDefaultAddress,
      onSelect,
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

    .title {
      margin: 16px 0;
      font-weight: bold;
    }
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

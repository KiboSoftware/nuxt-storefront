<template>
  <div>
    <div v-if="isReadonly" class="address-container">
      <div class="address-container__left">
        <SfRadio
          :key="id"
          :value="id.toString()"
          :label="address1"
          name="address"
          class="sf-radio"
          :selected="selectedAddressId"
          @input="onSelect"
        >
          <template #label>
            <div class="radio-button">
              <UserAddressView :address="address">
                <template #header>
                  <div v-if="isDefaultAddress" class="is-primary">{{ $t("Primary") }}</div>
                </template>
              </UserAddressView>
            </div>
          </template>
        </SfRadio>
      </div>
      <div class="address-container__right">
        <div class="address-container__edit" @click="$emit('click:edit-address', address)">
          {{ $t("Edit") }}
        </div>
      </div>
    </div>
    <div v-else class="address-container">
      <div class="address-container__left">
        <UserAddressView :address="address">
          <template #header>
            <div v-if="isDefaultAddress" class="is-primary">{{ $t("Primary") }}</div>
          </template>
        </UserAddressView>
      </div>
      <div class="address-container__right">
        <div class="address-container__edit" @click="$emit('click:edit-address', address)">
          {{ $t("Edit") }}
        </div>
        <div
          v-show="!isDefaultAddress"
          class="address-container__delete"
          @click="$emit('click:delete-address', address)"
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
  </div>
</template>

<script lang="ts">
import { SfIcon, SfRadio } from "@storefront-ui/vue"
import { defineComponent, computed } from "@vue/composition-api"
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
      default: () => {},
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    selectedAddressId: {
      type: String,
      default: "",
    },
  },

  setup(props, context) {
    const address = computed(() => shopperContactGetters.getAddressDetails(props.address))
    const isDefaultAddress = computed(() => {
      return (props.address?.types && props.address?.types[0]?.isPrimary) || false
    })

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
  padding-bottom: calc(var(--spacer-2xs) * 5);

  &__left {
    flex: auto;
    line-height: calc(var(--spacer-2xs) * 5.5);

    .title {
      margin: 16px 0;
      font-weight: bold;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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

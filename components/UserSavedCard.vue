<template>
  <div>
    <div v-if="!isReadonly" class="card-list">
      <div class="card-list__left">
        <div v-if="isDefaultCard()" class="is-primary">Primary</div>
        <div>Icon</div>
      </div>
      <div class="card-list__right">
        <div>{{ $t("Ending") }} :{{ card.endingDigit }}</div>
        <div>{{ $t("Exp") }} : {{ card.expiry }}</div>
        <div class="billing">
          <UserSavedAddress
            :key="billingAddress.id"
            :address="billingAddress"
            :is-readonly="true"
          />
        </div>
      </div>
      <div class="card-list__actions">
        <div class="card-list__edit" @click="$emit('click:edit-card', card)">
          {{ $t("Edit") }}
        </div>
      </div>
    </div>
    <div v-else class="card-list">
      <div class="card-list__left">
        <SfRadio
          :key="card.endingDigit"
          :label="card.endingDigit"
          name="payment-method"
          :selected="true"
          class="form__radio payment-method"
          @change="$emit('onSelect', card)"
        >
          <template #label>
            <div class="radio-button">
              <div v-if="isDefaultCard()" class="is-primary">Primary</div>
              <div>Icon</div>
              <div class="card-list__right">
                <div>{{ $t("Ending") }} :{{ card.endingDigit }}</div>
                <div>{{ $t("Exp") }} : {{ card.expiry }}</div>
              </div>
            </div>
            <div class="billing">
              <UserSavedAddress
                :key="billingAddress.id"
                :address="billingAddress"
                :is-readonly="true"
              />
            </div>
          </template>
        </SfRadio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api"
export default defineComponent({
  name: "UserSavedCard",
  props: {
    paymentMethod: {
      type: Object,
      default: () => {},
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const isDefaultCard = () => {
      return props.paymentMethod?.card?.isDefaultPaymentMethod || false
    }
    const card = computed(() => props.paymentMethod.card)
    const billingAddress = computed(() => props.paymentMethod.billingAddress)
    return {
      isDefaultCard,
      card,
      billingAddress,
    }
  },
})
</script>

<style lang="scss" scoped>
.is-primary {
  font-weight: bold;
  margin-bottom: var(--spacer-2xs);
}

.card-list {
  display: flex;

  &__left {
    flex: 1;
  }

  &__right {
    flex: 4;
  }

  &__actions {
    display: flex;
    justify-content: space-around;
    flex: 1;
  }

  &__edit {
    justify-content: center;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

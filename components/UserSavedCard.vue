<template>
  <div>
    <div v-if="isReadonly" class="card-list">
      <div class="card-list__content">
        <SfRadio
          :key="card.id"
          :label="card.cardNumberPart"
          name="payment-method"
          selected=""
          class="form__radio payment-method"
          @change="$emit('onSelect', card)"
        >
          <template #label>
            <div class="radio-button">
              <UserCardView :key="'card' + card.id" :payment-card="card">
                <template #header>
                  <div v-if="isDefaultCard" class="is-primary">{{ $t("Primary") }}</div>
                </template>
                <template #card-type>
                  <SfBadge class="sf-badge color-secondary"
                    ><span class="card-type">{{ card.cardType }}</span></SfBadge
                  >
                </template>

                <template #billing-address>
                  <div class="billing">
                    <UserAddressView
                      :key="billingAddress.id"
                      :address="billingAddress"
                      :is-readonly="true"
                    />
                  </div>
                </template>
              </UserCardView>
            </div>
          </template>
        </SfRadio>
      </div>
    </div>
    <div v-else class="card-list">
      <div class="card-list__content">
        <UserCardView :payment-card="card">
          <template #header>
            <div v-if="isDefaultCard" class="is-primary">{{ $t("Primary") }}</div>
          </template>
          <template #card-type>
            <SfBadge class="sf-badge color-secondary"
              ><span class="card-type">{{ cardType }}</span></SfBadge
            >
          </template>
          <template #billing-address>
            <div class="billing">
              <UserAddressView
                :key="billingAddress.id"
                :address="billingAddress"
                :is-readonly="true"
              />
            </div>
          </template>
        </UserCardView>
      </div>
      <div class="card-list__actions">
        <div class="card-list__edit" @click="$emit('click:edit-card', paymentMethod)">
          {{ $t("Edit") }}
        </div>
        <div
          v-show="!isDefaultCard"
          class="card-list__delete"
          @click="$emit('click:delete-card', paymentMethod)"
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
import { defineComponent, computed } from "@vue/composition-api"
import { SfBadge, SfRadio, SfIcon } from "@storefront-ui/vue"
import { creditCardPaymentGetters } from "@/lib/getters"

export default defineComponent({
  name: "UserSavedCard",
  components: {
    SfBadge,
    SfRadio,
    SfIcon,
  },
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
    const { card, billingAddress } = props.paymentMethod

    const isDefaultCard = computed(() => {
      return card?.isDefaultPayMethod || false
    })

    const cardType = computed(() => creditCardPaymentGetters.getCardType(card))

    return {
      isDefaultCard,
      card,
      billingAddress,
      cardType,
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

  &__content {
    flex: auto;

    .sf-badge {
      --badge-color: var(--c-white);
      --badge-padding: var(--spacer-xs);
      --badge-width: calc(var(--spacer-sm) * 3);
      --badge-height: var(--spacer-lg);

      font-size: var(--font-size--xs);
      font-style: italic;
      border-radius: var(--spacer-2xs);
    }
  }

  &__content {
    flex: auto;

    .sf-badge {
      --badge-color: var(--c-white);
      --badge-padding: var(--spacer-xs);
      --badge-width: calc(var(--spacer-sm) * 3);
      --badge-height: var(--spacer-lg);

      font-size: var(--font-size--xs);
      font-style: italic;
      border-radius: var(--spacer-2xs);
    }
  }

  &__actions {
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

.billing {
  margin-top: var(--spacer-xs);
}

.card-type {
  overflow-wrap: break-word;
  overflow: hidden;
}
</style>

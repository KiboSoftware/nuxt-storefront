<template>
  <div class="sf-confirm-order" data-testid="confirm-order">
    <SfHeading
      :title="$t('Order Details')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <div class="row">
      <div class="column">
        <KiboOrderLineItems :order="order" />
      </div>
      <div class="column">
        <div class="shipping-address">{{ $t("Billing Address") }}</div>
        <div class="addres-view">
          <p>{{ billingAddress.value.firstName }} {{ billingAddress.value.lastNameOrSurname }}</p>
          <p>
            {{ billingAddress.value.address.address1 }} {{ billingAddress.value.address.address2 }}
          </p>
          <p>{{ billingAddress.value.address.postalOrZipCode }}</p>
          <p>
            {{ billingAddress.value.address.cityOrTown }},
            {{ billingAddress.value.address.stateOrProvince }}
            <span v-if="phoneNumber">{{ billingAddress.value.phoneNumber.value }}</span>
          </p>
        </div>
      </div>

      <div class="column">
        <div class="shipping-address">{{ $t("Payment") }}</div>
        <div class="addres-view">
          <p>Payment Type: {{ payment.value.paymentType }}</p>
          <p>Card Number: ****************{{ cardNumber }}</p>
          <p>CardType: {{ payment.value.card.cardType }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="addres-view">
          <slot name="header" />
          <p>{{  billingAddress.value.value.firstName }} {{  billingAddress.value.value.lastNameOrSurname }}</p>
          <p>{{  billingAddress.value.address.address1 }} {{  billingAddress.value.address.address2 }}</p>
          <p>{{  billingAddress.value.address.postalOrZipCode }}</p>
          <p>
           {{  billingAddress.value.address.cityOrTown }},
           {{  billingAddress.value.address.stateOrProvince }}
      <span v-if="phoneNumber">{{  billingAddress.value.phoneNumbers.home }}</span>
    </p>
  </div> -->
    <!-- <hr class="hr-order" />
    <div class="order-total">
      <SfProperty
        :name="$t('Subtotal')"
        :value="$n(order.subtotal, 'currency')"
        class="sf-property--full-width sf-confirm-order__property sf-confirm-order__property-subtotal"
      >
      </SfProperty>
      <SfProperty
        :name="$t('Shipping')"
        :value="$n(order.shippingTotal, 'currency')"
        class="sf-property--full-width sf-confirm-order__property"
      >
      </SfProperty>
      <SfProperty
        :value="$n(order.taxTotal, 'currency')"
        class="sf-property--full-width sf-confirm-order__property"
      >
        <template #name>
          <div class="sf-property__name">
            {{ $t("Estimated Tax") }}
            <SfBadge class="sf-badge--number sf-badge color-secondary tax-badge">i</SfBadge>
          </div>
        </template>
      </SfProperty>
      <SfDivider class="sf-confirm-order__divider" />
      <SfProperty
        :name="$t('Total Price')"
        :value="$n(order.total, 'currency')"
        class="sf-property--full-width sf-property--large sf-confirm-order__property-total"
      >
      </SfProperty>
   
    </div> -->
    <slot name="others" />
  </div>
</template>

<script lang="ts">
import { SfHeading } from "@storefront-ui/vue"
import { onUnmounted } from "@vue/composition-api"

export default {
  name: "KiboConfirmOrder",
  components: {
    SfHeading,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const billingAddress = JSON.parse(localStorage.getItem("Address"))
    const payment = JSON.parse(localStorage.getItem("Payment"))
    const cardNumber = payment.value.card.cardNumber.slice(12, 16)

    onUnmounted(() => {
      localStorage.clear()
    })

    return {
      billingAddress,
      payment,
      cardNumber,
    }
  },
}
</script>

<style lang="scss" scoped>
.sf-confirm-order {
  padding: calc(var(--spacer-base) * 1.66) 0 var(--spacer-sm) 0;
}

.sf-divider {
  border-color: var(--_c-green-primary);
}

.sf-heading {
  &__title {
    margin-bottom: var(--spacer-base);
  }
}

.order-total {
  @include for-desktop {
    width: calc(var(--spacer-base) * 17.54);
  }
}

.hr-order {
  color: var(--_c-green-primary);
  background-color: var(--_c-green-primary);
  margin-left: 0;
  @include for-desktop {
    width: calc(var(--spacer-base) * 17.54);
  }
}

.tax-badge {
  position: absolute;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.column {
  @include for-desktop {
    float: left;
    width: 30.33%;
    padding: 10px;
    height: 300px; /* Should be removed. Only for demonstration */
  }
  @include for-mobile {
    height: 210px;
  }
}

/* Clear floats after the columns */
.row::after {
  content: "";
  display: table;
  clear: both;
}

p {
  margin: 3px;
}

.shipping-address {
  font-weight: bold;
  padding-bottom: var(--spacer-sm);
  padding-top: 58px;
}

.sf-heading__title.h2 {
  margin-top: 18px;
  margin-left: -640px;
  font-size: 20px !important;
  text-align: left !important;
  @include for-mobile {
    margin-top: 77px;
    margin-left: -270px;
  }
}

::v-deep .sf-checkbox__container {
  @include for-desktop {
    float: right;
    margin-right: -300px;
    z-index: 1;
    margin-top: 5px;
  }
}
</style>

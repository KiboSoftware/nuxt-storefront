<template>
  <div>
    <div v-if="isDefaultCard()" class="is-primary">Primary</div>
    <div class="card-list">
      <div class="card-list__left">
        <div>Icon</div>
      </div>
      <div class="card-list__right">
        <div>{{ $t("Ending") }} :{{ paymentMethod.endingDigit }}</div>
        <div>{{ $t("Exp") }} : {{ paymentMethod.expiry }}</div>
      </div>
      <div v-if="showActions" class="card-list__actions">
        <div class="card-list__edit" @click="$emit('click:edit-card', paymentMethod)">
          {{ $t("Edit") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
export default defineComponent({
  name: "UserSavedCard",
  props: {
    paymentMethod: {
      type: Object,
      default: () => {},
    },
    showActions: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const isDefaultCard = () => {
      return false
    }
    return {
      isDefaultCard,
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

<template>
  <div>
    <div v-if="isDefaultCard" class="is-primary">Primary</div>
    <div class="card-list">
      <div class="card-list__left">
        <div>Icon</div>
      </div>
      <div class="card-list__right">
        <div>Ending :{{ paymentMethod.endingDigit }}</div>
        <div>Exp : {{ paymentMethod.expiry }}</div>
      </div>
      <div v-if="showActions" class="card-list__actions">
        <div class="card-list__edit" @click="$emit('click:edit-card', paymentMethod)">Edit</div>
      </div>
    </div>
  </div>
</template>

<script>
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
    const isDefaultCard = () => false
    return {
      isDefaultCard,
    }
  },
})
</script>

<style lang="scss" scoped>
.is-primary {
  font-weight: bold;
}

.card-list {
  display: flex;
  flex-direction: row;

  &__left {
    flex: 1;
  }

  &__right {
    flex: 4;
  }

  &__actions {
    flex: 1;
  }

  &__edit {
    justify-content: center;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

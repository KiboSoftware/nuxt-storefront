<template>
  <div class="profile">
    <div class="profile-list">
      <div class="profile-list__header">Customer Name</div>
      <div class="profile-list__subheader">
        <div>{{ user.firstName }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-name', user)">Edit</div>
      </div>
    </div>
    <div class="profile-list">
      <div class="profile-list__header">Email</div>
      <div class="profile-list__subheader">
        <div>{{ user.emailAddress }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-email', user)">Edit</div>
      </div>
    </div>
    <div class="profile-list">
      <div class="profile-list__header">Phone Number</div>
      <div class="profile-list__subheader">
        <div>{{ user.phoneNumber }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-phone', user)">Edit</div>
      </div>
    </div>
    <div class="profile-list">
      <div class="profile-list__header">Password</div>
      <div class="profile-list__subheader">
        <div>{{ user.password }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-password', user)">Edit</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api"
export default defineComponent({
  name: "KiboMyProfile",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  setup() {
    return {}
  },
})
</script>
<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-list {
  display: flex;
  flex-direction: column;
  color: #2b2b2b;
  font-family: var(--font-family--primary);
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  gap: 8px;

  @include for-mobile {
    margin: 10px 0;
  }

  &__header {
    font-weight: 500;
  }

  &__subheader {
    display: flex;
    justify-content: space-between;
  }

  &__link {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

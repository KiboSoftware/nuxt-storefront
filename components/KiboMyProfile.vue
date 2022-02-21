<template>
  <div class="profile">
    <div class="profile-list">
      <div class="profile-list__header">{{ $t("Customer Name") }}</div>
      <div class="profile-list__subheader">
        <div>{{ user.firstName }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-name', user)">
          {{ $t("Edit") }}
        </div>
      </div>
    </div>
    <div class="profile-list">
      <div class="profile-list__header">{{ $t("Email") }}</div>
      <div class="profile-list__subheader">
        <div>{{ user.emailAddress }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-email', user)">
          {{ $t("Edit") }}
        </div>
      </div>
    </div>
    <div class="profile-list">
      <div class="profile-list__header">{{ $t("Phone Number") }}</div>
      <div class="profile-list__subheader">
        <div>{{ user.phoneNumber }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-phone', user)">
          {{ $t("Edit") }}
        </div>
      </div>
    </div>
    <div class="profile-list">
      <div class="profile-list__header">{{ $t("Password") }}</div>
      <div class="profile-list__subheader">
        <div>{{ user.password }}</div>
        <div class="profile-list__link" @click="$emit('click:edit-user-password', user)">
          {{ $t("Edit") }}
        </div>
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
})
</script>
<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-2xs);
}

.profile-list {
  display: flex;
  flex-direction: column;
  color: var(--c-black);
  font-size: var(--font-size--base);
  line-height: calc(var(--spacer-sm) + (var(--spacer-base) / 8));
  text-align: left;
  gap: var(--spacer-xs);

  @include for-mobile {
    margin: calc(var(--spacer-2xs) * 2.5) 0;
  }

  &__header {
    color: var(--c-black);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--lg);
    line-height: calc(var(--spacer-2xs) * 5.5);
    text-align: left;
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

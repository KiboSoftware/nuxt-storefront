<template>
  <transition name="fade">
    <div class="modal" v-if="popupDisplay">
      <div class="modal__backdrop" @click="closeModal()" />

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header" />
          <a class="modal__close" @click="closeModal()"> X </a>
        </div>

        <div class="modal__body">
          <slot name="body" />
        </div>

        <div class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      popupDisplay: false,
    }
  },
  methods: {
    closeModal() {
      this.popupDisplay = false
      document.documentElement.style.overflow = "auto"
      document.querySelector("body").classList.remove("overflow-hidden")
    },
    openModal() {
      this.popupDisplay = true
      document.documentElement.style.overflow = "hidden"
      document.querySelector("body").classList.add("overflow-hidden")
    },
    openpopup() {
      this.popupDisplay = true
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;

  &__backdrop {
    background-color: #0004;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  &__dialog {
    margin-top: 150px;
    margin-left: 500px;
    height: 350px;
    background-color: #fff;
    position: relative;
    width: 35%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 10;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }

  &__close {
    margin-left: 72rem;
    font-weight: 700;
    cursor: pointer;
    width: 30px;
    height: 30px;
  }

  &__header {
    padding: 20px 20px 10px;
    display: flex;
    justify-content: space-between;
  }

  &__body {
    margin-top: -12px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__footer {
    padding: 10px 20px 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

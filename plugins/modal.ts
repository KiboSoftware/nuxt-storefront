<<<<<<< HEAD
import Vue from "vue"
import { defineNuxtPlugin } from "#app"

/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineNuxtPlugin((nuxtApp: any) => {
  const modal = {
    subscription: new Vue(),
    show({ component, title, props }) {
      this.subscription.$emit("open", {
        component,
        title,
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineNuxtPlugin } from "#app"
import { ModalBus } from "@/eventBus/eventBus"

export default defineNuxtPlugin((nuxtApp: any) => {
  const modal = {
    show: ({ component, props }) => {
      ModalBus.$emit("open", {
        component,
>>>>>>> 01579bf (feat(fulfillmentOptions): PDP fulfillmentOptions implementation)
        props,
      })
    },
  }
  nuxtApp.provide("modal", modal)
})

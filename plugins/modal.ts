import Vue from "vue"
import { defineNuxtPlugin } from "#app"

/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineNuxtPlugin((nuxtApp: any) => {
  const modal = {
    subscription: new Vue(),
    show({ component, props }) {
      this.subscription.$emit("open", {
        component,
        props,
      })
    },
  }
  nuxtApp.provide("modal", modal)
})

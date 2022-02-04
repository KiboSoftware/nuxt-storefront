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
        props,
      })
    },
  }
  nuxtApp.provide("modal", modal)
})

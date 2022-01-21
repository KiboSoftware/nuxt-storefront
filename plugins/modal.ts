/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineNuxtPlugin } from "#app"
import { ModalBus } from "@/eventBus/eventBus"

export default defineNuxtPlugin((nuxtApp: any) => {
  const modal = {
    show: ({ component, props }) => {
      ModalBus.$emit("open", {
        component,
        props,
      })
    },
  }
  nuxtApp.provide("modal", modal)
})

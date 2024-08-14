// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path"

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY || '/services/'
    }
  },
  alias: {
    //auto import feature
    '@': resolve(__dirname, "/")
  },
  css: [
  ]
})

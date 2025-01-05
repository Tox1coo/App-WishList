export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@nuxt/icon"
  ],
  css: [
      "~/assets/scss/main.scss",
  ],
  supabase: {
    redirect: false
  }
})
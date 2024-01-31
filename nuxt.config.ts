// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  runtimeConfig: {
    public: {
      keyFirebase: process.env.NUXT_KEY_FIREBASE,
      KEY_YOUTUBE: process.env.KEY_YOUTUBE,
    },
  },
});

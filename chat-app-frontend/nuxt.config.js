module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "chat-app-frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },

  modules: [
    "nuxt-leaflet",
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "vue-browser-detect-plugin/nuxt",
  ],

  axios: {
    host: "localhost",
    port: 5000,
  },

  // proxy: {
  //   "/cable": {
  //     target: "http://localhost:5000",
  //     ws: true,
  //   },
  // },

  plugins: [{ src: "~/plugins/consumer" }],

  css: ["~/assets/css/main.scss"],

  ssr: false,
};

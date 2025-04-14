// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        port: 3109,
    },
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: false,
    modules: [
        "@nuxt/eslint",
        "@vite-pwa/nuxt",
        "@nuxtjs/tailwindcss",
        "shadcn-nuxt",
        "@pinia/nuxt",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@vueuse/nuxt",
        "@nuxtjs/mdc",
    ],
    colorMode: {
        fallback: "dark",
        classSuffix: "",
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: "./components/ui",
    },
    css: ["@/assets/css/global.scss"],
    app: {
        pageTransition: {
            name: "page",
            mode: "out-in",
        },
    },
    pwa: {
        devOptions: {
            enabled: true,
        },
        registerType: "autoUpdate",
        manifest: {
            name: "RE:FIT",
            short_name: "RE:FIT",
            lang: "ru",
            description: "Переосмысли свой воркаут с RE:FIT!",
            theme_color: "#6D28D9",
            icons: [
                {
                    src: "pwa-64x64.png",
                    sizes: "64x64",
                    type: "image/png",
                },
                {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "maskable-icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                },
                {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
            ],
            screenshots: [
                {
                    src: "screenshot-landscape.png",
                    sizes: "2560x1440",
                    form_factor: "wide",
                },
                {
                    src: "screenshot-portrait.png",
                    sizes: "1170x2532",
                    form_factor: "narrow",
                },
            ],
        },
    },
});

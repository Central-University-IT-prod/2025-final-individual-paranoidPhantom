import {
    createAppleSplashScreens,
    defineConfig,
    minimal2023Preset,
    AllAppleDeviceNames,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
    headLinkOptions: {
        preset: "2023",
    },
    preset: {
        ...minimal2023Preset,
        apple: {
            sizes: [180],
            padding: 0,
        },
        maskable: {
            resizeOptions: {
                background: "#6D28D9",
            },
            sizes: [512],
        },
        appleSplashScreens: createAppleSplashScreens(
            {
                padding: 0.3,
                resizeOptions: { background: "#6D28D9", fit: "contain" },
                linkMediaOptions: {
                    log: true,
                    addMediaScreen: true,
                    basePath: "/",
                    xhtml: false,
                },
                png: {
                    compressionLevel: 9,
                    quality: 60,
                },
                name: (landscape, size, dark) => {
                    return `apple-splash-${
                        landscape ? "landscape" : "portrait"
                    }-${size.width}x${size.height}.png`;
                },
            },
            AllAppleDeviceNames
        ),
    },
    images: ["public/favicon.svg"],
});

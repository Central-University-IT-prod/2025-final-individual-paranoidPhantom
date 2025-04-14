export const exerciseTagImages = {
    byceps: {
        label: "На бицепс",
        graphic: "/media/visualization/byc.svg",
    },
    core: { label: "На кор", graphic: "/media/visualization/core.svg" },
    hand: { label: "На руки", graphic: "/media/visualization/hand.svg" },
    heel: { label: "На ноги", graphic: "/media/visualization/heel.svg" },
    theigh: { label: "На бедра", graphic: "/media/visualization/theigh.svg" },
    back: { label: "На спину", graphic: "/media/visualization/back.svg" },
    triceps: { label: "На трицепс", graphic: "/media/visualization/tri.svg" },
    body: { label: "На грудь", graphic: "/media/visualization/body.svg" },
    root: { graphic: "/media/visualization/root.svg" },
} as const;

export const exerciseTags: Omit<typeof exerciseTagImages, "root"> = {
    ...exerciseTagImages,
};

export default () => exerciseTags;

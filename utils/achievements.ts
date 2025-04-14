export const useAchievementBalance = () => ({
    time: [1200, 2400, 7200, 21600, 64800],
    arms: [100, 200, 400, 1000, 3000],
    legs: [100, 200, 400, 1000, 3000],
    core: [100, 200, 400, 1000, 3000],
    shop: [2, 4, 6, 8, 14],
});

export const useAchievmentStages = () => [
    { name: "Бронза", image: "/media/achievements/Bronze.svg" },
    { name: "Серебро", image: "/media/achievements/Silver.svg" },
    { name: "Золото", image: "/media/achievements/Gold.svg" },
    { name: "Платина", image: "/media/achievements/Platinum.svg" },
    { name: "IMOEX", image: "/media/achievements/IMOEX.svg" },
];

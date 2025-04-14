export const exerciseDifficulties: Record<number, string> = {
    1: "/media/difficulty/easy.svg",
    2: "/media/difficulty/easy.svg",
    3: "/media/difficulty/easy.svg",
    4: "/media/difficulty/easy.svg",
    5: "/media/difficulty/medium.svg",
    6: "/media/difficulty/medium.svg",
    7: "/media/difficulty/medium.svg",
    8: "/media/difficulty/hard.svg",
    9: "/media/difficulty/hard.svg",
    10: "/media/difficulty/hard.svg",
};

export default (index: number) => exerciseDifficulties[index];

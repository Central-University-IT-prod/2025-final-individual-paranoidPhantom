import { defineStore } from "pinia";

export const useAchievmentsStore = defineStore("Achievments", () => {
    const balance = useAchievementBalance();
    const metrics = useLocalStorage("achievmentsMetrics", () => ({
        totalTimeInExecution: 0,
        armTotal: 0,
        legTotal: 0,
        coreTotal: 0,
    }));

    const { ownedItems } = toRefs(useShopStore());

    const calculateMetricDetails = (metric: number, targetArray: number[]) => {
        const hierarchy = [...targetArray, metric].toSorted((a, b) => a - b);
        const level = hierarchy.findIndex((value) => value === metric);
        const predecessor = hierarchy[level - 1] ?? 0;
        const progressBarTotal = (hierarchy[level + 1] ?? metric) - predecessor;
        const progressBarFilled = metric - predecessor;
        return { level, progressBarTotal, progressBarFilled, metric };
    };

    const currentArmState = computed(() =>
        calculateMetricDetails(metrics.value.armTotal, balance.arms)
    );
    const currentLegState = computed(() =>
        calculateMetricDetails(metrics.value.legTotal, balance.legs)
    );
    const currentCoreState = computed(() =>
        calculateMetricDetails(metrics.value.coreTotal, balance.core)
    );
    const currentTimeState = computed(() =>
        calculateMetricDetails(metrics.value.totalTimeInExecution, balance.time)
    );
    const currentShopState = computed(() =>
        calculateMetricDetails(ownedItems.value.length, balance.shop)
    );

    return {
        metrics,
        currentArmState,
        currentLegState,
        currentCoreState,
        currentTimeState,
        currentShopState,
    };
});

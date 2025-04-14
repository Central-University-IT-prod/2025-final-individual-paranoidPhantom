<script lang="ts" setup>
const { currency: userCurrency } = toRefs(useUserStore());
const { builder } = useFlowStore();
const { exercises } = builder;

const quotes = useInspirationalQuotes();

const randomQuoteIndex = () => Math.floor(Math.random() * quotes.length);

// Handle state locally beacuse I can't imagine a planned use case for making it global
const state = reactive<{
    currentIndex: number;
    startedTick: number;
    globalStartedTick: number;
    globalEndedTick: number;
    quoteIndex: number;
    skippedIndexes: number[];
    resting: boolean;
    resultOverview: string | undefined;
    resultCurrency: number | undefined;
}>({
    currentIndex: 0,
    startedTick: 0,
    globalStartedTick: Date.now(),
    globalEndedTick: 0,
    quoteIndex: randomQuoteIndex(),
    skippedIndexes: [],
    resting: false,
    resultOverview: undefined,
    resultCurrency: undefined,
});

const secondsPassed = computedWithControl(
    () => undefined,
    () => {
        return Math.floor((Date.now() - state.startedTick) / 1000);
    }
);

const prepInSeconds = 5;

const interval = ref();

onMounted(() => {
    if (!interval.value)
        interval.value = setInterval(() => secondsPassed.trigger(), 100);
});

onUnmounted(() => {
    if (interval.value) clearInterval(interval.value);
});

const currentExercise = computed(() => exercises[state.currentIndex]);
const currentExerciseData = computed(() =>
    useExercise(exercises[state.currentIndex].id)
);

const { metrics } = toRefs(useAchievmentsStore());

const onNextExercise = async (skip?: boolean) => {
    if (!state.resting && skip === true) {
        console.log("pushing to skipped", state.currentIndex);
        state.skippedIndexes.push(state.currentIndex);
    }
    if (state.currentIndex < exercises.length - 1) {
        if (state.resting) {
            state.startedTick = Date.now() + prepInSeconds * 1000;
            secondsPassed.trigger();
            state.resting = false;
            state.quoteIndex = randomQuoteIndex();
            state.currentIndex++;
        } else {
            state.startedTick = Date.now();
            secondsPassed.trigger();
            state.resting = true;
        }
    } else {
        // Finish workout
        state.currentIndex++;
        state.globalEndedTick = Date.now();
        const trainingTime = Math.floor(
            (state.globalEndedTick - state.globalStartedTick) / 1000
        );
        let generated = await useGenerateOverview(
            trainingTime,
            state.skippedIndexes
        );
        while (!generated) {
            generated = await useGenerateOverview(
                trainingTime,
                state.skippedIndexes
            );
        }
        if (generated) {
            const { overview, currency, armTotal, legTotal, coreTotal } =
                generated;
            userCurrency.value += currency;
            state.resultOverview = overview;
            state.resultCurrency = currency;
            metrics.value.armTotal += armTotal;
            metrics.value.legTotal += legTotal;
            metrics.value.coreTotal += coreTotal;
            metrics.value.totalTimeInExecution += trainingTime;
        }
    }
};

watch(secondsPassed, (newSecondsPassed) => {
    if (
        currentExercise.value &&
        (currentExercise.value.config.type === "timer" ||
            currentExercise.value.config.type === "distance") &&
        newSecondsPassed >= currentExercise.value.config.time
    ) {
        onNextExercise();
    }
    if (state.resting && newSecondsPassed >= currentExercise.value.break) {
        onNextExercise();
    }
});

const message = computed(() => {
    if (currentExercise.value.config.type === "distance")
        return `${currentExercise.value.config.distance} км`;
    else if (currentExercise.value.config.type === "reps")
        return `${currentExercise.value.config.count} повторений`;
    else if (currentExercise.value.config.type === "weight")
        return `${currentExercise.value.config.weight} кг`;
    else return "";
});

const preparing = computed(() => secondsPassed.value < 0);
</script>

<template>
    <div class="__execute h-screen">
        <div class="gradient-css" />
        <img class="absolute w-full h-screen -z-10" src="/media/gradient.png" />
        <CommonGenericScreenLayout>
            <div
                class="absolute top-8 w-full max-w-[500px] left-1/2 -translate-x-1/2 opacity-20"
            >
                <HomeAvatar v-if="!state.resting" />
            </div>
            <Transition name="exercise" mode="out-in">
                <div
                    v-if="currentExercise"
                    :key="state.currentIndex"
                    class="flex flex-col items-center justify-center gap-4 max-w-[600px] mx-auto"
                >
                    <div class="ml-auto">
                        <CommonActionConfirmation
                            title="Вы уверены?"
                            description="Вы потеряете прогресс который успели сделать"
                            class="ml-auto"
                            @confirm="navigateTo('/')"
                        >
                            <Button size="icon" variant="destructive">
                                <Icon name="akar-icons:stop-fill" />
                            </Button>
                        </CommonActionConfirmation>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center gap-2. h-96"
                    >
                        <template
                            v-if="
                                currentExercise.config.type === 'timer' ||
                                currentExercise.config.type === 'distance' ||
                                state.resting
                            "
                        >
                            <Transition name="scale" mode="out-in">
                                <PrimitiveTimeDisplay
                                    v-if="state.resting"
                                    :filled="
                                        currentExercise.break - secondsPassed
                                    "
                                    :overall="currentExercise.break"
                                />
                                <PrimitiveTimeDisplay
                                    v-else-if="
                                        currentExercise.config.type ===
                                            'timer' ||
                                        currentExercise.config.type ===
                                            'distance'
                                    "
                                    :key="`timer_${preparing}`"
                                    :filled="
                                        preparing
                                            ? -secondsPassed
                                            : currentExercise.config.time -
                                              secondsPassed
                                    "
                                    :overall="
                                        preparing
                                            ? 5
                                            : currentExercise.config.time
                                    "
                                />
                            </Transition>
                            <Transition name="scale" mode="out-in">
                                <p v-if="preparing && !state.resting">
                                    Готовься!
                                </p>
                            </Transition>
                        </template>
                        <p
                            v-if="message && !state.resting"
                            class="text-xl font-bold opacity-70"
                        >
                            {{ message }}
                        </p>
                    </div>
                    <h2
                        class="text-center scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
                    >
                        {{
                            state.resting ? "Отдых" : currentExerciseData?.name
                        }}
                    </h2>
                    <p
                        v-if="
                            state.currentIndex < exercises.length - 1 &&
                            !state.resting
                        "
                        class="w-3/4 text-center opacity-40"
                    >
                        Следующее:
                        {{
                            useExercise(exercises[state.currentIndex + 1].id)
                                ?.name
                        }}
                    </p>
                    <Separator class="bg-foreground opacity-15 w-3/4" />
                    <p class="w-3/4 text-center opacity-40">
                        {{ quotes[state.quoteIndex] }}
                    </p>
                </div>
                <div
                    v-else
                    class="flex flex-col items-center justify-center gap-4 max-w-[600px] mx-auto py-24"
                >
                    <h2
                        class="text-center scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
                    >
                        Вы молодец!
                    </h2>
                    <Separator class="bg-foreground opacity-15 w-3/4" />
                    <p>
                        Тренировка длилась
                        {{
                            useTimeFmt(
                                Math.floor(
                                    (state.globalEndedTick -
                                        state.globalStartedTick) /
                                        1000
                                )
                            )
                        }}
                    </p>
                    <Transition name="scale" mode="out-in">
                        <p v-if="state.resultOverview" class="w-3/4">
                            {{ state.resultOverview }}
                        </p>
                        <p v-else class="flex gap-4 items-center opacity-50">
                            <Icon name="svg-spinners:ring-resize" />
                            ИИ тренер печатает...
                        </p>
                    </Transition>
                    <TransitionGroup name="scale" mode="out-in">
                        <Separator
                            v-if="state.resultCurrency"
                            class="bg-foreground opacity-15 w-3/4"
                        />
                        <p v-if="state.resultCurrency">
                            Начислено
                            <PrimitiveCurrencyAmount
                                :amount="state.resultCurrency"
                            />
                        </p>
                    </TransitionGroup>
                </div>
            </Transition>
            <template #bottom>
                <div class="flex items-center gap-2 max-w-[1200px]">
                    <Transition name="scale" mode="out-in">
                        <CommonActionConfirmation
                            v-if="currentExercise"
                            title="Пропустить упражнение?"
                            :description="quotes[state.currentIndex]"
                            action="Пропустить"
                            @confirm="onNextExercise(true)"
                        >
                            <Button size="lg" variant="destructive">
                                <Icon name="mdi:skip-next" />
                            </Button>
                        </CommonActionConfirmation>
                    </Transition>
                    <Transition name="scale">
                        <NuxtLink
                            v-if="
                                (!currentExercise ||
                                    currentExercise.config.type == 'reps' ||
                                    currentExercise.config.type == 'weight') &&
                                !state.resting
                            "
                            class="w-full"
                            :to="currentExercise ? '' : '/'"
                        >
                            <Button
                                class="w-full"
                                size="lg"
                                variant="outline"
                                @click="onNextExercise"
                            >
                                {{ currentExercise ? "Готово" : "Домой" }}
                            </Button>
                        </NuxtLink>
                    </Transition>
                </div>
            </template>
        </CommonGenericScreenLayout>
    </div>
</template>

<style lang="scss" scoped>
.__execute {
    .gradient-css {
        background: linear-gradient(
            0deg,
            #22aed151 0%,
            #22aed164 10%,
            #ee843464 30%,
            #6d28d964 70%,
            #6c28d92a 100%
        );
        @apply -z-20 w-full h-screen absolute blur-3xl;
    }
}

.exercise-enter-from {
    translate: -20% 0;
    filter: blur(1rem);
    opacity: 0;
    scale: 0.8;
}

.exercise-leave-to {
    translate: 20% 0;
    filter: blur(1rem);
    opacity: 0;
    scale: 1.05;
}

.exercise-enter-active,
.exercise-leave-active {
    transition: all 0.3s;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    scale: 0.9;
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s;
}
</style>

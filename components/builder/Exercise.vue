<script lang="ts" setup>
import type { OperationalExercise } from "~/types/exercise";

interface Props extends OperationalExercise {
    index: number;
}

const { index, id: exerciseId, config } = defineProps<Props>();

const exercise = computed(() => useExercise(exerciseId));

const { builder } = toRefs(useFlowStore());

const onViewDetails = () => {
    builder.value.sheet.open = true;
    builder.value.sheet.tab = "details";
    builder.value.sheet.details.index = index;
    builder.value.sheet.details.configCopy = {
        ...builder.value.exercises[index].config,
    };
};

const configStringified = computed(() => {
    if (config.type === "timer") return useTimeFmt(config.time);
    else if (config.type === "reps") return config.count;
    else if (config.type === "distance")
        return `${config.distance} км за ${useTimeFmt(config.time)}`;
    else if (config.type === "weight") return `${config.weight} кг`;
    return "";
});
</script>

<template>
    <Alert class="cursor-pointer" @click="onViewDetails">
        <div v-if="exercise" class="flex items-center gap-2">
            <CommonExerciseDetails v-bind="exercise" />
            <Button class="handle ml-auto" variant="secondary" size="icon">
                <Icon name="line-md:double-arrow-vertical" />
            </Button>
            <Button variant="secondary">
                {{ configStringified }}
            </Button>

            <HoverCard
                v-for="(warning, alternateIndex) in builder.warnings.filter(
                    (w) => w.index === index
                )"
                :key="`${warning.index}_${alternateIndex}`"
            >
                <HoverCardTrigger as-child>
                    <Button
                        class="ml-4"
                        :variant="
                            warning.severity === 1 ? 'outline' : 'destructive'
                        "
                    >
                        <span class="sr-only"
                            >Поменять порядок упражнения
                            (перетаскиваением)</span
                        >
                        <Icon name="line-md:alert-loop" />
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                    <div class="p-2">{{ warning.warning }}</div>
                </HoverCardContent>
            </HoverCard>
        </div>
    </Alert>
</template>

<style lang="scss" scoped></style>

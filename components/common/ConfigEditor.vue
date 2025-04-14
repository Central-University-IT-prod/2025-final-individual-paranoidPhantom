<script lang="ts" setup>
import type { ExerciseConfiguration } from "~/types/exercise";

const config = defineModel<ExerciseConfiguration>();

const timeState = reactive({
    minutes: 0,
    seconds: 0,
});

const timeDistanceState = reactive({
    minutes: 0,
});

const refreshState = () => {
    if (config.value && config.value.type === "timer") {
        if (!config.value.time) config.value.time = 60;
        timeState.minutes = Math.floor(config.value.time / 60);
        timeState.seconds = config.value.time % 60;
    }
    if (config.value && config.value.type === "distance") {
        if (!config.value.time) config.value.time = 60;
        timeDistanceState.minutes = Math.floor(config.value.time / 60);
    }
};

onMounted(refreshState);
watch(() => config.value?.type, refreshState);

watch(timeState, (newTimeState) => {
    if (config.value && config.value.type === "timer")
        config.value.time = newTimeState.minutes * 60 + newTimeState.seconds;
});

watch(timeDistanceState, (newTimeDistanceState) => {
    if (config.value && config.value.type === "distance")
        config.value.time = newTimeDistanceState.minutes * 60;
});
</script>

<template>
    <div v-if="config" class="flex flex-col gap-4">
        <Select v-model="config.type">
            <SelectTrigger>
                <SelectValue placeholder="Тип упражнения" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="reps"> На количество </SelectItem>
                <SelectItem value="timer"> На время </SelectItem>
                <SelectItem value="distance"> На дистанцию и время </SelectItem>
                <SelectItem value="weight"> На вес </SelectItem>
            </SelectContent>
        </Select>
        <template v-if="config.type === 'timer'">
            <PrimitiveTimeDisplay
                class="mx-auto"
                :overall="config.time"
                :filled="config.time"
            />
            <NumberField
                id="minutes"
                v-model="timeState.minutes"
                locale="ru"
                :min="0"
                :default-value="1"
            >
                <Label for="minutes">Минут</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
            <NumberField
                id="seconds"
                v-model="timeState.seconds"
                locale="ru"
                :min="0"
                :max="59"
                :default-value="0"
            >
                <Label for="seconds">Секунд</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
        </template>
        <template v-else-if="config.type === 'reps'">
            <NumberField
                id="reps"
                v-model="config.count"
                locale="ru"
                :min="1"
                :default-value="10"
            >
                <Label for="reps">Раз</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
        </template>
        <template v-else-if="config.type === 'distance'">
            <PrimitiveTimeDisplay
                class="mx-auto"
                :overall="config.time"
                :filled="config.time"
            />
            <NumberField
                id="minutes"
                v-model="timeDistanceState.minutes"
                locale="ru"
                :min="0"
                :default-value="5"
            >
                <Label for="minutes">Минут</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
            <NumberField
                id="distance"
                v-model="config.distance"
                locale="ru"
                :min="0.1"
                :format-options="{
                    minimumFractionDigits: 1,
                    style: 'unit',
                    unit: 'kilometer',
                }"
                :step="0.1"
                :default-value="3"
            >
                <Label for="seconds">Дистанция</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
        </template>
        <template v-else-if="config.type === 'weight'">
            <NumberField
                id="weight"
                v-model="config.weight"
                :min="0.1"
                locale="ru"
                :format-options="{
                    style: 'unit',
                    unit: 'kilogram',
                    minimumFractionDigits: 1,
                }"
                :step="0.1"
                :default-value="0.5"
            >
                <Label for="weight">Вес</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
            <NumberField
                id="reps"
                v-model="config.count"
                locale="ru"
                :min="1"
                :default-value="10"
            >
                <Label for="reps">Раз</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>

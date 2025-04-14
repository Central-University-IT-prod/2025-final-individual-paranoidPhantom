<script lang="ts" setup>
import draggable from "vuedraggable";

const { builder } = toRefs(useFlowStore());
const { savedPlans, selectedPlan } = toRefs(useUserStore());

const drag = ref(false);

const onAddExercise = () => {
    builder.value.sheet.tab = "search";
    builder.value.sheet.open = true;
};

const onAiStart = () => {
    builder.value.sheet.tab = "ai";
    builder.value.sheet.open = true;
    builder.value.sheet.ai.prompt = "";
};

const refreshWarnings = async () => {
    builder.value.warnings = (await useGeneratedWarnings()) ?? [];
};

watch(() => builder.value.exercises, refreshWarnings);

const onConfigurePlan = () => {
    builder.value.sheet.open = true;
    builder.value.sheet.tab = "options";
};
</script>

<template>
    <div class="__build-page h-screen">
        <CommonGenericScreenLayout :back="{ to: '/' }">
            <template #header-extension>
                <Select v-model="selectedPlan" class="w-48" size="sm">
                    <SelectTrigger class="h-8">
                        <SelectValue placeholder="Выбирете план" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="(plan, key) in savedPlans"
                            :key="key"
                            :value="key"
                            class="min-h-8"
                        >
                            <span v-if="!plan.name" class="opacity-30"
                                >Безымянная тренировка</span
                            >
                            {{ plan.name }}
                        </SelectItem>
                        <SelectItem value="new">
                            <div class="flex items-center gap-1">
                                Создать новую
                                <Icon name="mdi:plus" />
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    size="sm"
                    class="flex-shrink-0"
                    variant="outline"
                    @click="onConfigurePlan"
                >
                    <span class="sr-only"
                        >Редактировать текующую тренировку</span
                    >
                    <Icon name="line-md:pencil-alt-twotone" />
                </Button>
            </template>
            <Alert v-if="builder.exercises.length === 0">
                <AlertTitle class="flex items-center gap-2">
                    <Icon name="ph:eyes-bold" /> Тренировка пока пуста...
                </AlertTitle>
                <AlertDescription class="opacity-50">
                    Добавьте упражнения, или попросите помощи у ИИ тренера
                </AlertDescription>
            </Alert>
            <draggable
                v-model="builder.exercises"
                item-key="config"
                handle=".handle"
                drag-class="drag"
                @start="drag = true"
                @end="drag = false"
            >
                <template #item="{ element, index }">
                    <div class="flex flex-col w-full pt-2">
                        <BuilderExercise v-bind="element" :index="index" />
                        <Transition name="break">
                            <BuilderBreak
                                v-if="
                                    index !== builder.exercises.length - 1 &&
                                    !drag
                                "
                                class="mt-2"
                                v-bind="element"
                                :index="index"
                            />
                        </Transition>
                    </div>
                </template>
            </draggable>
            <template #bottom>
                <div class="flex gap-2">
                    <Button
                        size="icon"
                        class="flex-shrink-0"
                        @click="onAddExercise"
                    >
                        <span class="sr-only">Добавить упражнение</span>
                        <Icon name="mdi:plus" />
                    </Button>
                    <PrimitiveAiButton
                        class="w-full"
                        :disabled="builder.sheet.ai.thinking"
                        @click="onAiStart"
                    >
                        <span
                            class="z-10 bg-blend-overlay opacity-80 flex gap-2 items-center"
                        >
                            <Icon
                                class="size-5"
                                name="material-symbols:magic-button"
                            />
                            {{
                                builder.exercises.length > 0
                                    ? "Редактировать"
                                    : "Создать"
                            }}
                        </span>
                    </PrimitiveAiButton>
                    <NuxtLink to="/execute" class="flex-shrink-0">
                        <Button size="icon">
                            <span class="sr-only">Начать тренировку</span>
                            <Icon name="mdi:check" />
                        </Button>
                    </NuxtLink>
                </div>
            </template>
        </CommonGenericScreenLayout>
        <SheetBuilder />
    </div>
</template>

<style lang="scss" scoped></style>

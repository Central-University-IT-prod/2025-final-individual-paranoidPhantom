<script lang="ts" setup>
import { VisuallyHidden } from "radix-vue";
import { toast } from "../ui/toast";
import type { LibraryExercise } from "~/types/exercise";
import type { BuilderWarning } from "~/types/state";

const { builder } = toRefs(useFlowStore());
const { savedPlans, selectedPlan, savedPlanKeys } = toRefs(useUserStore());

const exercise = computed(() =>
    useExercise(builder.value.exercises[builder.value.sheet.details.index]?.id)
);

const onAddExercise = (targetExercise: LibraryExercise) => {
    builder.value.exercises.push({
        id: targetExercise.id,
        config: {
            ...targetExercise.defaultConfig,
        },
        break: 10,
    });
    builder.value.sheet.open = false;
};

const onExerciseRemove = () => {
    builder.value.exercises.splice(builder.value.sheet.details.index, 1);
    builder.value.sheet.open = false;
};

const onAiPrompt = async () => {
    builder.value.sheet.ai.thinking = true;
    try {
        const training =
            builder.value.exercises.length > 0
                ? await useAdjustedTraining(
                      savedPlans.value[selectedPlan.value],
                      builder.value.sheet.ai.prompt
                  )
                : await useGeneratedTraining(builder.value.sheet.ai.prompt);
        if (!training) {
            throw new Error("Nothing returned by useGeneratedTraining");
        }
        const { plan, explanation, name } = training;
        if (
            builder.value.exercises.length === 0 &&
            !savedPlans.value[selectedPlan.value].name
        ) {
            savedPlans.value[selectedPlan.value].name = name;
        }
        builder.value.exercises = plan;
        toast({
            title: "Готово!",
            description: explanation,
            duration: explanation.length * 70,
        });
        builder.value.sheet.ai.thinking = false;
        builder.value.sheet.open = false;
    } catch (err) {
        console.warn("Failed, Regenerating.", err);
        onAiPrompt();
    }
};

const onApplyConfig = async () => {
    builder.value.exercises[builder.value.sheet.details.index].config =
        builder.value.sheet.details.configCopy;
    builder.value.sheet.open = false;
    const changedExercise =
        builder.value.exercises[builder.value.sheet.details.index];
    const freshWarning = await useGeneratedWarning({
        ...changedExercise,
        name: useExercise(changedExercise.id)?.name,
    });
    builder.value.warnings = [
        ...builder.value.warnings.filter(
            (w: BuilderWarning) => w.index !== builder.value.sheet.details.index
        ),
    ];

    if (freshWarning && (freshWarning.severity ?? 0) > 0) {
        builder.value.warnings = [
            ...builder.value.warnings,
            {
                ...freshWarning,
                index: builder.value.sheet.details.index,
            } as BuilderWarning,
        ];
    }
};

const warning = computed(() =>
    builder.value.warnings.find(
        (w: BuilderWarning) => w.index === builder.value.sheet.details.index
    )
);

const onPlanRemove = () => {
    const deletedPlanKey = selectedPlan.value;
    const backupPlanKey = savedPlanKeys.value.filter(
        (key) => key !== deletedPlanKey
    )[0];
    selectedPlan.value = backupPlanKey ?? "new";
    savedPlans.value = Object.fromEntries(
        savedPlanKeys.value
            .filter((key) => key !== deletedPlanKey)
            .map((key) => [key, savedPlans.value[key]])
    );
    builder.value.sheet.open = false;
};
</script>

<template>
    <Sheet
        :open="builder.sheet.open"
        @update:open="builder.sheet.open = $event"
    >
        <SheetContent side="bottom">
            <template v-if="builder.sheet.tab === 'details' && exercise">
                <VisuallyHidden>
                    <SheetHeader>
                        <SheetTitle>
                            {{ exercise.name }}
                        </SheetTitle>
                        <SheetDescription>
                            Вы моежте отрегулировать параметры упражнения
                        </SheetDescription>
                    </SheetHeader>
                </VisuallyHidden>
                <div class="px-5">
                    <CommonExerciseDetails v-bind="exercise" />
                    <Separator class="my-4" />
                    <ScrollArea class="h-[75vh] max-w-[1200px] mx-auto">
                        <CommonMediaCarousel
                            v-if="exercise.media.length > 0"
                            class="mb-2"
                            :media="exercise.media"
                        />
                        <CommonExerciseDescription
                            :description="exercise.description"
                        />
                        <CommonConfigEditor
                            v-model="builder.sheet.details.configCopy"
                            class="mb-4 px-2"
                        />
                        <Alert
                            v-if="warning"
                            :variant="
                                warning.severity === 1
                                    ? 'default'
                                    : 'destructive'
                            "
                            class="mb-4"
                        >
                            <AlertTitle>Важно!</AlertTitle>
                            <AlertDescription>
                                {{ warning.warning }}
                            </AlertDescription>
                        </Alert>
                    </ScrollArea>
                </div>
                <SheetFooter>
                    <div class="flex gap-2">
                        <CommonActionConfirmation @confirm="onExerciseRemove">
                            <Button
                                size="icon"
                                class="flex-shrink-0"
                                variant="destructive"
                            >
                                <span class="sr-only"
                                    >Удалить упражнение из тренировки</span
                                >
                                <Icon name="line-md:remove" />
                            </Button>
                        </CommonActionConfirmation>
                        <Button class="w-full" @click="onApplyConfig">
                            Готово
                        </Button>
                    </div>
                </SheetFooter>
            </template>
            <template v-else-if="builder.sheet.tab === 'search'">
                <SheetHeader>
                    <SheetTitle>Добавить упражнение</SheetTitle>
                    <VisuallyHidden>
                        <SheetDescription>
                            Выберите упражнение из библиотеки
                        </SheetDescription>
                    </VisuallyHidden>
                    <Separator class="mb-4" />
                </SheetHeader>

                <ScrollArea class="h-[75vh]">
                    <LibraryRoot>
                        <template #actions="{ exercise: targetExercise }">
                            <Button
                                class="w-full"
                                @click="onAddExercise(targetExercise)"
                                >Добавить</Button
                            >
                        </template>
                    </LibraryRoot>
                </ScrollArea>
            </template>
            <template v-else-if="builder.sheet.tab === 'break'">
                <SheetHeader>
                    <SheetTitle>Перерыв</SheetTitle>
                    <Separator class="mb-4" />
                    <VisuallyHidden>
                        <SheetDescription>
                            Выберите длительность перерыва
                        </SheetDescription>
                    </VisuallyHidden>
                </SheetHeader>
                <PrimitiveTimeDisplay
                    class="mx-auto"
                    :overall="
                        builder.exercises[builder.sheet.break.index].break
                    "
                    :filled="builder.exercises[builder.sheet.break.index].break"
                />
                <NumberField
                    v-model="builder.exercises[builder.sheet.break.index].break"
                    :min="10"
                    :step="10"
                >
                    <Label>Секунд</Label>
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <SheetClose>
                    <Button class="w-full mt-4">Готово</Button>
                </SheetClose>
            </template>
            <template v-else-if="builder.sheet.tab === 'ai'">
                <SheetHeader>
                    <SheetTitle>ИИ тренер</SheetTitle>
                    <Separator class="mb-4" />
                    <VisuallyHidden>
                        <SheetDescription>
                            Опишите желаемую тренировку
                        </SheetDescription>
                    </VisuallyHidden>
                </SheetHeader>
                <Textarea
                    v-model="builder.sheet.ai.prompt"
                    class="mb-4"
                    placeholder="Тренировка должна..."
                    :disabled="builder.sheet.ai.thinking"
                />
                <SheetFooter>
                    <PrimitiveAiButton
                        class="w-full"
                        :disabled="builder.sheet.ai.thinking"
                        @click="onAiPrompt"
                    >
                        <span
                            class="z-10 bg-blend-overlay opacity-80 flex gap-2 items-center"
                        >
                            <Icon
                                class="size-5"
                                name="material-symbols:magic-button"
                            />
                            {{
                                builder.sheet.ai.thinking
                                    ? "Генерирую"
                                    : builder.exercises.length > 0
                                    ? "Отредактировать"
                                    : "Создать"
                            }}
                            тренировку
                        </span>
                    </PrimitiveAiButton>
                </SheetFooter>
            </template>
            <template v-else-if="builder.sheet.tab === 'options'">
                <SheetHeader>
                    <SheetTitle>Настройки тренировки</SheetTitle>
                    <Separator class="mb-4" />
                    <VisuallyHidden>
                        <SheetDescription>
                            Поменяйте название тренировки или удалите ее
                        </SheetDescription>
                    </VisuallyHidden>
                </SheetHeader>
                <div class="space-y-1 mb-4">
                    <Label>Название</Label>
                    <Input
                        v-model="savedPlans[selectedPlan].name"
                        placeholder="Подход, подход, еще подход..."
                    />
                </div>
                <div class="flex gap-2">
                    <CommonActionConfirmation
                        description="Послу удаления тренировку не удастся восстановить"
                        @confirm="onPlanRemove"
                    >
                        <Button
                            class="flex-shrink-0"
                            variant="destructive"
                            size="icon"
                        >
                            <span class="sr-only">Удалить тренировку</span>
                            <Icon name="line-md:folder-remove-twotone" />
                        </Button>
                    </CommonActionConfirmation>
                    <SheetClose class="w-full">
                        <Button class="w-full">Готово</Button>
                    </SheetClose>
                </div>
            </template>
        </SheetContent>
    </Sheet>
</template>

<style lang="scss" scoped></style>

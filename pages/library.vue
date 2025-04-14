<script lang="ts" setup>
import type { LibraryExercise } from "~/types/exercise";

const { exerciseLibrary } = toRefs(useUserStore());

const { library } = toRefs(useFlowStore());

const onOpenDeleteConfirmation = (exerciseId: string) => {
    library.value.deleteConfirmation.open = true;
    library.value.deleteConfirmation.targetId = exerciseId;
};

const onConfirmDeletion = () => {
    library.value.deleteConfirmation.open = false;
    exerciseLibrary.value = exerciseLibrary.value.filter(
        (exercise) => exercise.id !== library.value.deleteConfirmation.targetId
    );
};

const onOpenEditSheet = (exercise: LibraryExercise) => {
    library.value.sheet.open = true;
    library.value.sheet.action = "edit";
    library.value.sheet.workingCopy = JSON.parse(JSON.stringify(exercise));
};

const onOpenAddSheet = () => {
    library.value.sheet.open = true;
    library.value.sheet.action = "add";

    library.value.sheet.workingCopy = {
        id: `ugc_${useUniqueExerciseId()}`,
        media: [],
        name: "",
        description: "",
        equipment: [],
        tags: [],
        difficulty: 4,
        defaultConfig: {
            type: "reps",
            count: 10,
        },
    };
};

const onSheetApply = () => {
    if (library.value.sheet.workingCopy) {
        if (library.value.sheet.action === "add") {
            exerciseLibrary.value = [
                ...exerciseLibrary.value,
                library.value.sheet.workingCopy,
            ];
        } else {
            const index = exerciseLibrary.value.findIndex(
                (item) => item.id === library.value.sheet.workingCopy?.id
            );
            exerciseLibrary.value[index] = library.value.sheet.workingCopy;
        }
    }
    library.value.sheet.open = false;
};
</script>

<template>
    <div class="__library-page">
        <CommonGenericScreenLayout title="Мои упражнения" :back="{ to: '/' }">
            <LibraryRoot>
                <template #actions="{ exercise }">
                    <Button
                        variant="destructive"
                        size="icon"
                        class="flex-shrink-0"
                        @click="onOpenDeleteConfirmation(exercise.id)"
                    >
                        <span class="sr-only">Удалить упражнение</span>
                        <Icon name="line-md:document-delete-twotone" />
                    </Button>

                    <Button class="w-full" @click="onOpenEditSheet(exercise)">
                        <Icon name="mdi:format-list-text" />
                        Редактировать
                    </Button>
                </template>
            </LibraryRoot>
            <template #header-extension>
                <Button
                    size="icon"
                    class="ml-auto rounded-bl-none"
                    @click="onOpenAddSheet"
                >
                    <span class="sr-only">Создать упражнение</span>
                    <Icon class="text-base" name="mdi:plus" />
                </Button>
            </template>
        </CommonGenericScreenLayout>
        <CommonActionConfirmation
            v-model:open="library.deleteConfirmation.open"
            description="После удаления вернуть упражнение не получится."
            @confirm="onConfirmDeletion"
        />
        <SheetLibrary @apply="onSheetApply" />
    </div>
</template>

<style lang="scss" scoped></style>

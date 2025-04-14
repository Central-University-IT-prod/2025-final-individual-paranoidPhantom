<script lang="ts" setup>
const { exerciseLibrary, favorites } = toRefs(useUserStore());

const onExerciseFavoriteToggle = (exerciseId: string) => {
    if (favorites.value.includes(exerciseId)) {
        favorites.value = favorites.value.filter((id) => id !== exerciseId);
    } else {
        favorites.value = [...favorites.value, exerciseId];
    }
};
const filteredExercises = ref(exerciseLibrary.value);
</script>

<template>
    <div class="flex flex-col max-w-[800px] mx-auto">
        <CommonFilters
            class="mb-4"
            :exercises="exerciseLibrary"
            @update="(filtered) => (filteredExercises = filtered)"
        />
        <Alert v-if="filteredExercises.length === 0">
            <AlertTitle>
                <Icon class="mr-2" name="line-md:search-twotone" />
                Ничего не найдено...
            </AlertTitle>
            <AlertDescription class="text-muted-foreground">
                У вас пока нет таких упражнений, но вы можете добавить их!
            </AlertDescription>
        </Alert>
        <Card
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            class="p-6 mb-4"
        >
            <CommonExerciseDetails v-bind="exercise" size="large" />
            <Separator class="my-4" />
            <CommonMediaCarousel
                v-if="exercise.media.length > 0"
                class="mb-2"
                :media="exercise.media"
            />
            <CommonExerciseDescription :description="exercise.description" />
            <div class="flex items-center gap-2">
                <slot name="actions" :exercise="exercise" />
                <Button
                    size="icon"
                    class="flex-shrink-0 transition-opacity"
                    :variant="
                        favorites.includes(exercise.id) ? 'default' : 'outline'
                    "
                    @click="onExerciseFavoriteToggle(exercise.id)"
                >
                    <span class="sr-only">{{
                        favorites.includes(exercise.id)
                            ? "Удалить из избранного"
                            : "Добавить в избранное"
                    }}</span>
                    <Icon
                        v-if="favorites.includes(exercise.id)"
                        name="line-md:heart-filled"
                    />
                    <Icon v-else name="line-md:heart" />
                </Button>
            </div>
        </Card>
    </div>
</template>

<style lang="scss" scoped></style>

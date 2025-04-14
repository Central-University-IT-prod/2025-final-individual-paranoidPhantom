<script lang="ts" setup>
defineProps<{ difficulty: number }>();
</script>

<template>
    <img
        :src="useExerciseDifficulty(difficulty)"
        :alt="`Сложность - ${difficulty}`"
    />
</template>

<style lang="scss" scoped></style>

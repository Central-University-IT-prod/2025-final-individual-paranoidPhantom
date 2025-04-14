<script lang="ts" setup>
const { library } = toRefs(useFlowStore());
</script>

<template>
    <div v-if="library.sheet.workingCopy">
        <Label> Напишите описание </Label>
        <Textarea
            v-model="library.sheet.workingCopy.description"
            class="min-h-96"
            placeholder="# Лучшее упражнение 🚀"
        />
    </div>
</template>

<style lang="scss" scoped></style>

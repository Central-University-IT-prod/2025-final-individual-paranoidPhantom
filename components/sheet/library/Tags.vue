<script lang="ts" setup>
const { library } = toRefs(useFlowStore());
</script>

<template>
    <div v-if="library.sheet.workingCopy">
        <Label>Части тела</Label>
        <div class="flex items-center gap-4">
            <CommonTagPicker v-model="library.sheet.workingCopy.tags" />
            <PrimitiveTagVisualization
                class="min-w-24 w-1/3"
                :tags="library.sheet.workingCopy.tags"
            />
        </div>
        <Label> Необходимое оборудование </Label>
        <TagsInput v-model="library.sheet.workingCopy.equipment">
            <TagsInputItem
                v-for="item in library.sheet.workingCopy.equipment"
                :key="item"
                :value="item"
            >
                <TagsInputItemText />
                <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Оборудование..." />
        </TagsInput>
    </div>
</template>

<style lang="scss" scoped></style>

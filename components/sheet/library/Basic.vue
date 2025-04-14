<script lang="ts" setup>
const { library } = toRefs(useFlowStore());
</script>

<template>
    <div v-if="library.sheet.workingCopy">
        <Label>Название</Label>
        <Input
            v-model="library.sheet.workingCopy.name"
            placeholder="Отжимания"
            class="mb-4"
        />
        <NumberField
            id="difficulty"
            v-model="library.sheet.workingCopy.difficulty"
            :default-value="4"
            :min="1"
            :max="10"
        >
            <Label for="difficulty">Сложность</Label>
            <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
            </NumberFieldContent>
        </NumberField>
    </div>
</template>

<style lang="scss" scoped></style>

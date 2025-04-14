<script lang="ts" setup>
const { weight, height, age } = toRefs(useUserStore());
</script>

<template>
    <div class="space-y-4">
        <NumberField v-model="age" :default-value="18" :min="1" :max="110">
            <Label>Возраст</Label>
            <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
            </NumberFieldContent>
        </NumberField>
        <NumberField
            v-model="weight"
            :default-value="50"
            :min="1"
            :max="200"
            locale="ru"
            :format-options="{
                style: 'unit',
                unit: 'kilogram',
            }"
        >
            <Label>Вес</Label>
            <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
            </NumberFieldContent>
        </NumberField>
        <NumberField
            v-model="height"
            :default-value="18"
            :min="1"
            :max="250"
            locale="ru"
            :format-options="{
                style: 'unit',
                unit: 'centimeter',
            }"
        >
            <Label>Рост</Label>
            <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
            </NumberFieldContent>
        </NumberField>
    </div>
</template>

<style lang="scss" scoped></style>

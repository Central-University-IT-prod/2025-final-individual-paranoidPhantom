<script lang="ts" setup>
import RadialProgress from "vue3-radial-progress";

defineProps<{
    overall: number;
    filled: number;
}>();
</script>

<template>
    <RadialProgress
        startColor="#6D28D9"
        stopColor="#6D28D9"
        :diameter="200"
        :completed-steps="filled"
        :total-steps="overall"
    >
        <h3
            class="croll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
            {{ useTimeFmt(filled) }}
        </h3>
    </RadialProgress>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
const { stage } = defineProps<{
    stage: number;
}>();

const stageData = computed(() => useAchievmentStages()[stage]);
</script>

<template>
    <div class="flex gap-2 items-center">
        <template v-if="stageData">
            <img class="w-8" :src="stageData.image" :alt="stageData.name" />
            <p class="text-lg">{{ stageData.name }}</p>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>

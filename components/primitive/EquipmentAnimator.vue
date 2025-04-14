<script lang="ts" setup>
const { equipment } = defineProps<{
    equipment: string[];
}>();

const intervalInSeconds = 3;
const animationIndex = ref(0);

const animationCycle = () => {
    animationIndex.value = (animationIndex.value + 1) % equipment.length;
};

const timeout = ref<NodeJS.Timeout>();

onMounted(() => {
    if (!timeout.value) {
        timeout.value = setInterval(animationCycle, intervalInSeconds * 1000);
    }
});

onUnmounted(() => {
    if (timeout.value) {
        clearInterval(timeout.value);
    }
});
</script>

<template>
    <TransitionGroup name="equipment" tag="p" class="relative min-h-6">
        <span :key="animationIndex" class="absolute">{{
            equipment[animationIndex]
        }}</span>
    </TransitionGroup>
</template>

<style lang="scss" scoped>
.equipment-enter-from {
    opacity: 0;
    translate: 0 -30%;
}

.equipment-leave-to {
    opacity: 0;
    translate: 0 30%;
    scale: 0.9;
}

.equipment-enter-active {
    transition: all 1s ease-in-out;
}
.equipment-leave-active {
    transition: all 0.5s ease-out;
}
</style>

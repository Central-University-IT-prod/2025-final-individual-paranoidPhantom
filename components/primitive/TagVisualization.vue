<script lang="ts" setup>
defineProps<{ tags: Array<string> }>();

const tagMapping = useExerciseTags();
const bodyTagKeys = Object.keys(tagMapping);
</script>

<template>
    <div class="relative aspect-square">
        <img
            class="object-contain absolute w-full opacity-20 invert dark:invert-0"
            src="/media/visualization/root.svg"
            alt="Модель человека"
        />
        <TransitionGroup name="fade">
            <img
                v-for="tag in tags.filter((tag) => bodyTagKeys.includes(tag))"
                :key="tag"
                class="object-contain absolute w-full dark:invert"
                :src="tagMapping[tag as keyof typeof tagMapping].graphic"
                :alt="`Использование части тела - ${tag}`"
            />
        </TransitionGroup>
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    filter: blur(4px);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
</style>

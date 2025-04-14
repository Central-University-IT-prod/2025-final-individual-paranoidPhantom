<script lang="ts" setup>
import type { LibraryExercise } from "~/types/exercise";

interface Props extends LibraryExercise {
    hideTags?: boolean;
    size?: "small" | "large";
}

withDefaults(defineProps<Props>(), {
    size: "small",
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <h3
            class="scroll-m-20 font-semibold tracking-tight"
            :class="size === 'small' ? 'text-xl' : 'text-2xl'"
        >
            {{ name }}
        </h3>
        <div class="flex items-center gap-2">
            <!-- Difficulty rating 1-10 -->
            <PrimitiveDifficultyIndicator
                class="flex-shrink-0"
                :class="size === 'small' ? 'w-4' : 'w-6'"
                :difficulty="difficulty"
            />
            <p :class="size === 'small' ? 'text-sm' : 'text-base'">
                {{ difficulty }}
            </p>
            <!-- Visualization of body (can be hidden in order to be shown larger in another spot) -->
            <template v-if="!hideTags">
                <div
                    class="border-l border-l-white border-opacity-20"
                    :class="size === 'small' ? 'h-5' : 'h-8'"
                />
                <PrimitiveTagVisualization
                    class="flex-shrink-0"
                    :class="size === 'small' ? 'w-6' : 'w-8'"
                    :tags="tags"
                />
            </template>
            <template v-if="equipment.length > 0">
                <div
                    class="border-l border-l-white border-opacity-20"
                    :class="size === 'small' ? 'h-5' : 'h-8'"
                />
                <PrimitiveEquipmentAnimator
                    :class="size === 'small' ? 'text-sm' : 'text-base'"
                    :equipment="equipment"
                />
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
=-

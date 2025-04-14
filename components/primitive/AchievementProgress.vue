<script lang="ts" setup>
defineProps<{
    state: {
        level: number;
        progressBarTotal: number;
        progressBarFilled: number;
        metric: number;
    };
}>();
</script>

<template>
    <div class="space-y-2">
        <p>У вас - {{ state.metric }}</p>

        <Progress
            :model-value="
                (state.progressBarFilled / state.progressBarTotal) * 100
            "
        />
        <div class="flex justify-between">
            <div class="flex flex-col gap-2">
                <p>
                    {{ state.metric - state.progressBarFilled }}
                </p>
                <PrimitiveAchievementStage :stage="state.level - 1" />
            </div>
            <div class="flex flex-col gap-2 items-end">
                <p>
                    {{
                        state.metric -
                        state.progressBarFilled +
                        state.progressBarTotal
                    }}
                </p>
                <PrimitiveAchievementStage :stage="state.level" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

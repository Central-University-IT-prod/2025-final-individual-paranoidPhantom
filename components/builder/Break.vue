<script lang="ts" setup>
import type { OperationalExercise } from "~/types/exercise";

interface Props extends OperationalExercise {
    index: number;
}

const props = defineProps<Props>();

const { builder } = toRefs(useFlowStore());

const onTriggerBreak = () => {
    builder.value.sheet.tab = "break";
    builder.value.sheet.break.index = props.index;
    builder.value.sheet.open = true;
};
</script>

<template>
    <Button
        variant="outline"
        class="mx-auto w-64 rounded-full"
        @click="onTriggerBreak"
    >
        Перерыв - {{ useTimeFmt(props.break) }}
    </Button>
</template>

<style lang="scss" scoped></style>

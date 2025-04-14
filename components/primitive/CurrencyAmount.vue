<script lang="ts" setup>
defineProps<{
    amount: number;
}>();
</script>

<template>
    <div class="flex items-center gap-2">
        <img class="w-6" src="/media/lotty-coin.svg" alt="LOTTIUM" />
        <p>
            {{
                Intl.NumberFormat("ru", {
                    style: "decimal",
                }).format(amount)
            }}
        </p>
    </div>
</template>

<style lang="scss" scoped></style>

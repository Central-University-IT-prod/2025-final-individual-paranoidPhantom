<script lang="ts" setup>
const { currency } = useUserStore();
</script>

<template>
    <div class="flex max-w-[400px] mx-auto gap-4 select-none">
        <NuxtLink to="/avatar" class="w-full">
            <Button
                class="w-full aspect-square h-auto active:scale-90 flex-col transition gap-4"
                variant="outline"
            >
                <h5 class="text-xl font-semibold">Магазин</h5>
                <Separator label="У вас" />
                <PrimitiveCurrencyAmount class="text-lg" :amount="currency" />
            </Button>
        </NuxtLink>
        <NuxtLink to="/achievements" class="w-full">
            <Button
                class="w-full aspect-square h-auto active:scale-90 flex-col transition gap-4"
                variant="outline"
            >
                <h5 class="text-xl font-semibold">Достижения</h5>
                <Separator />
                <div class="flex items-center gap-2">
                    <img class="w-6" src="/media/achievements/Bronze.svg" />
                    <img class="w-6" src="/media/achievements/Silver.svg" />
                    <img class="w-6" src="/media/achievements/Gold.svg" />
                    <img class="w-6" src="/media/achievements/Platinum.svg" />
                </div>
            </Button>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped></style>

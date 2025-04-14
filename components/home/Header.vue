<script lang="ts" setup>
const flow = useFlowStore();
</script>

<template>
    <header class="flex gap-2 items-center select-none">
        <img
            class="w-16 invert dark:invert-0"
            src="/logo.svg"
            alt="Логотип RE:FIT"
        />

        <NuxtLink to="/library" class="ml-auto">
            <Button variant="ghost">
                <Icon class="text-2xl" name="arcticons:light-novel-library" />
                Упражнения
            </Button>
        </NuxtLink>
        <Button
            variant="ghost"
            size="icon"
            @click="flow.home.settings.open = true"
        >
            <span class="sr-only">Настройки</span>
            <Icon class="text-2xl" name="arcticons:hidden-settings" />
        </Button>
    </header>
</template>

<style lang="scss" scoped></style>

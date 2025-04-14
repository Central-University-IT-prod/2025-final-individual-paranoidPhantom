<script lang="ts" setup></script>

<template>
    <div class="__home-page h-screen flex flex-col">
        <CommonGenericScreenLayout>
            <template #header>
                <HomeHeader />
            </template>
            <HomeAvatar />
            <HomeSquareInfo />
            <template #bottom>
                <NuxtLink to="/build" class="mx-auto w-full max-w-[500px]">
                    <Button size="lg" class="uppercase font-bold w-full"
                        >Тренироваться!</Button
                    >
                </NuxtLink>
            </template>
        </CommonGenericScreenLayout>
        <DrawerSettings />
    </div>
</template>

<style lang="scss" scoped></style>

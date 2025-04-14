<script lang="ts" setup>
defineProps<{
    title?: string;
    back?: {
        to?: string;
        onClick?: () => void;
    };
}>();
</script>

<template>
    <div class="flex flex-col items-center gap-4 h-full p-4 overflow-hidden">
        <div
            v-if="title || back || $slots.header || $slots['header-extension']"
            class="w-full fixed p-4 z-10 bg-background top-0"
        >
            <slot name="header">
                <template v-if="title || back || $slots['header-extension']">
                    <div class="flex gap-3 items-center border-b pb-2">
                        <template v-if="back?.to || back?.onClick">
                            <NuxtLink :to="back.to">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    @click="back.onClick"
                                >
                                    <Icon
                                        class="text-xl"
                                        name="arcticons:back-market"
                                    />
                                </Button>
                            </NuxtLink>
                        </template>
                        <h3
                            class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0"
                        >
                            {{ title }}
                        </h3>
                        <slot name="header-extension" />
                    </div>
                </template>
            </slot>
        </div>
        <div
            v-if="title || back || $slots.header || $slots['header-extension']"
            class="w-full pointer-events-none h-14"
        />
        <ScrollArea class="w-full">
            <slot />
        </ScrollArea>
        <div class="mt-auto flex-shrink-0 w-full max-w-[800px] sm:p-12">
            <slot name="bottom" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

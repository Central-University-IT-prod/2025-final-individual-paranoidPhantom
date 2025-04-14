<script lang="ts" setup>
defineProps<{
    description: string;
}>();
</script>

<template>
    <div class="__md">
        <MDC :value="description" />
    </div>
</template>

<style lang="scss">
.__md {
    h1 {
        @apply scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl;
    }
    h2 {
        @apply scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0;
    }
    h3 {
        @apply scroll-m-20 text-lg font-semibold tracking-tight;
    }
    h4 {
        @apply scroll-m-20 text-base font-semibold tracking-tight;
    }
    p {
        @apply leading-7 [&:not(:first-child)]:mt-6;
    }
    blockquote {
        @apply mt-6 border-l-2 pl-6 italic;
    }
    ul {
        @apply my-3 ml-6 list-disc [&>li]:mt-2;
    }
    ol {
        @apply my-3 ml-6 list-decimal [&>li]:mt-2;
    }
}
</style>

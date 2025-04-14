<script lang="ts" setup></script>

<template>
    <Button class="relative overflow-hidden">
        <div class="ai-btn absolute w-full aspect-square" />
        <slot />
    </Button>
</template>

<style lang="scss" scoped>
.break-enter-from,
.break-leave-to {
    opacity: 0;
    height: 0;
    margin-top: 0;
    padding: 0;
}

.break-enter-active,
.break-leave-active {
    transition: all 0.4s;
}

.drag {
    scale: 0.9;
    filter: contrast(1.1);
}

@keyframes spin {
    0% {
        transform: rotate(0deg) scale(2) sqew(1.2);
    }
    20% {
        transform: rotate(420deg) scale(1.15) skew(2deg);
    }
    40% {
        transform: rotate(-87deg) scale(1.8) skew(-1deg);
    }
    60% {
        transform: rotate(268deg) scale(1.2) skew(1.5deg);
    }
    80% {
        transform: rotate(-125deg) scale(1) skew(-0.5deg);
    }
}

.ai-btn {
    animation: spin 30s linear infinite;
    background: linear-gradient(
        90deg,
        #22aed1 0%,
        #6d28d9 30%,
        #6d28d9 70%,
        #ee8434 100%
    );
    filter: blur(3rem);
}
</style>

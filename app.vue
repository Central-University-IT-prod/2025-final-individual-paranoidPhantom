<script lang="ts" setup>
import Toaster from "./components/ui/toast/Toaster.vue";
</script>

<template>
    <div class="__app" vaul-drawer-wrapper>
        <NuxtPwaManifest />
        <Toaster />
        <NuxtPage />
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    open: boolean;
}>();

defineEmits(["exited"]);

const { onboardingDone } = toRefs(useUserStore());

const onDone = () => {
    onboardingDone.value = true;
    navigateTo("/");
};
</script>

<template>
    <Drawer
        :open="open"
        @update:open="
            (event) => {
                if (!event) $emit('exited');
            }
        "
    >
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Настройте свой профиль</DrawerTitle>
                <Separator class="my-2" />
            </DrawerHeader>
            <div class="px-5">
                <CommonUserDataEditor />
            </div>
            <DrawerFooter>
                <Button class="w-full" @click="onDone">Готово</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>

<style lang="scss" scoped></style>

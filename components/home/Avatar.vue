<script lang="ts" setup>
const { equipedItems } = useShopStore();
const store = useShop();

const equipedHat = computed(() => {
    return equipedItems.hat !== undefined && equipedItems.hat !== -1
        ? store[equipedItems.hat]
        : undefined;
});

const equipedShirt = computed(() => {
    return equipedItems.shirt !== undefined && equipedItems.shirt !== -1
        ? store[equipedItems.shirt]
        : undefined;
});

const equipedLhand = computed(() => {
    return equipedItems.lhand !== undefined && equipedItems.lhand !== -1
        ? store[equipedItems.lhand]
        : undefined;
});

const equipedRhand = computed(() => {
    return equipedItems.rhand !== undefined && equipedItems.rhand !== -1
        ? store[equipedItems.rhand]
        : undefined;
});
</script>

<template>
    <PrimitiveLotty>
        <template #hat>
            <Transition name="item" mode="out-in">
                <img
                    v-if="equipedHat"
                    :src="equipedHat.src"
                    :alt="equipedHat.name"
                    :key="equipedHat.src"
                    v-bind="equipedHat.attrs"
                />
            </Transition>
        </template>
        <template #shirt>
            <Transition name="item" mode="out-in">
                <img
                    v-if="equipedShirt"
                    :src="equipedShirt.src"
                    :alt="equipedShirt.name"
                    :key="equipedShirt.src"
                    v-bind="equipedShirt.attrs"
                />
            </Transition>
        </template>
        <template #lhand>
            <Transition name="item" mode="out-in">
                <img
                    v-if="equipedLhand"
                    :src="equipedLhand.src"
                    :alt="equipedLhand.name"
                    :key="equipedLhand.src"
                    v-bind="equipedLhand.attrs"
                />
            </Transition>
        </template>
        <template #rhand>
            <Transition name="item" mode="out-in">
                <img
                    v-if="equipedRhand"
                    :src="equipedRhand.src"
                    :alt="equipedRhand.name"
                    :key="equipedRhand.src"
                    v-bind="equipedRhand.attrs"
                />
            </Transition>
        </template>
    </PrimitiveLotty>
</template>

<style lang="scss" scoped>
.item-enter-from,
.item-leave-to {
    filter: blur(10px);
    opacity: 0;
}

.item-enter-active,
.item-leave-active {
    transition: all 0.4s;
}
</style>

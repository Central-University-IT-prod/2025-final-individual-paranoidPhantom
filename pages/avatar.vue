<script lang="ts" setup>
import { toast } from "~/components/ui/toast";

const { currency } = toRefs(useUserStore());
const { purchaseItem } = useShopStore();
const { equipedItems, ownedItems, lastSelectedTab } = toRefs(useShopStore());

const state = reactive({
    purchasePromptOnCard: -1,
});

const onItemAction = (cardId: number) => {
    if (ownedItems.value.includes(cardId)) {
        if (equipedItems.value[lastSelectedTab.value] === cardId) {
            equipedItems.value[lastSelectedTab.value] = -1;
        } else {
            equipedItems.value[lastSelectedTab.value] = cardId;
        }
    } else {
        state.purchasePromptOnCard = cardId;
    }
};

const onCancelPurchaseItem = (event: Event) => {
    event.stopPropagation();
    state.purchasePromptOnCard = -1;
};

const onPurchaseItem = (event: Event, itemId: number) => {
    event.stopPropagation();
    state.purchasePromptOnCard = -1;
    const result = purchaseItem(itemId);
	
    if (!result) {
        toast({
            title: "Недостаточно Лоттиума",
            description: "Пройдите тренировку, чтобы его заработать!",
        });
    }
};
</script>

<template>
    <div class="__avatar">
        <CommonGenericScreenLayout title="Мой Лотти" :back="{ to: '/' }">
            <Badge variant="outline">
                <PrimitiveCurrencyAmount :amount="currency" />
            </Badge>
            <HomeAvatar />
            <Tabs v-model="lastSelectedTab" class="max-w-[800px] mx-auto">
                <TabsList class="w-full">
                    <TabsTrigger
                        v-for="(label, key) in { ...useShopItemTypes, me: 'Я' }"
                        :key="key"
                        :value="key"
                        class="w-full"
                    >
                        {{ label }}
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    v-for="(label, key) in useShopItemTypes"
                    :key="key"
                    :value="key"
                >
                    <div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        <Button
                            v-for="(item, index) in useShop().filter(
                                (item) => item.type === key
                            )"
                            :key="`shop_${key}_${item.id}`"
                            class="h-auto w-full flex-col transition-all gap-0"
                            :variant="
                                item.id === state.purchasePromptOnCard ||
                                equipedItems[key] === item.id
                                    ? 'secondary'
                                    : 'outline'
                            "
                            @click="onItemAction(item.id)"
                        >
                            <img :src="item.src" class="mb-2" />
                            <Transition name="text-warp" mode="out-in">
                                <p
                                    class="text-sm mb-2 max-w-full text-wrap"
                                    :key="`isprompt_${item.id}_${
                                        state.purchasePromptOnCard === item.id
                                    }`"
                                >
                                    {{
                                        item.id === state.purchasePromptOnCard
                                            ? `Купить?`
                                            : item.name
                                    }}
                                </p>
                            </Transition>
                            <Badge
                                v-if="ownedItems.includes(item.id)"
                                variant="secondary"
                            >
                                <Icon name="mdi:check" class="mr-1" />
                                {{
                                    equipedItems[key] === item.id
                                        ? "Выбрано"
                                        : "Куплено"
                                }}
                            </Badge>
                            <PrimitiveCurrencyAmount
                                v-else
                                :amount="item.price"
                            />
                            <Transition
                                class="mt-2"
                                name="button-warp"
                                mode="out-in"
                            >
                                <div
                                    v-if="
                                        state.purchasePromptOnCard === item.id
                                    "
                                    class="flex gap-1"
                                >
                                    <Button
                                        class="w-full"
                                        size="sm"
                                        @click="
                                            (event) =>
                                                onPurchaseItem(event, item.id)
                                        "
                                    >
                                        Да
                                    </Button>
                                    <Button
                                        class="w-full"
                                        variant="outline"
                                        size="sm"
                                        @click="onCancelPurchaseItem"
                                    >
                                        Нет
                                    </Button>
                                </div>
                            </Transition>
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="me">
                    <div class="my-4">
                        <CommonUserDataEditor />
                    </div>
                </TabsContent>
            </Tabs>
        </CommonGenericScreenLayout>
    </div>
</template>

<style lang="scss" scoped>
.text-warp-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}
.text-warp-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.button-warp-enter-from {
    opacity: 0;
    @apply h-0 overflow-hidden my-0;
}
.button-warp-leave-to {
    opacity: 0;
    @apply h-0 overflow-hidden my-0;
}

.text-warp-enter-active,
.text-warp-leave-active,
.button-warp-enter-active,
.button-warp-leave-active {
    transition: all 0.3s;
}
</style>

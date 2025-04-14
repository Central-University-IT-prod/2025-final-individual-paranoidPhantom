import { defineStore } from "pinia";

export const useShopStore = defineStore("Shop", () => {
    const shop = useShop();
    const ownedItems = useLocalStorage<Array<number>>(
        "shopOwnedItems",
        () => []
    );
    const equipedItems = useLocalStorage(
        "shopEquipedItems",
        () =>
            Object.fromEntries(
                Object.keys(useShopItemTypes).map((key) => [key, undefined])
            ) as Record<keyof typeof useShopItemTypes, number | undefined>
    );

    const lastSelectedTab = useLocalStorage<keyof typeof useShopItemTypes>(
        "shopLastSelectedTab",
        () => "hat"
    );

    const purchaseItem = (itemIndex: number) => {
        const item = shop[itemIndex];
        if (item) {
            const { currency } = toRefs(useUserStore());
            if (item.price <= currency.value) {
                currency.value -= item.price;
                ownedItems.value.push(itemIndex);
                return true;
            }
        }
        return false;
    };

    return { ownedItems, equipedItems, purchaseItem, lastSelectedTab };
});

<script lang="ts" setup>
import { VisuallyHidden } from "radix-vue";

const flow = useFlowStore();
</script>

<template>
    <Drawer
        :open="flow.home.settings.open"
        @update:open="flow.home.settings.open = $event"
    >
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Настройки</DrawerTitle>
                <Separator class="my-2" />
                <VisuallyHidden>
                    <DrawerDescription>
                        Настройки приложения
                    </DrawerDescription>
                </VisuallyHidden>
            </DrawerHeader>
            <div class="px-5">
                <Label>Тема</Label>
                <Select v-model="flow.home.settings.colorMode">
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите тему" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="(mode, key) in useColorModeOptions()"
                            :key="key"
                            :value="key"
                        >
                            {{ mode }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DrawerFooter>
                <DrawerClose>
                    <Button class="w-full">Готово</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
import { VisuallyHidden } from "radix-vue";

defineEmits(["apply"]);

const { library, librarySheetValid } = toRefs(useFlowStore());
</script>

<template>
    <Sheet
        :open="library.sheet.open"
        @update:open="library.sheet.open = $event"
    >
        <SheetContent side="bottom">
            <SheetHeader>
                <SheetTitle>{{
                    library.sheet.action === "add"
                        ? "Добавь упражнение"
                        : "Редактирование упражнения"
                }}</SheetTitle>
                <Separator class="my-2" />
                <VisuallyHidden>
                    <SheetDescription>
                        Ниже ты можешь указать параметры упражнения
                    </SheetDescription>
                </VisuallyHidden>
            </SheetHeader>
            <ScrollArea v-if="library.sheet.workingCopy" class="pb-4 h-[75vh]">
                <Tabs default-value="basic" orientation="vertical">
                    <TabsList class="w-full grid grid-cols-1">
                        <TabsTrigger value="basic"> Общее </TabsTrigger>
                        <TabsTrigger value="config"> Тип </TabsTrigger>
                        <TabsTrigger value="description">
                            Описание
                        </TabsTrigger>
                        <TabsTrigger value="tags"> Теги </TabsTrigger>
                        <TabsTrigger value="media"> Медиа </TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic">
                        <SheetLibraryBasic class="px-2" />
                    </TabsContent>
                    <TabsContent value="config">
                        <CommonConfigEditor
                            v-model="library.sheet.workingCopy.defaultConfig"
                            class="px-2"
                        />
                    </TabsContent>
                    <TabsContent value="description">
                        <SheetLibraryDescription class="px-2" />
                    </TabsContent>
                    <TabsContent value="tags">
                        <SheetLibraryTags class="px-2" />
                    </TabsContent>
                    <TabsContent value="media">
                        <SheetLibraryMedia class="px-2" />
                    </TabsContent>
                </Tabs>
            </ScrollArea>
            <SheetFooter>
                <Button
                    class="w-full"
                    :disabled="!librarySheetValid"
                    @click="$emit('apply')"
                >
                    {{
                        library.sheet.action === "add" ? "Создать" : "Сохранить"
                    }}
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>

<style lang="scss" scoped></style>

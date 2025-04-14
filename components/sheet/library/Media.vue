<script lang="ts" setup>
const { library } = toRefs(useFlowStore());
</script>

<template>
    <div v-if="library.sheet.workingCopy">
        <Label> Ссылки на ресурсы </Label>
        <div class="flex flex-col gap-2">
            <div
                v-for="(item, index) in library.sheet.workingCopy.media"
                :key="`${item.source}_${index}`"
                class="flex gap-1 items-center"
            >
                <Input v-model="item.source" placeholder="Ссылка на ресурс" />

                <Select v-model="item.type">
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="embed"> Видео </SelectItem>
                        <SelectItem value="image"> Картинка </SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="destructive"
                    size="icon"
                    class="flex-shrink-0"
                    @click="library.sheet.workingCopy.media.splice(index, 1)"
                >
                    <Icon name="material-symbols:delete-rounded" />
                </Button>
            </div>
            <Button
                variant="secondary"
                @click="
                    library.sheet.workingCopy.media.push({
                        source: '',
                        type: 'image',
                    })
                "
                >Добавить ссылку</Button
            >
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

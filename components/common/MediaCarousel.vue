<script lang="ts" setup>
import type { ExerciseMedia } from "~/types/exercise";
import type { CarouselApi } from "../ui/carousel";

withDefaults(
    defineProps<{
        media: Array<ExerciseMedia>;
    }>(),
    {
        media: () => [],
    }
);

const api = ref<CarouselApi>();
const state = reactive({
    prevValid: false,
    nextValid: false,
});

function setApi(val: CarouselApi) {
    api.value = val;
}

watchOnce(api, (api) => {
    if (!api) return;

    state.prevValid = api.canScrollPrev();
    state.nextValid = api.canScrollNext();

    api.on("select", () => {
        state.prevValid = api.canScrollPrev();
        state.nextValid = api.canScrollNext();
    });
});

// Makes it possible to use both embed code and vk video 'share link'
const workingVKMediaSource = (url: string) => {
    const matched = url.match(/.+(?:video-)(\d+)(?:_)(\d+)/);
    if (matched && Array.isArray(matched) && matched.length == 3) {
        return `https://vkvideo.ru/video_ext.php?oid=-${matched[1]}&id=${matched[2]}&hd=2`;
    } else {
        return url;
    }
};
</script>

<template>
    <div>
        <Carousel class="rounded-xl mb-2" @init-api="setApi">
            <CarouselContent>
                <CarouselItem
                    v-for="(item, index) in media"
                    :key="`${item.source}_${index}_${item.type}`"
                >
                    <AspectRatio :ratio="16 / 9">
                        <img
                            v-if="item.type === 'image'"
                            class="rounded-md w-full h-full object-cover"
                            :src="item.source"
                            alt="Медия фрагмент для упражнения"
                        />
                        <iframe
                            v-else
                            class="w-full h-full rounded-md"
                            :src="workingVKMediaSource(item.source)"
                            allow="autoplay"
                            frameborder="0"
                        />
                    </AspectRatio>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
        <div v-if="media.length > 1" class="flex items-center justify-between">
            <Button
                variant="secondary"
                size="icon"
                :disabled="!state.prevValid"
                @click="api?.scrollPrev()"
            >
                <Icon
                    class="rotate-180"
                    name="arcticons:emoji-rightwards-arrow"
                />
            </Button>
            <Button
                variant="secondary"
                size="icon"
                :disabled="!state.nextValid"
                @click="api?.scrollNext()"
            >
                <Icon name="arcticons:emoji-rightwards-arrow" />
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

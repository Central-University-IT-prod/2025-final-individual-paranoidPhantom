<script lang="ts" setup>
import type { CarouselApi } from "@/components/ui/carousel";
const api = ref<CarouselApi>();

function setApi(val: CarouselApi) {
    api.value = val;
}

const launchEditor = ref(false);
watchOnce(api, (api) => {
    if (!api) return;

    api.on("select", () => {
        const onIndex = api.selectedScrollSnap();
        if (onIndex === 6) {
            launchEditor.value = true;
        }
    });
});
</script>

<template>
    <div class="__onboarding">
        <img
            class="absolute w-full h-screen"
            style="filter: brightness(0.6)"
            src="/media/gradient.png"
            alt=""
        />
        <Carousel class="relative w-full h-[90vh]" @init-api="setApi">
            <CarouselContent>
                <CarouselItem>
                    <PrimitiveOnboardingImage src="/media/onboarding/1.png" />
                </CarouselItem>
                <CarouselItem>
                    <PrimitiveOnboardingImage src="/media/onboarding/2.png" />
                </CarouselItem>
                <CarouselItem>
                    <PrimitiveOnboardingImage src="/media/onboarding/3.png" />
                </CarouselItem>
                <CarouselItem>
                    <PrimitiveOnboardingImage src="/media/onboarding/4.png" />
                </CarouselItem>
                <CarouselItem>
                    <PrimitiveOnboardingImage src="/media/onboarding/5.png" />
                </CarouselItem>
                <CarouselItem>
                    <PrimitiveOnboardingImage src="/media/onboarding/6.png" />
                </CarouselItem>
                <CarouselItem>
                    <PrimitiveOnboardingImage src="/media/onboarding/7.png" />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
        <DrawerOnboarding
            :open="launchEditor"
            @exited="
                () => {
                    launchEditor = false;
                    if (api?.selectedScrollSnap() === 6) api?.scrollPrev();
                }
            "
        />
    </div>
</template>

<style lang="scss" scoped></style>

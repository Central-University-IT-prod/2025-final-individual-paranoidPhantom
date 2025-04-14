<script lang="ts" setup>
// Я делал эту анимацию 4 часа 😭
const lottyData = await $fetch("/media/lotty.txt");

const { metrics } = useAchievmentsStore();
</script>

<template>
    <div class="__lotty relative max-w-[800px] h-fit mx-auto aspect-[800/560]">
        <div class="shirt">
            <!-- Lotty get's muscles after 1 hour of training. I would make it more advanced and interesting bot we aint got time for that... -->
            <img
                v-if="metrics.totalTimeInExecution > 3600"
                src="/media/muscles.svg"
                class="dark:!invert-0 muscles"
                style="width: min(30vw, 240px); translate: 1% 7.5%"
            />
        </div>
        <div v-html="lottyData"></div>
        <div class="hat">
            <slot name="hat" />
        </div>
        <div class="shirt">
            <slot name="shirt" />
        </div>
        <div class="lhand">
            <slot name="lhand" />
        </div>
        <div class="rhand">
            <slot name="rhand" />
        </div>
    </div>
</template>

<style lang="scss">
.dark {
    .__lotty {
        svg {
            path {
                fill: black;
                &#eBGwuyDvazN12 {
                    fill: white;
                }
            }
        }
    }
}
.__lotty {
    .muscles {
        filter: invert(0.7);
    }
    svg {
        path {
            fill: white;
            &#eBGwuyDvazN12 {
                fill: #555555;
            }
        }
    }
    @keyframes hat {
        0% {
            left: 49.5%;
            top: 21.43%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        25% {
            left: 49.25%;
            top: 20.8%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        50% {
            left: 49.5%;
            top: 21.43%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        75% {
            left: 50.25%;
            top: 20.71%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        100% {
            left: 49.5%;
            top: 21.43%;
        }
    }
    @apply overflow-hidden;

    .hat {
        animation: hat 2s infinite forwards ease-out;
        @apply absolute -translate-x-1/2 -translate-y-1/2;
    }
    @keyframes shirt {
        0% {
            left: 49.5%;
            top: 44.64%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        25% {
            left: 49%;
            top: 44.02%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        50% {
            left: 49.5%;
            top: 44.64%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        75% {
            left: 50.25%;
            top: 43.93%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        100% {
            left: 49.5%;
            top: 44.64%;
        }
    }

    .shirt {
        animation: shirt 2s infinite forwards ease-out;
        @apply absolute -translate-x-1/2 -translate-y-1/2;
    }
    @keyframes lhand {
        0% {
            left: 34.5%;
            top: 38.57%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        25% {
            left: 34%;
            top: 37.95%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        50% {
            left: 34.5%;
            top: 38.57%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        75% {
            left: 35.25%;
            top: 37.86%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        100% {
            left: 34.5%;
            top: 38.57%;
        }
    }

    .lhand {
        animation: lhand 2s infinite forwards ease-out;
        @apply absolute -translate-x-1/2 -translate-y-1/2;
    }
    @keyframes rhand {
        0% {
            left: 63.75%;
            top: 39.29%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        25% {
            left: 63.25%;
            top: 38.66%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        50% {
            left: 63.75%;
            top: 39.29%;
            animation-timing-function: cubic-bezier(
                0.240044,
                0.568558,
                0.451865,
                0.919015
            );
        }
        75% {
            left: 64.5%;
            top: 38.57%;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
        100% {
            left: 63.75%;
            top: 39.29%;
        }
    }

    .rhand {
        animation: rhand 2s infinite forwards ease-out;
        @apply absolute -translate-x-1/2 -translate-y-1/2;
    }
}
</style>

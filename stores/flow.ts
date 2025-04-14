import { defineStore } from "pinia";
import type { RemovableRef } from "@vueuse/core";
import type {
    BuilderState,
    BuilderWarning,
    HomeState,
    LibraryState,
} from "~/types/state";

export const useFlowStore = defineStore("Flow", () => {
    const home = reactive({
        settings: {
            open: false,
            colorMode: computed({
                get() {
                    return useColorMode()
                        .preference as HomeState["settings"]["colorMode"];
                },
                set(value) {
                    useColorMode().preference = value;
                },
            }),
        },
    });

    const { savedPlans, selectedPlan } = toRefs(useUserStore());

    const builder = reactive<{
        warnings: RemovableRef<BuilderState["warnings"]>;
        exercises: WritableComputedRef<BuilderState["exercises"]>;
        sheet: BuilderState["sheet"];
    }>({
        warnings: useLocalStorage<Array<BuilderWarning>>(
            "builderWarningsPersistent",
            () => []
        ),
        exercises: computed({
            get: () => {
                return savedPlans.value[selectedPlan.value]?.exercises ?? [];
            },
            set: (newExercise) =>
                (savedPlans.value[selectedPlan.value].exercises = newExercise),
        }),
        sheet: {
            open: false,
            tab: "search",
            details: {
                action: "add",
                index: 0,
                configCopy: {
                    type: "timer",
                    time: 0,
                },
            },
            break: {
                index: 0,
            },
            ai: {
                prompt: "",
                thinking: false,
            },
        },
    });

    const library = reactive<LibraryState>({
        deleteConfirmation: {
            open: false,
            targetId: "",
        },
        sheet: {
            open: false,
            action: "edit",
            workingCopy: undefined,
        },
    });

    const librarySheetValid = computed(() => {
        if (!library.sheet.workingCopy) return false;
        const basicValid =
            library.sheet.workingCopy.name.length > 0 &&
            library.sheet.workingCopy.difficulty >= 1 &&
            library.sheet.workingCopy.difficulty <= 10;

        let configValid = true;
        if (
            library.sheet.workingCopy.defaultConfig.type === "timer" &&
            library.sheet.workingCopy.defaultConfig.time === 0
        )
            configValid = false;

        const descriptionValid =
            library.sheet.workingCopy.description.length > 0;

        const tagsValid =
            Array.isArray(library.sheet.workingCopy.tags) &&
            Array.isArray(library.sheet.workingCopy.equipment);

        const mediaValid = library.sheet.workingCopy.media.every(
            (item) => item.type && item.source.length > 0
        );

        return (
            basicValid &&
            configValid &&
            descriptionValid &&
            tagsValid &&
            mediaValid
        );
    });

    return { home, builder, library, librarySheetValid };
});

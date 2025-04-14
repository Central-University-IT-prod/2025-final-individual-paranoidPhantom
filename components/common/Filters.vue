<script lang="ts" setup>
import type { LibraryExercise } from "~/types/exercise";
import { cn } from "@/lib/utils";

const { exercises } = defineProps<{
    exercises: Array<LibraryExercise>;
}>();

const emit = defineEmits<{
    (e: "update", exercises: Array<LibraryExercise>): void;
}>();

const difficultyOptions = [
    {
        label: "Любая",
        value: "any",
    },
    {
        label: "Легкая",
        value: "easy",
    },
    {
        label: "Средняя",
        value: "medium",
    },
    {
        label: "Сложная",
        value: "hard",
    },
];

const state = reactive<{
    onlyFavorites: boolean;
    difficulty: "any" | "easy" | "medium" | "hard";
    equipment: string[];
    tags: string[];
}>({
    onlyFavorites: false,
    difficulty: "any",
    equipment: [],
    tags: [],
});

const options = exercises
    .map((exercise) => exercise.equipment)
    .flat()
    .map((equipmentName) => {
        return {
            label: equipmentName,
            value: equipmentName,
        };
    });
const onSelectTag = (value: string) => {
    state.equipment = state.equipment.includes(value)
        ? state.equipment.filter((i) => i !== value)
        : [...state.equipment, value];
};

const { favorites } = toRefs(useUserStore());

watch(
    [state, () => exercises],
    () => {
        const filteredExercises = exercises.filter((exercise) => {
            if (state.difficulty !== "any") {
                if (exercise.difficulty >= 8) {
                    if (state.difficulty !== "hard") return false;
                } else if (exercise.difficulty <= 4) {
                    if (state.difficulty !== "easy") return false;
                } else {
                    if (state.difficulty !== "medium") return false;
                }
            }
            if (state.equipment.length > 0) {
                if (
                    !state.equipment.some((tag) =>
                        exercise.equipment.includes(tag)
                    )
                ) {
                    return false;
                }
            }
            if (state.tags.length > 0) {
                if (
                    !state.tags.some((tag) =>
                        exercise.tags.includes(
                            tag as (typeof exercise.tags)[number]
                        )
                    )
                ) {
                    return false;
                }
            }
            if (state.onlyFavorites) {
                if (!favorites.value.includes(exercise.id)) return false;
            }
            return true;
        });
        emit("update", filteredExercises);
    },
    {
        deep: true,
    }
);
</script>

<template>
    <ScrollArea class="w-full whitespace-nowrap">
        <div class="w-max flex p-2 gap-4">
            <div class="flex flex-col gap-2 w-full">
                <Label>
                    <Icon name="line-md:heart-filled" />
                    <span class="sr-only">Только избранные</span>
                </Label>

                <Switch
                    :checked="state.onlyFavorites"
                    @update:checked="state.onlyFavorites = $event"
                >
                    <template #thumb>
                        <div
                            class="flex items-center justify-center w-full h-full"
                        >
                            <Icon
                                v-if="state.onlyFavorites"
                                name="line-md:heart-filled"
                                class="size-3 text-primary"
                            />
                        </div>
                    </template>
                </Switch>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <Label>Сложность</Label>
                <Select v-model="state.difficulty">
                    <SelectTrigger class="h-9">
                        <SelectValue
                            class="w-24"
                            placeholder="Выберите сложность"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="option in difficultyOptions"
                            :key="option.value"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <Label>Часть тела</Label>
                <CommonTagPicker
                    v-model="state.tags"
                    :placeholder-override="
                        state.tags.length > 0
                            ? `Любая из ${state.tags.length}`
                            : 'Любая'
                    "
                />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <Label> Необходимое оборудование </Label>

                <Popover>
                    <PopoverTrigger as-child>
                        <Button
                            variant="outline"
                            role="combobox"
                            :class="
                                cn(
                                    'w-full justify-between',
                                    state.equipment.length === 0 &&
                                        'text-muted-foreground'
                                )
                            "
                        >
                            {{
                                state.equipment.length > 0
                                    ? `Любое из ${state.equipment.length}`
                                    : "Любое"
                            }}
                            <Icon
                                name="lucide:chevrons-up-down"
                                class="ml-2 h-4 w-4 shrink-0 opacity-50"
                            />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-[200px] p-0">
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    <CommandItem
                                        v-for="option in options"
                                        :key="option.value"
                                        :value="option.label"
                                        @select="onSelectTag(option.value)"
                                    >
                                        <Icon
                                            name="lucide:check"
                                            :class="
                                                cn(
                                                    'mr-2 h-4 w-4',
                                                    state.equipment.includes(
                                                        option.value
                                                    )
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )
                                            "
                                        />
                                        {{ option.label }}
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
</template>

<style lang="scss" scoped></style>

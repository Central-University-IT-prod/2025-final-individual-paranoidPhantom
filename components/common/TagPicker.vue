<script lang="ts" setup>
import { cn } from "@/lib/utils";

defineProps<{
    placeholderOverride?: string;
}>();

const options = Object.entries(useExerciseTags())
    .map(([key, data]) => ({
        label: data.label,
        value: key,
    }))
    .filter((i) => i.value !== "root");

const modelValue = defineModel<string[]>({ default: [] });

const onSelectTag = (value: string) => {
    modelValue.value = modelValue.value.includes(value)
        ? modelValue.value.filter((i) => i !== value)
        : [...modelValue.value, value];
};
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :class="
                    cn(
                        'w-full justify-between',
                        modelValue.length === 0 && 'text-muted-foreground'
                    )
                "
            >
                {{
                    placeholderOverride ||
                    (modelValue.length > 0
                        ? `Выбрано: ${modelValue.length}`
                        : "Выберите части тела")
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
                                        modelValue.includes(option.value)
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
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        cancel?: string;
        action?: string;
    }>(),
    {
        title: "Вы уверены?",
        description: "Это действие нельзя отменить.",
        cancel: "Отмена",
        action: "Да",
    }
);

defineEmits(["confirm"]);
</script>

<template>
    <AlertDialog>
        <AlertDialogTrigger>
            <slot />
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ title }}</AlertDialogTitle>
                <AlertDialogDescription
                    >{{ description }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>{{ cancel }}</AlertDialogCancel>
                <AlertDialogAction @click="$emit('confirm')">{{
                    action
                }}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<style lang="scss" scoped></style>

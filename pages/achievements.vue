<script lang="ts" setup>
const state = toRefs(useAchievmentsStore());
</script>

<template>
    <div class="__achievements">
        <CommonGenericScreenLayout title="Мои достижения" :back="{ to: '/' }">
            <div class="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Поднял на бицепс пару тонн</CardTitle>
                        <CardDescription>
                            Вручается за выполнение упражнений на руки 🦾
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PrimitiveAchievementProgress
                            :state="state.currentArmState.value"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Подход, подход, еще подход</CardTitle>
                        <CardDescription>
                            Вручается за выполнение упражнений на кор 🚀
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PrimitiveAchievementProgress
                            :state="state.currentCoreState.value"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Бетонный квадрицепс</CardTitle>
                        <CardDescription>
                            Вручается за выполнение упражнений на ноги 💀
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PrimitiveAchievementProgress
                            :state="state.currentLegState.value"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>OrignalGangsta</CardTitle>
                        <CardDescription>
                            Вручается за время проведенное в тренировке 😎
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PrimitiveAchievementProgress
                            :state="state.currentTimeState.value"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Фешн демон среди вб монстров</CardTitle>
                        <CardDescription>
                            Вручается за пополнение коллекции свега 🧏‍♂️
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PrimitiveAchievementProgress
                            :state="state.currentShopState.value"
                        />
                    </CardContent>
                </Card>
            </div>
        </CommonGenericScreenLayout>
    </div>
</template>

<style lang="scss" scoped></style>

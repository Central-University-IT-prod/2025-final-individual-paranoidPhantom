export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== "/onboarding") {
        const { onboardingDone } = toRefs(useUserStore());
        if (!onboardingDone.value) {
            return navigateTo("/onboarding");
        }
    }
});

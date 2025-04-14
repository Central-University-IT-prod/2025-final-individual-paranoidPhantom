import { defineStore } from "pinia";
import type { ExercisePlan, LibraryExercise } from "~/types/exercise";

export const useUserStore = defineStore("User", () => {
    const onboardingDone = useLocalStorage(
        "onboardingDonePersistant",
        () => false
    );

    // Basic user data
    const currency = useLocalStorage("userCurrencyPersistant", () => 0);
    const weight = useLocalStorage("userWeightPersistant", () => 0);
    const height = useLocalStorage("userHeightPersistant", () => 0);
    const age = useLocalStorage("userAgePersistant", () => 0);

    // Saved training data
    const exerciseLibrary = useLocalStorage<Array<LibraryExercise>>(
        "userExerciseLibraryPersitent",
        () => useDefaultExerciseLibrary()
    );
    const favorites = useLocalStorage<Array<string>>(
        "userFavoritesPersistant",
        () => []
    );
    const savedPlans = useLocalStorage<Record<string, ExercisePlan>>(
        "userSavedPlansPersisted",
        useDefaultTrainingPlans
    );

    const savedPlanKeys = computed(() => Object.keys(savedPlans.value));
    const selectedPlan = useLocalStorage<string>(
        "userSelectedPlanPersisted",
        () => "default"
    );

    // Watch for changes in the exercise library
    watch(exerciseLibrary, (newLibrary) => {
        // Unfavorite deleted exercises
        favorites.value = favorites.value.filter((id) =>
            newLibrary.map((exercise) => exercise.id).includes(id)
        );
        // Manage deleted exercises that are inside saved plans
        savedPlanKeys.value.forEach((key) => {
            savedPlans.value[key].exercises = savedPlans.value[
                key
            ].exercises.filter((exercise) =>
                newLibrary.map((exercise) => exercise.id).includes(exercise.id)
            );
        });
    });

    watch(selectedPlan, (newPlan) => {
        // React to user pressing "create new" option
        if (newPlan === "new") {
            let newKey = Math.random().toString(36).substring(7);
            while (savedPlanKeys.value.includes(newKey)) {
                newKey = Math.random().toString(36).substring(7);
            }
            savedPlans.value[newKey] = {
                name: "",
                exercises: [],
            };
            selectedPlan.value = newKey;
        }
    });

    return {
        onboardingDone,
        currency,
        weight,
        height,
        age,
        favorites,
        exerciseLibrary,
        savedPlans,
        savedPlanKeys,
        selectedPlan,
    };
});

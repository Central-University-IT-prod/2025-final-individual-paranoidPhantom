import type { ExerciseConfiguration } from "~/types/exercise";

// Returns the effort of an exercise
export default (exerciseId: string, config: ExerciseConfiguration) => {
    const exercise = useExercise(exerciseId);
    if (!exercise) return 0;
    if (config.type === "reps") return config.count * exercise.difficulty * 2;
    else if (config.type === "timer") return config.time * exercise.difficulty;
    else if (config.type === "distance")
        return config.distance * 900 * (32.2 / config.time);
    // based on calculations and comparing my own run data
    else if (config.type === "weight")
        return config.weight * config.count * exercise.difficulty * 0.35; // also based on personal training data
    return 0;
};

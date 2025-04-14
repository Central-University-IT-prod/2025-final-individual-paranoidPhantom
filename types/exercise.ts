// Operational exercise def
import type { exerciseTags } from "~/utils/useExerciseTags";

export interface TimerExerciseConfiguration {
    type: "timer";
    time: number;
}

export interface RepetitionExerciseConfiguration {
    type: "reps";
    count: number;
}

export interface DistanceExerciseConfiguration {
    type: "distance";
    distance: number; // in km
    time: number; // in seconds
}

export interface WeightExerciseConfiguration {
    type: "weight";
    weight: number; // in kg
    count: number;
}

export type ExerciseConfiguration =
    | TimerExerciseConfiguration
    | RepetitionExerciseConfiguration
    | DistanceExerciseConfiguration
    | WeightExerciseConfiguration;

export interface OperationalExercise {
    id: string;
    config: ExerciseConfiguration;
    break: number; // in seconds, = 10
}

export interface ExercisePlan {
    name: string;
    exercises: Array<OperationalExercise>;
}

// Library exercise def

export type ExerciseTagIndex = keyof typeof exerciseTags;
export type ExerciseTag = (typeof exerciseTags)[ExerciseTagIndex];

export interface ExerciseMedia {
    type: "embed" | "image";
    source: string;
}

export interface LibraryExercise {
    id: string;
    media: Array<ExerciseMedia>;
    name: string;
    description: string; // in markdown
    equipment: Array<string>;
    tags: Array<ExerciseTagIndex>;
    difficulty: number; // number from 1 to 10 that represents overall effort required to perform exercise
    defaultConfig: ExerciseConfiguration;
}

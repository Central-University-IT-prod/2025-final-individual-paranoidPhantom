import type { ExercisePlan } from "~/types/exercise";

export default () =>
    ({
        core: {
            name: "Тренировка на пресс",
            exercises: [
                {
                    id: "mountain-climber",
                    config: { type: "timer", time: 60 },
                    break: 30,
                },
                {
                    id: "russian-twist",
                    config: { type: "reps", count: 20 },
                    break: 20,
                },
                {
                    id: "plank-normal",
                    config: { type: "timer", time: 120 },
                    break: 30,
                },
                {
                    id: "bicycle-crunch",
                    config: { type: "reps", count: 25 },
                    break: 20,
                },
                {
                    id: "side-plank",
                    config: { type: "timer", time: 60 },
                    break: 30,
                },
                {
                    id: "mountain-climber",
                    config: { type: "timer", time: 60 },
                    break: 0,
                },
            ],
        },
        hands: {
            name: "Тренировка на руки",
            exercises: [
                {
                    id: "bicep-curl",
                    config: { type: "reps", count: 12 },
                    break: 30,
                },
                {
                    id: "tricep-dip",
                    config: { type: "weight", count: 10, weight: 5 },
                    break: 30,
                },
                {
                    id: "push-up",
                    config: { type: "reps", count: 25 },
                    break: 30,
                },
                {
                    id: "shoulder-press",
                    config: { type: "weight", count: 8, weight: 4 },
                    break: 30,
                },
                {
                    id: "bicep-curl",
                    config: { type: "reps", count: 12 },
                    break: 30,
                },
                {
                    id: "tricep-dip",
                    config: { type: "weight", count: 10, weight: 5 },
                    break: 60,
                },
            ],
        },
        default: {
            name: "Тренировка на ноги",
            exercises: [
                { id: "squat", config: { type: "reps", count: 10 }, break: 30 },
                { id: "lunge", config: { type: "reps", count: 10 }, break: 30 },
                {
                    id: "jump-squat",
                    config: { type: "reps", count: 10 },
                    break: 30,
                },
                {
                    id: "calf-raise",
                    config: { type: "reps", count: 12 },
                    break: 30,
                },
                {
                    id: "jog",
                    config: { type: "distance", distance: 5, time: 1800 },
                    break: 30,
                },
            ],
        },
    } as Record<string, ExercisePlan>);

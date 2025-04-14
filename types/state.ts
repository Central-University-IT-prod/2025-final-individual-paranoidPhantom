import type {
    ExerciseConfiguration,
    LibraryExercise,
    OperationalExercise,
} from "./exercise";

export interface HomeState {
    settings: {
        open: boolean;
        colorMode: keyof typeof colorModeOptions;
    };
}

export interface BuilderWarning {
    index: number;
    warning: string;
    severity: number;
}

export interface BuilderState {
    exercises: Array<OperationalExercise>;
    warnings: Array<BuilderWarning>;
    sheet: {
        open: boolean;
        tab: "search" | "details" | "break" | "ai" | "options";
        details: {
            // for ui that shows exercise details
            action: "add" | "remove";
            index: number;
            configCopy: ExerciseConfiguration;
        };
        break: {
            // for editing time of brbreakake with certain index
            index: number;
        };
        ai: {
            prompt: string;
            thinking: boolean;
        };
    };
}

export interface LibraryState {
    deleteConfirmation: {
        open: boolean;
        targetId: string;
    };
    sheet: {
        open: boolean;
        action: "edit" | "add";
        workingCopy?: LibraryExercise; // a working copy of a library exercise. Should be replaced with the object being edited, or a mock object with a unique ID (if action === 'add')
    };
}

import OpenAI from "openai";
import type { ExercisePlan, OperationalExercise } from "~/types/exercise";
import type { BuilderWarning } from "~/types/state";

const superSecretAiSlopCredentials = {
    apiKey: "REDACTED",
    baseURL: "https://ai.hudalla.dev/openai/v1",
    dangerouslyAllowBrowser: true,
};

const extractGeneratedData = (jsonString?: string) => {
    if (!jsonString) throw new Error("No JSON string provided");
    let {
        plan,
        explanation,
        name,
    }: { plan: Array<OperationalExercise>; explanation: string } = JSON.parse(
        jsonString ?? "[]"
    );
    if (!Array.isArray(plan)) {
        console.warn(plan);
        throw new Error("Invalid response format: not an array");
    }
    plan = plan.filter((exercise) => {
        return exercise.id && useExercise(exercise.id);
    });
    if (plan.length <= 2) {
        console.warn(plan);
        throw new Error("Invalid response format: too few exercises");
    }
    return { plan, explanation, name };
};

export const useGeneratedTraining = async (extraRequest?: string) => {
    const client = new OpenAI(superSecretAiSlopCredentials);

    const { exerciseLibrary, age, weight, height } = useUserStore();

    const library = JSON.stringify(
        exerciseLibrary.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            difficulty: exercise.difficulty,
            defaultConfig: exercise.defaultConfig,
            tags: exercise.tags,
            equipment: exercise.equipment,
        }))
    );

    const rawResponse = await client.chat.completions.create({
        model: "deepseek-r1-distill-llama-70b",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant. You must return a training plan based on user data, the user's request and his library of available exercises. Keep in mind that wight is in kg, distance in kg, and time in seconds. Use this response format: 
				{
					plan: Array<{
						id: string; // this is the id of the exercise and must match precisely (otherwise I won't be able to parse it!)
						config:
							| { type: "timer"; time: number }
							| { type: "reps"; count: number }
							| { type: "distance"; distance: number; time: number }
							| { type: "weight"; weight: number; count: number };
						break: number;
					}>;
					explanation: string;
					name: string;
				}
				Use strictly JSON. Don't comment on what you respond with.
				Be sure to never return exercises that are not in the library.
				Output 5-8 exercises unless otherwise instructed.
				Break must be divisible by 10.
				You are allowed to repeat exercises, there is also no real limit to the number, but stay withing reasonable limits.
				Never include 5x30 exercise - it is a joke.
				Include a very short explanation of the plan, in Russian language.
				It should reference the user's requests if any.
				Also return a very short, yet informative name for the plan (try to aim for a somewhat unique name).
				Be polite and keep it proffessional.
				Make sure to wrap the wrap the resulting JSON in '~JSON~' tags.
				`,
            },
            {
                role: "user",
                content: `My age is ${age}, I weigh ${weight} kilograms, my height is ${height} cm. ${
                    extraRequest
                        ? "My non-strict preference is as follows:" +
                          extraRequest
                        : 0
                }. Here is my library of available exercises ${library}.`,
            },
        ],
        stream: false,
    });
    const { choices } = rawResponse;

    const { content } = choices[0].message;

    const jsonString = content?.split("~JSON~")[1].trim();

    try {
        return extractGeneratedData(jsonString);
    } catch (err) {
        console.warn(jsonString);
        console.error(`Error parsing AI response: ${err}`);
    }
};

export const useAdjustedTraining = async (
    training: ExercisePlan,
    request: string
) => {
    const client = new OpenAI(superSecretAiSlopCredentials);
    const { exerciseLibrary } = useUserStore();

    const library = JSON.stringify(
        exerciseLibrary.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            difficulty: exercise.difficulty,
            defaultConfig: exercise.defaultConfig,
            tags: exercise.tags,
            equipment: exercise.equipment,
        }))
    );

    const trainingString = JSON.stringify({
        ...training,
        exercises: training.exercises.map((exercise) => ({
            ...exercise,
            name: useExercise(exercise.id)?.name,
        })),
    });

    const rawResponse = await client.chat.completions.create({
        model: "deepseek-r1-distill-llama-70b",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant. You must adjust a training plan based on a user request, and his library of available exercises. Keep in mind that wight is in kg, distance in kg, and time in seconds. Use this response format: 
				{
					plan: Array<{
						id: string; // this is the id of the exercise and must match precisely (otherwise I won't be able to parse it!)
						config:
							| { type: "timer"; time: number }
							| { type: "reps"; count: number }
							| { type: "distance"; distance: number; time: number }
							| { type: "weight"; weight: number; count: number };
						break: number;
					}>;
					explanation: string;
					name: string;
				}
				Use strictly JSON. Don't comment on what you respond with.
				Be sure to never return exercises that are not in the library.
				Break must be divisible by 10.
				You are allowed to repeat exercises, there is also no real limit to the number, but stay withing reasonable limits.
				Never include 5x30 exercise - it is a joke.
				Include a very short explanation of the changes you made, in Russian language.
				You can also edit the name of the plan, but only if instructed to do so.
				Be polite and keep it proffessional.
				Make sure to wrap the wrap the resulting JSON in '~JSON~' tags.
				`,
            },
            {
                role: "user",
                content: `${request}. Here is my library of available exercises ${library}. Here is the current plan that needs adjustment: ${trainingString}.`,
            },
        ],
        stream: false,
    });
    const { choices } = rawResponse;

    const { content } = choices[0].message;

    const jsonString = content?.split("~JSON~")[1].trim();

    try {
        return extractGeneratedData(jsonString);
    } catch (err) {
        console.warn(jsonString);
        console.error(`Error parsing AI response: ${err}`);
    }
};

export const useGeneratedWarnings = async () => {
    const client = new OpenAI(superSecretAiSlopCredentials);

    const { builder } = useFlowStore();

    const plan = JSON.stringify(
        builder.exercises.map((exercise) => ({
            ...exercise,
            name: useExercise(exercise.id)?.name,
        }))
    );

    const rawResponse = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant. The user will send a list of exercises, their config and break. Produce an array of warnings if a given exercise is obviousely too intense. Return severity 1 if it's just a warning and 2 if is a guaranteed and very serious risk. You can and should, in most cases, not generate warnings for all exercises.
				Never comment on any decisions, always return JSON.
				Always return warnings in Russian.
				Return json format:
				Array<{
					index: number;
					warning: string;
					severity: 1 | 2;
				}>`,
            },
            {
                role: "user",
                content: `Here is my training plan: ${plan}.`,
            },
        ],
        stream: false,
    });
    const { choices } = rawResponse;
    const { content } = choices[0].message;

    try {
        const warnings: Array<BuilderWarning> = JSON.parse(content ?? "[]");
        return warnings;
    } catch (err) {
        console.warn(content);
        console.error(`Error parsing AI response: ${err}`);
    }
};

export const useGeneratedWarning = async (
    exercise: OperationalExercise | { name: string }
) => {
    const client = new OpenAI(superSecretAiSlopCredentials);

    const exerciseString = JSON.stringify(exercise);

    const rawResponse = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant. The user will send an exercise as well it's config and break. Produce a warning if the given exercise is obviousely too intense. Return severity 1 if it's just a warning and 2 if is a guaranteed and very serious risk.
				Never comment on any decisions, always return JSON.
				If you do return a warning, make sure it has a description at key 'warning'.
				Make sure that it is in Russian.
				If you don't want to return a warning, return an empty object ({}).
				Return json format:
				{
					warning: string;
					severity: 1 | 2;
				} | {}`,
            },
            {
                role: "user",
                content: `Here is my exercise: ${exerciseString}.`,
            },
        ],
        stream: false,
    });
    const { choices } = rawResponse;
    const { content } = choices[0].message;

    try {
        const warning: Partial<BuilderWarning> = JSON.parse(content ?? "null");
        return Object.keys(warning).length ? warning : null;
    } catch (err) {
        console.warn(content);
        console.error(`Error parsing AI response: ${err}`);
    }
};

export const useGenerateOverview = async (
    trainingTime: number,
    skippedIndexes
) => {
    const client = new OpenAI(superSecretAiSlopCredentials);

    const { builder } = useFlowStore();

    const trainingString = JSON.stringify(
        builder.exercises.map((exercise) => ({
            ...exercise,
            name: useExercise(exercise.id)?.name,
        }))
    );

    const rawResponse = await client.chat.completions.create({
        model: "deepseek-r1-distill-llama-70b",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant. The user will send a list of exercises in a training plan and a list of indexes they skipped. Your job is to produce a short overview of the training which is also motivational. You also need to produce a amount of currency the user should recieve from 100 to 1000 based on how much effort was put into the training.
				Never comment on what you did, always return JSON.
				Always return the summary in Russian.
				If you are absolutely sure that the user is abusing and did not actually do the training, you can give him 0 currency.
				You must also return metric incrementation details. These metrics include:
				- armTotal - how many 'reps' of arm related exercises were done
				- legTotal - how many 'reps' of leg related exercises were done
				- coreTotal - how many 'reps' of core related exercises were done
				Make sure to set these all to 0 if the user 'faked' the training.
				Make sure to wrap the wrap the resulting JSON in '~JSON~' tags.
				Return json format:
				{
					overview: string;
					currency: number;
					armTotal: number;
					legTotal: number;
					coreTotal: number;
				}
				`,
            },
            {
                role: "user",
                content: `Here is my training plan: ${trainingString}. The training lasted: ${trainingTime} seconds. I skipped thses indexes: ${skippedIndexes}.`,
            },
        ],
        stream: false,
    });
    const { choices } = rawResponse;
    const { content } = choices[0].message;

    const jsonStringSplit = content?.split("~JSON~");
    if (jsonStringSplit) {
        const jsonString = jsonStringSplit[jsonStringSplit.length - 2];

        try {
            const result: {
                overview: string;
                currency: number;
                armTotal: number;
                legTotal: number;
                coreTotal: number;
            } = JSON.parse(jsonString ?? "{}");
            if (Object.keys(result).length === 0) {
                throw new Error("Empty object parsed");
            }
            return result;
        } catch (err) {
            console.warn(content);
            console.error(`Error parsing AI response: ${err}`);
        }
    }
};

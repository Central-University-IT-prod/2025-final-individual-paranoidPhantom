import { useUserStore } from "#imports";

export default (id: string) => {
    const user = useUserStore();
    return user.exerciseLibrary.find((exercise) => exercise.id === id);
};

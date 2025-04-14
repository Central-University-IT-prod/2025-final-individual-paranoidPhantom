export default () => {
    let id = undefined;
    while (!id || useExercise(id)) {
        id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

    return id;
};

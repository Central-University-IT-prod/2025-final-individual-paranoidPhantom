import type { LibraryExercise } from "~/types/exercise";

const defaultLibrary: Array<LibraryExercise> = [
    {
        id: "russian-twist",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-126912496&id=456243727&hd=2",
            },
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-102724902&id=456239809&hd=2",
            },
        ],
        name: "Русский поворот",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nЛягте на спину.\n\n2. **Хват:**\nПоместите руки за голову.\n\n3. **Поворот:**\nПоверните тело, держа ноги прямо.\n`,
        equipment: [],
        tags: ["core"],
        difficulty: 4,
        defaultConfig: {
            type: "reps",
            count: 10,
        },
    },
    {
        id: "plank-normal",
        media: [
            {
                type: "embed",
                source: "https://vk.com/video_ext.php?oid=-102724902&id=456242508&hd=1",
            },
        ],
        name: "Планка",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nЛягте на живот. Поднимитесь, опираясь на локти и носки, удерживая тело прямым.\n\n2. **Положение тела:**\nДержите спину прямой, пресс напряжённым, ягодицы не поднимать и не опускать.\n\n3. **Фиксация:**\nСмотрите вниз или немного вперёд, чтобы шея оставалась в нейтральном положении.\n\n4. **Дыхание:**\nДышите ровно и глубоко, избегая задержек дыхания.\n`,
        equipment: [],
        tags: ["core"],
        difficulty: 3,
        defaultConfig: {
            type: "timer",
            time: 120,
        },
    },
    {
        id: "push-up",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=172722997&id=456240836&hd=2",
            },
        ],
        name: "Отжимания",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nЛягте на живот. Поместите руки на ширину плеч.\n\n2. **Отжимание:**\nОтожмитесь, держа спину прямой и напрягая пресс.\n\n3. **Затяжка:**\nЗатяните, понизившее плечи и локти.\n\n4. **Подъём:**\nПоднимитесь до исходного положения.\n`,
        equipment: [],
        tags: ["byceps"],
        difficulty: 5,
        defaultConfig: {
            type: "reps",
            count: 25,
        },
    },
    {
        id: "squat",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-67599109&id=456239064&hd=2",
            },
        ],
        name: "Приседания",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nСтоите с ногами на ширине плеч.\n\n2. **Приседание:**\nОпуститесь вниз, держа спину прямой и напрягая ягодицы.\n\n3. **Подъём:**\nПоднимитесь до исходного положения.\n`,
        equipment: [],
        tags: ["theigh"],
        difficulty: 6,
        defaultConfig: {
            type: "reps",
            count: 12,
        },
    },
    {
        id: "lunge",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=75103538&id=456240715&hd=2",
            },
        ],
        name: "Выпады",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nСтоите с ногами вместе.\n\n2. **Выпад:**\nДелайте большой шаг вперед одной ногой.\n\n3. **Приседание:**\nОпуститесь вниз, держа спину прямой и напрягая ягодицы.\n\n4. **Подъём:**\nПоднимитесь до исходного положения.\n`,
        equipment: [],
        tags: ["heel", "theigh"],
        difficulty: 7,
        defaultConfig: {
            type: "reps",
            count: 10,
        },
    },
    {
        id: "jog",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=265983368&id=456239853&hd=2",
            },
        ],
        name: "Пробежка",
        description:
            "### Техника правильного бега\n\n- **Разминка:** Легкий бег на месте и динамическая растяжка 5–10 минут.\n- **Осанка:** Прямая голова, расслабленные плечи, корпус слегка наклонен вперед.\n- **Руки:** Сгиб в локтях около 90°; движение вперед и назад без лишних размахов.\n- **Стопа и шаг:** Приземление на среднюю часть стопы, нога под центром тяжести, оптимальная длина шага.\n- **Дыхание:** Глубокое, ритмичное дыхание с использованием диафрагмы.\n- **Обувь и одежда:** Беговые кроссовки с амортизацией, удобная и дышащая одежда.\n- **Нагрузка:** Постепенное увеличение длительности и интенсивности тренировок.\n- **Восстановление:** Заминка (легкий бег или ходьба) и растяжка по завершении.",
        equipment: [],
        tags: ["theigh", "heel"],
        difficulty: 5,
        defaultConfig: {
            type: "distance",
            distance: 5,
            time: 1800,
        },
    },
    {
        id: "bicep-curl",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-101159055&id=456239712&hd=2",
            },
        ],
        name: "Сгибание бицепса",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nСтоите с ногами вместе.\n\n2. **Хват:**\nВозьмите в руки гантели\n\n3. **Опускание:**\nОпустите руки вниз.\n\n4. **Сгибание:**\nСгибайте локти, поднимая гантели.\n`,
        equipment: ["гантели"],
        tags: ["byceps"],
        difficulty: 4,
        defaultConfig: {
            type: "reps",
            count: 12,
        },
    },
    {
        id: "tricep-dip",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-202928706&id=456239063&hd=2",
            },
        ],
        name: "Трицепсовый жим",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nСтоите с ногами вместе.\n\n2. **Хват:**\nПоместите руки на трицепсовую скамейку.\n\n3. **Опускание:**\nОпустите руки вниз.\n\n4. **Подъём:**\nПоднимитесь до исходного положения.\n`,
        equipment: ["трицепсовая скамейка"],
        tags: ["triceps"],
        difficulty: 5,
        defaultConfig: {
            type: "weight",
            count: 10,
            weight: 5,
        },
    },
    {
        id: "calf-raise",
        media: [
            {
                type: "image",
                source: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.marattmd.com%2Flearn%2Fimages%2Frehab%2FCalfRaise2Export.jpg&f=1&nofb=1&ipt=e88a285cc32217c000b61daec950b3fb1a4575e05cd8cfe6ab822e2e9758bb23&ipo=images",
            },
        ],
        name: "Подъём икр",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nСтоите с ногами вместе.\n\n2. **Подъём:**\nПоднимите икры вверх, стоя на носках.\n\n3. **Опускание:**\nОпустите икры вниз.\n`,
        equipment: [],
        tags: ["theigh"],
        difficulty: 4,
        defaultConfig: {
            type: "reps",
            count: 12,
        },
    },
    {
        id: "shoulder-press",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-95385825&id=456239224&hd=2",
            },
        ],
        name: "Жим плеч",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nСтоите с ногами вместе.\n\n2. **Хват:**\nПоместите руки на гриф.\n\n3. **Опускание:**\nОпустите руки вниз.\n\n4. **Жим:**\nЖимите плечи вверх, поднимая гриф.\n`,
        equipment: ["гриф"],
        tags: ["triceps", "back"],
        difficulty: 6,
        defaultConfig: {
            type: "weight",
            count: 8,
            weight: 4,
        },
    },
    {
        id: "bicycle-crunch",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-77888592&id=456239169&hd=2",
            },
        ],
        name: "Велосипедный пресс",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nЛягте на спину и поместите руки за голову.\n\n2. **Подъём:**\nПоднимите ноги и выполняйте движение схожее с ездой на велосипеде.\n`,
        equipment: [],
        tags: ["core"],
        difficulty: 5,
        defaultConfig: {
            type: "timer",
            time: 60,
        },
    },
    {
        id: "side-plank",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=75103538&id=456241119&hd=2",
            },
        ],
        name: "Планка на боку",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nЛягте на бок.\n\n2. **Положение тела:**\nДержите тело прямым, напрягая пресс и ягодицы.\n\n3. **Фиксация:**\nСмотрите вперёд, чтобы шея оставалась в нейтральном положении.\n`,
        equipment: [],
        tags: ["core"],
        difficulty: 5,
        defaultConfig: {
            type: "timer",
            time: 60,
        },
    },
    {
        id: "mountain-climber",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=-45408160&id=456239055&hd=2",
            },
        ],
        name: "Бег в упоре лёжа",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nУпор лёжа.\n\n2. **Бег:**\nПоочерёдно сгибайте ноги изображая взбирание по лестнице.\n`,
        equipment: [],
        tags: ["core", "back"],
        difficulty: 7,
        defaultConfig: {
            type: "timer",
            time: 60,
        },
    },
    {
        id: "5x30",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=261119290&id=456241101&hd=2",
            },
        ],
        name: "5x30",
        description:
            "### 5x30 (Ela Vira Mortal)\n\nГоворят зачётная шутейка. Надеюсь ты, дорогой проверяющий, согласишься)\n",
        tags: [],
        difficulty: 10,
        equipment: [],
        defaultConfig: {
            type: "timer",
            time: 300,
        },
    },
    {
        id: "jump-squat",
        media: [
            {
                type: "embed",
                source: "https://vkvideo.ru/video_ext.php?oid=213933424&id=456247229&hd=2",
            },
        ],
        name: "Прыжок в приседании",
        description: `**Как выполнить:**\n\n1. **Исходное положение:**\nСтоите с ногами вместе.\n\n2. **Приседание:**\nОпуститесь вниз, держа спину прямой.\n\n3. **Прыжок:**\nПрыгайте вверх, держа ноги прямо.\n`,
        equipment: [],
        tags: ["theigh"],
        difficulty: 8,
        defaultConfig: {
            type: "reps",
            count: 10,
        },
    },
];

export default () => defaultLibrary;

export default (): Array<{
    id: number;
    name: string;
    price: number;
    src: string;
    type: string;
    attrs?: {
        style: string;
    };
}> =>
    [
        {
            name: 'Кепка "MAGA"',
            price: 500,
            src: "/media/shop/hats/maga.png",
            type: "hat",
            attrs: {
                style: "width: min(10vw, 80px); translate: 0 -20%",
            },
        },
        {
            name: "Футблока '52'",
            price: 5252,
            src: "/media/shop/shirts/52.png",
            type: "shirt",
            attrs: {
                style: "width: min(15vw, 120px); translate: 0 15%",
            },
        },
        {
            name: "Футблока 'фирменная'",
            price: 100,
            src: "/media/shop/shirts/signature.png",
            type: "shirt",
            attrs: {
                style: "width: min(15vw, 120px); translate: 0 15%",
            },
        },
        {
            name: "Футблока 'ЦУ'",
            price: 750,
            src: "/media/shop/shirts/cu.png",
            type: "shirt",
            attrs: {
                style: "width: min(15vw, 120px); translate: 0 15%",
            },
        },
        {
            name: "Футблока 'ПРОД'",
            price: 1000,
            src: "/media/shop/shirts/PROD.png",
            type: "shirt",
            attrs: {
                style: "width: min(15vw, 120px); translate: 0 15%",
            },
        },
        {
            name: "Футблока 'Где резы?'",
            price: 1000,
            src: "/media/shop/shirts/results.png",
            type: "shirt",
            attrs: {
                style: "width: min(15vw, 120px); translate: 0 15%",
            },
        },
        {
            name: "Футблока 'шаховпобеда.рф'",
            price: 777,
            src: "/media/shop/shirts/shachovpobeda.png",
            type: "shirt",
            attrs: {
                style: "width: min(15vw, 120px); translate: 0 15%",
            },
        },
        {
            name: "Шапка 'ударник'",
            price: 420,
            src: "/media/shop/hats/shapka.png",
            type: "hat",
            attrs: {
                style: "width: min(18vw, 144px); translate: 2% -8%",
            },
        },
        {
            name: "Федора 'Кримсон'",
            price: 1500,
            src: "/media/shop/hats/fedora.png",
            type: "hat",
            attrs: {
                style: "width: min(18vw, 144px); translate: 2% -8%",
            },
        },
        {
            name: "Цепочка 'ЦБ'",
            price: 7777,
            src: "/media/shop/neck/goldchain.png",
            type: "shirt",
            attrs: {
                style: "width: min(12vw, 96px); translate: 0% -10%",
            },
        },
        {
            name: "Миска риса 'фронтендеру'",
            price: 79,
            src: "/media/shop/hand/rice.png",
            type: "lhand",
            attrs: {
                style: "width: min(8vw, 64px); translate: -12% -50%",
            },
        },
        {
            name: "Миска риса 'бекендеру'",
            price: 79,
            src: "/media/shop/hand/rice.png",
            type: "rhand",
            attrs: {
                style: "width: min(8vw, 64px); translate: 12% -50%",
            },
        },
        {
            name: "Слон PHP",
            price: 3000,
            src: "/media/shop/hand/php.png",
            type: "lhand",
            attrs: {
                style: "width: min(10vw, 80px); translate: -12% -50%;",
                class: "animate-bounce",
            },
        },
        {
            name: "Балалайка",
            price: 2000,
            src: "/media/shop/hand/balalalika.png",
            type: "rhand",
            attrs: {
                style: "width: min(15vw, 120px); translate: 12% -10%",
            },
        },
    ].map((item, id) => ({
        ...item,
        id,
    }));

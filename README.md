# PROOOOOOD

[![wakatime](https://wakatime.com/badge/user/018e7187-321d-45f8-8854-9be2e9d9116a/project/d970803c-5586-41af-a9c8-6f4e313fe7c1.svg)](https://wakatime.com/badge/user/018e7187-321d-45f8-8854-9be2e9d9116a/project/d970803c-5586-41af-a9c8-6f4e313fe7c1)

## 🌚 Dev сервер

Проект запускается на `npm start` ооочень надеюсь что всё именно так.
Dev сервер доступен тут - `http://localhost:3109` (ну еще по идее в консольку выводит адрес)
(в случае чего по идее `npx nuxi dev` точно оживит 😅)

## 🚀 Чуть-чуть про стек
- Nuxt 3 - Vue на стерроидах)
- Tailwind CSS - Чтоб всё бац-бац и в прод (простите)
- SCSS - база
- TypeScript - потому-что ну не JavaScript же
- Pinia - стейт менеджмент
- shadcn/ui - моднявая UI либа ([порт для vue](https://www.shadcn-vue.com/))
- @nuxtjs/mdc - для рендринга markdown ([подробнее](https://github.com/nuxt-modules/mdc))
- Еще @vite-pwa/nuxt - чтобы было PWA

## 🔥 Допфичи

- ИИ тренер - при желании тренироку можно создать/отредактировать с использованием LLM. Также тренировка всегда будет проверятся на безопасность и при необходимости пользователя будут предпреждать о чрезмерной нагрузке. Также ИИ даёт обратную связь после тренировки и решает сколько внутреигровой валюты стоит зачислить пользователя. (aka. AI SLOP)
- Markdown разметка для описаний - описания для упражнений пишутся на Markdown, что позволяет лучше преподнести инструкцию к выполнению.
- PWA - приложение соотвествует основным требованиям PWA и может быть установлено на устройство.
- Дружелюбный онбординг
- Прикольная визуализация мышц которые развивает упражнение
- Изменение порядка тренировки удобным образом (перетаскивание)

## 🧪 Тестим
- Все данные хранятся в localStorage с префиками `builder/achievements/user/shop` (Можно не грабить Л-Банк и просто подправить `userCurrencyPersistant` 😉)

## ☝️ Хоетлось бы отметить
- 100% одежды для Лотти было нарисовано мной (кроме логотипов)
- Чтобы ИИ фичи (на основе groq.com) работали без ВПН пришлось поднимать у себя прокси - ai.hudalla.dev
- Много ругани в консиоли производит великорусский VK Видео... (можете убедится проследовав на `/`, `/build`: пока нет видео ембеда, всё круто)
- У всех кнопок есть текст для 'screen readers' что делает его довольно доступным.


Если будут вопросики рад ответить 👉 [@paranoidPhantom](https://t.me/paranoidPhantom)

## 😍 Лотти

Персонажа я делал 6 часов с использованием Figma и SVGator

Когда я узнал что экспорт из SVGator идёт с водяным знаком это было ужасно.
И всё же посредством некоторых манипуляций я смог избавиться от него (и не покупать подписку за $38).

Вот скриншоты:

![Скриншот](README/lotty/1.png)

![Скриншот](README/lotty/2.png)

![Скриншот](README/lotty/3.png)

![Скриншот](README/lotty/4.png)
## О проекте

Мини-каталог одежды на Next.js (App Router). Данные о товарах отдаёт psevdo-API (`src/shared/api/mock-server`), обёрнутый типизированным слоем и route handler'ами.

Архитектура - Feature-Sliced Design (`app → widgets → features → entities → shared`). Next.js App Router занимает слой `app` (роутинг, layout, глобальные стили, провайдеры), слой `pages` не используется - композиция страниц собирается в `widgets`.

Реализованные фичи:

- Список товаров: поиск по названию, фильтр «в наличии», фильтры по категории/бренду/цвету/размеру (мультиселект), фильтр по цене от/до, сортировка по цене, курсорная виртуализация с подгрузкой по скроллу (IntersectionObserver)
- Фильтры сохраняются в localStorage и переживают перезагрузку/переход между страницами
- Динамическая карточка товара: галерея изображений, выбор цвета и размера, добавление в корзину, обработка на несуществующий товар
- Корзина, сохранение в localStorage
- Динамические `title`/`description` по каждому товару, JSON-LD (schema.org `Product`, `BreadcrumbList`) на карточках и хлебных крошках

## Стек

| Категория      | Технология            |
| -------------- | --------------------- |
| Framework      | Next.js (App Router)  |
| Язык           | TypeScript            |
| Стили          | SCSS (CSS Modules)    |
| Стейт-менеджер | Zustand (с `persist`) |
| Server state   | TanStack Query        |
| Форматирование | Prettier + ESLint     |
| Git hooks      | Husky + lint-staged   |

## Запуск локально

```bash
npm install
npm run dev
```

Приложение поднимется на [http://localhost:3000](http://localhost:3000).

## Структура проекта

```
src/
├── app/                    # роутинг Next.js (страницы, layout, route handlers)
│   ├── api/                # REST-обёртка над psevdo-API (products, categories, brands, colors, sizes)
│   ├── products/[id]/      # динамическая страница товара
│   └── cart/                # страница корзины
│
├── widgets/                 # крупные самостоятельные блоки страниц
│   ├── header/, footer/     # общая разметка
│   ├── product-catalog/     # композиция страницы каталога
│   ├── product-grid/        # список товаров с виртуализацией подгрузки
│   ├── catalog-toolbar/     # поиск, "в наличии", сортировка
│   ├── product-detail/      # композиция карточки товара (галерея, описание, опции)
│   └── cart/                 # композиция страницы корзины
│
├── features/
│   └── product-filters/     # фильтры каталога (стор + UI-сайдбар)
│
├── entities/                # бизнес-сущности: типы, api-хуки, доменная логика
│   ├── product/, category/, size/
│   └── cart/                # стор корзины, подсчёт позиций/суммы
│
└── shared/
    ├── api/                 # типы данных, typed pseudo-api (mock-server)
    ├── ui/                  # Icon, ColorSwatch, SizeBox, InfoBlock, Breadcrumbs...
    ├── lib/                 # чистые хелперы (formatPrice, pluralize, joinClassNames...)
    └── styles/                # SCSS-токены и миксины
```

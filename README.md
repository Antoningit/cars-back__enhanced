# Настройка
- Прописать путь до паблика админки в [`src/index.ts`](./src/index.ts#L15), переменной distPath
- Прописать путь до паблика сайта в [`src/site.ts`](./src/site.ts#L8), переменной distPath
- Прописать переменные среды в .env

## Переменные среды
- `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB` - Данные для коннекта к mysql. Таблицы руками создавать **не** нужно.
- `MYSQL_PORT` - порт, который слушает mysql сервер (по умолчанию 3306)
- `ADMIN_PORT` - порт админки
- `SITE_PORT` - порт сайта

# Сборка и запуск
`
npm i
npm run build
npm start - админка
npm run site - сайт
`
# API админки
## Авторизация
`POST` /api/login

- `login`: string
- `password`: string

## Фото
### Добавление
`POST` /api/photo
### Удаление
`DELETE` /api/photo/:filename

## Авто
### Добавление/изменение
`POST` /api/car

- `id`?: number,
- `auction`: boolean,
- `body`: [`0-17`](./src/entity/Car.ts#L4),
- `car_engine`: [`0-4`](./src/entity/Car.ts#L27),
- `car_mod`: string,
- `color`: string,
- `customs`: string,
- `drive`: [`0-2`](./src/entity/Car.ts#L37),
- `engine_volume`: string,
- `image`: string,
- `images`: string[],
- `kpp`: [`0-3`](./src/entity/Car.ts#L45),
- `latest`: boolean,
- `mileage`: number,
- `model`: string,
- `old_price`:number,
- `owners_by_pts`: number,
- `price`: number,
- `promo`: boolean,
- `pts`: string,
- `title`: [`0-59`](./src/entity/Car.ts#L54),
- `wheel`: [`0-1`](./src/entity/Car.ts#L119),
- `year_from`: number

### Удаление
`DELETE` /api/car/:id
### Список
`GET` /api/car

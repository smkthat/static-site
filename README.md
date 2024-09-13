# Node.js, npm и сборщики
<img src="assets/images/logo.svg" width="140"  alt="logo"/>

Зачетная работа по модулю №8

Превью https://smkthat.github.io/static-site/

___



## Задание 1: Введение в Node.js и npm


### Создание проекта:

- Установите Node.js и npm на вашем компьютере.
- Инициализируйте новый проект с помощью команды `npm init`.
- Введите все необходимые данные, такие как название проекта, версия и описание.

### Задание 2: Работа с JSON

- Создайте файл `config.json`, содержащий следующие настройки:
```json
{
 "port": 3000,
 "database": {
  "host": "localhost",
  "port": 5432,
  "name": "mydatabase"
 }
}
```

### Задание 3: Инициализация проекта через npm, библиотеки и установка пакетов

- Установите библиотеки Express и pg для работы с веб-сервером и базой данных:

```bash
npm install express pg
```

### Задание 4: Создание файла .gitignore

- Создайте файл `.gitignore` в корне вашего проекта и добавьте следующие строки:

```
node_modules/
config.json
```

### Задание 5: Использование модулей Node.js

Создание и использование локального модуля:

- Создайте файл `math.js` с функциями для сложения и вычитания:

```javascript
function add(a, b) {
 return a + b;
}

function subtract(a, b) {
 return a - b;
}

module.exports = {
 add,
 subtract
};
```

Импортируйте и используйте эти функции в `server.js`.

### Задание 7: Сборщики фронтенда: webpack, gulp, grunt, parcel и т.д.

Использование Parcel для сборки проекта:
 
- Установите Parcel как дев-зависимость:

```bash
npm install --save-dev parcel
```

- Настройте `index.html` и `src/index.js` для сборки с помощью Parcel.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Parcel Project</title>
</head>
<body>
 <script src="./src/index.js"></script>
</body>
</html>
```

```javascript
// src/index.js
console.log('Hello from Parcel!');
```

---

## Линтинг проекта

Установка зависимостей

```bash
npm i
```

Запуск проверки

```bash
npm lint-all
```

Запуск исправления

```bash
npm fix-all
```

Прочие скрипты см. в `package.json`

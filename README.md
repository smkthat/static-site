# Некоторые интересные и (крайне) полезные инструменты

<img src="assets/images/logo.svg" width="140"  alt="logo"/>

Практическая работа по модулю №9

___

## Ваши задачи:

Использовать инструменты для улучшения качества кода, автоматического
форматирования, анализа производительности веб-страниц и отслеживания ошибок.

## Цели:

- Настроить ESLint для статического анализа кода.
- Настроить Prettier для автоматического форматирования кода.
- Использовать Lighthouse для анализа производительности веб-страницы.
- Настроить и использовать Sentry для отслеживания ошибок.

## Шаги выполнения:

---

### Часть 1: ESLint

#### Установка ESLint:

1. Инициализируйте новый проект npm:

```bash
npm init -y
```

2. Установите ESLint:

```bash
npm install eslint --save-dev
```

3. Инициализируйте конфигурацию ESLint:

```bash
npm init @eslint/config@latest
```

4. Следуйте инструкциям для настройки ESLint.

#### Создание конфигурационного файла `.eslintrc`:

После инициализации создайте файл `.eslintrc.json` и добавьте базовую
конфигурацию:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}
```

#### Проверка кода с помощью ESLint:

1. Создайте файл `index.js` и добавьте в него код с намеренными ошибками стиля.

2. Запустите ESLint для проверки кода:

```bash
npx eslint src/index.js
```

---

### Часть 2: Prettier

#### Установка Prettier:

Установите Prettier:

```bash
npm install --save-dev prettier
```

#### Создание конфигурационного файла `.prettierrc`:

Создайте файл `.prettierrc` с базовой конфигурацией:

```json
{
  "singleQuote": true,
  "semi": true
}
```

#### Интеграция Prettier с ESLint:

1. Установите необходимые пакеты:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

2. Обновите ваш `.eslintrc` для использования Prettier:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ]
}
```

#### Форматирование кода с помощью Prettier:

Запустите Prettier для форматирования кода:

```bash
npx prettier --write src/index.js
```

---

### Часть 3: Lighthouse

#### Установка Lighthouse:

Установите Lighthouse глобально:

```bash
npm install -g lighthouse
```

#### Анализ производительности веб-страницы:

1. Запустите локальный сервер:

```bash
npx http-server
```

2. Запустите Lighthouse для анализа локального сервера:

```bash
lighthouse http://127.0.0.1:8080 --output html --output-path ./report.html --view
```

---

### Часть 4: Sentry

#### Регистрация в Sentry:

Зарегистрируйтесь и создайте новый проект на Sentry.

#### Установка и настройка Sentry:

1. Установите Sentry для вашего проекта:

```bash
npm install @sentry/browser @sentry/tracing
```

2. Настройте Sentry в вашем проекте. Добавьте следующий код JavaScript-файл:

```javascript
import * as Sentry from '@sentry/browser';

import {Integrations} from '@sentry/tracing';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

#### Отслеживание ошибок:

Создайте намеренную ошибку в вашем коде, чтобы проверить, что Sentry правильно
отслеживает ошибки.

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

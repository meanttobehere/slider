# Super Slider

## Демо страница

<a href='https://meanttobehere.github.io/slider/demo/index.html' target='_blank'>Slider</a>

## Быстрый старт

### Клонирование репозитория

```
git clone https://github.com/meanttobehere/superSlider
```

### Установка зависимостей

```
npm install
```

### Production сборка проекта

```
npm run build
```

### Development сборка проекта

```
npm run dev
```

### Development сборка проекта с авто пересборкой при изменеии файлов проекта

```
npm run watch
```

### Запусук линтера Eslint для всех ts файлов в src

```
npm run eslint
```

### Запуск тестов

```
npm run test
```

# Использование

## HTML разметка

```
<div id="slider"></div>
```

## Иницилизация

```
$( '#slider' ).superSlider();
```

## Методы

### `Получить значение параметра слайдера`

Чтобы получить значение любого параметра слайдера, необходимо вызвать функцию superSlider с именем параметра в качестве аргумента.

```
let posistion = $( '#slider' ).( 'pointerPosition' );
```

### `Установить значение одного или нескольких параметров слайдера`

Чтобы установить значение одного параметра слайдера, необходимо вызвать функцию superSlider с аргументами (параметр, значение).

```
$( '#slider' ).( 'typeRange', false );
```

Чтобы установить значение нескольких параметров слайдера, необходимо вызвать функцию superSlider с объектом в качестве аргумента, со свойствами в виде пар (параметр, значение).

```
$( '#slider' ).superSlider( { minValue: 0, maxValue: 100, step: 10 } );
```

### `Установить обработчик на событие слайдера`

Установка обработчика на события слайдера осуществляется через API JQuery.

```
$( '#slider' ).on( 'sliderupdate', () => {
  console.log( 'slider updated' )
});
```

## Параметры

| Параметр              | Тип     | Значение | Описание |
| --------------------- | ------- | ------- | ----------- |
| minValue              | number  | 0       | Минимальное значение слайдера |
| maxValue              | number  | 100     | Максимальное значение слайдера |
| step                  | number  | 1       | Значение шага слайдера |
| pointerPosition       | number  | 20      | Позиция первого указателя |
| secondPointerPosition | number  | 80      | Позиция второго указателя |
| typeVertical          | boolean | false   | Вертикальное или горизонтальное отображение слайдера |
| typeRange             | boolean | true    | Один или два указателя у слайдера |
| displayTips           | boolean | true    | Показать или скрыть элементы, отображающие текущие значения указателей |
| displayProgressBar    | boolean | true    | Показать или скрыть прогрессбар |
| displayScale          | boolean | true    | Показать или скрыть шкалу под слайдером |

## События

| Событие      | Описание     |
| ------------ |  ----------- |
| sliderupdate | Происходит при каждом обновлении любого из параметров слайдера  |
| slidestart   | Происходит когда пользователь начинает передвигать указатель |
| slide        | Происходит при каждом изменении позиции указателей слайдера |
| slidestop    | Происходит когда пользователь перестает передвигать указатель |

# Используемые интрументы

### Сборка проекта на:

- Node.js v14.17.6
- Webpack v5.58.1

### Сторонние библиотеки:

- jquery v3.6.0

### Линтер для ts:

- eslint v7.2.0
- eslint-config-airbnb v18.2.1
- eslint-config-airbnb-base v14.2.1
- eslint-config-airbnb-typescript v14.0.1
- eslint-plugin-import v2.22.1
- @typescript-eslint/parser v5.1.0

### Для тестов:

- jasmine v3.10.0
- jasmine-jquery v2.1.1
- jasmine-spec-reporter v7.0.0
- jasmine-ts v0.4.0
- karma v6.3.4
- karma-chrome-launcher v3.1.0
- karma-coverage v2.0.3
- karma-jasmine v4.0.1
- karma-jasmine-jquery v0.1.1
- karma-sourcemap-loader v0.3.8
- karma-spec-reporter v0.0.32
- karma-typescript v5.5.2

### Инструменты для работы с кодом:
- @types/jasmine v3.10.0
- @types/jquery v3.5.6
- ts-node v10.3.0
- typescript v4.4.3

### Для упрощения работы с проектом:

- favicons v6.2.2
- gh-pages v3.2.3

### Инструменты для Webpack:

- html-webpack-plugin v5.3.2
- favicons-webpack-plugin v5.0.2
- mini-css-extract-plugin v2.4.2
- ts-loader v9.2.6
- css-loader v6.3.0
- style-loader v3.3.0

# Описание архитектуры

## Приложение реализует шаблон MVP

### `Model`

Model хранит текущее состояние слайдера и предоставляет методы для его изменения. Также Model оповещает Presenter об изменении своего состояния.

### `View`

View предоставляет метод для изменения отображения слайдера. Также View оповещает Presenter о событиях, вызванных пользователем.

### `Presenter`

Presenter обеспечивает взаимодействие Model и View, подписываясь на их события и обновляя их состояние при необходимости. Также Presenter предоставляет внешнее API для управления состоянием слайдера.

## UML диаграмма

![UML-diagramm](uml.drawio.png)
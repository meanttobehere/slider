# Table of Contents

- [Getting Started](#getting_started)
- [Usage](#usage)

# Getting Started <a name = "getting_started"></a>

### Clone repository

```
git clone https://github.com/meanttobehere/superSlider
```

### Installing

```
npm install
```

### Building

```
npm run build
```

### Testing

```
npm run test
```

# Usage <a name="usage"></a>

## Methods

| Method                                                        | Description |
| ------------------------------------------------------------- | ----------- |
| superSlider( "optionName" )                                   | Gets the value currently associated with the specified optionName. |
| superSlider( "optionName", value )                            | Sets the value of the slider option associated with the specified optionName. |
| superSlider( { optionName1 : value1, optionName2 : value2 } ) | Sets one or more options for the slider |


## Options

| Option                | Type    | Default | Description |
| --------------------- | ------- | ------- | ----------- |
| minValue              | number  | 0       | The minimum value of the slider. |
| maxValue              | number  | 100     | The maximum value of the slider. |
| step                  | number  | 1       | Determines the size or amount of each interval or step the slider takes between the min and max. |
| pointerPosition       | number  | 20      | Determines the value of the pointer. |
| secondPointerPosition | number  | 80      | Determines the value of the second pointer. |
| typeVertical          | boolean | false   | Whether the slider handles move vertically. |
| typeRange             | boolean | true    | Whether the slider represents a range. |
| displayTips           | boolean | true    | Show or hide tip (or tips if typeRange sets true) with the current pointer position. |
| displayProgressBar    | boolean | true    | Show or hide progress bar. |
| displayScale          | boolean | true    | Show or hide scale. |

## Events
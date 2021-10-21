# Github Pages

https://github.com/meanttobehere/meanttobehere.github.io

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
| step                  | number  | 1       | Determines the size of each step the slider takes between the min and max. |
| pointerPosition       | number  | 20      | Determines the value of the pointer. |
| secondPointerPosition | number  | 80      | Determines the value of the second pointer. |
| typeVertical          | boolean | false   | Whether the slider handles move vertically. |
| typeRange             | boolean | true    | Whether the slider represents a range. |
| displayTips           | boolean | true    | Show or hide tip (or tips if typeRange sets true) with the current pointer position. |
| displayProgressBar    | boolean | true    | Show or hide progress bar. |
| displayScale          | boolean | true    | Show or hide scale. |

## Events

| Event        | Params  | Description |
| ------------ | ------- | ----------- |
| sliderupdate |   |  |
| slidestart   |   |  |
| slide        |   |  |
| slidestop    |   |  |

## Code examples

### Html

```
<div id="slider"></div>
```

### Initialization or set options

```
$( '#slider' ).superSlider(
    {
        pointerPosition: 20,
        secondPointerPosition: 80,
        minValue: 0,
        maxValue: 100,
        step: 10,
        typeVertical: false,
        typeRange: true,
        displayScale: true,
        displayTips: true,
        displayProgressBar: true,    
    }
);
```

### Set option

```
$( '#slider' ).( 'typeRange', false );
```

### Get option

```
let pos = $( '#slider' ).( 'pointerPosition' );
```

### Set event handler

```
$( '#slider' ).on( 'sliderupdate', () => {
  console.log( 'slider updated' )
});
```
# v-breakpoints

`v-breakpoints` is a Vue 3 plugin designed to streamline responsive design by providing a centralized way to manage and listen to viewport changes. It simplifies handling breakpoints and screen sizes, enhancing component behavior and layout adjustments across various devices.

- [v-breakpoints](#v-breakpoints)
  - [Installation](#installation)
  - [Plugin Installation](#plugin-installation)
  - [`useBreakpoints` Hook](#usebreakpoints-hook)
      - [Basic Usage](#basic-usage)
      - [Detailed Example](#detailed-example)
      - [Hook Return Values](#hook-return-values)
      - [Example of `is`](#example-of-is)
  - [Events](#events)
      - [Event Payload](#event-payload)
  - [Directives](#directives)
      - [Available Directives](#available-directives)
      - [Directive Usage Example](#directive-usage-example)
  - [Configuration](#configuration)
  - [Default Breakpoints and Screens](#default-breakpoints-and-screens)
      - [Breakpoints](#breakpoints)
      - [Screens](#screens)
  - [Conclusion](#conclusion)
  - [License](#license)

## Installation

First, install the package via npm:


```bash
npm install v-breakpoints
```

Or viw yarn:
```bash
yarn add v-breakpoints
```

## Plugin Installation

To utilize `v-breakpoints`, install the plugin in your `main.js` or `main.ts` file. This step is mandatory for the plugin to function correctly.

```js
import { createApp } from 'vue';
import App from './App.vue';
import { breakpoints } from 'v-breakpoints';

const app = createApp(App);
app.use(breakpoints);
app.mount('#app');
```

## `useBreakpoints` Hook

The `useBreakpoints` hook is central to this plugin. Initially, it returns the reactive states `breakpoint` and `screen`.

[Check here `breakpoint` and `screen` values](#default-breakpoints-and-screens)

#### Basic Usage

```js
import { useBreakpoints } from 'v-breakpoints';

export default {
  setup() {
    const { breakpoint, screen } = useBreakpoints();

    return {
      breakpoint,
      screen,
    };
  },
};
```

#### Detailed Example

To leverage the full suite of reactive states provided by `useBreakpoints`, import and use the hook as shown below.

```js
import { useBreakpoints } from 'v-breakpoints';

export default {
  setup() {
    const {
      breakpoint,
      screen,
      width,
      height,
      breakpointWidth,
      screenWidth,
      orientation,
      is,
      event,
      breakpoints,
      screens
    } = useBreakpoints();

    return {
      breakpoint,
      screen,
      width,
      height,
      breakpointWidth,
      screenWidth,
      orientation,
      is,
      event,
      breakpoints,
      screens
    };
  },
};
```

#### Hook Return Values

| Property            | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| **breakpoint**      | Current breakpoint as per defined [here](#breakpoints)                            |
| **screen**          | Current screen as per defined [here](#screens)                                    |
| **width**           | Current viewport width.                                                           |
| **height**          | Current viewport height.                                                          |
| **breakpointWidth** | Width corresponding to the current `breakpoint`.                                  |
| **screenWidth**     | Width corresponding to the current `screen` size.                                 |
| **orientation**     | Current screen orientation (`portrait`, `landscape` or `square`).                 |
| **event**           | Last **resize** event data.                                                       |
| **breakpoints**     | Object containing all defined breakpoints.                                        |
| **screens**         | Object containing all defined screens.                                            |
| **is**              | Utility to check if the current `breakpoint` or `screen` matches a specific size. |

#### Example of `is`

The `is` object provides a boolean map indicating which `breakpoint` or `screen` matches the current viewport.

```js
if (is.xs) {
  console.log("Current breakpoint is extra small");
}

if (is.lg) {
  console.log("Current breakpoint is large");
}

if (is.phone) {
  console.log("Current screen size is a phone");
}

if (is.lg && is.tablet) {
  console.log("Current breakpoint is large and screen is tablet");
}
```

## Events
You can listen to custom events for changes in **breakpoints**, **screens**, or **orientation**.

```js
import { EventPayload } from 'v-breakpoints';

onMounted(() => {
  window.addEventListener("breakpoint:change", handleChange);
  window.addEventListener("screen:change", handleChange);
  window.addEventListener("orientation:change", handleChange);
})

function handleChange(event: EventPayload) {
  console.log("Event Payload:", event.payload);
}
```

#### Event Payload
The `event.payload` includes detailed information about the current viewport state:

- **breakpoint**: The active `breakpoint`.
- **breakpointWidth**: Width of the current `breakpoint`.
- **screen**: Active `screen` size category.
- **screenWidth**: Width of the current `screen`.
- **orientation**: Current `orientation`.
- **width**: Current viewport width.
- **height**: Current viewport height.

## Directives
`v-breakpoints` provides directives to directly react to viewport changes in your templates.

#### Available Directives
- **v-breakpoint-change**: Reacts to `breakpoint` changes.
- **v-screen-change**: Reacts to `screen` changes.
- **v-orientation-change**: Reacts to `orientation` changes

#### Directive Usage Example

```html
<template>
  <div v-orientation-change="handleOrientationChange">
    <!-- Content goes here -->
  </div>
</template>

<script lang="ts">
import { EventPayload } from 'v-breakpoints';

export default {
  setup() {
    const handleOrientationChange = (event: EventPayload) => {
      console.log("Orientation changed to:", event.payload?.orientation);
    };

    return {
      handleOrientationChange,
    };
  },
};
</script>
```

## Configuration

You can override the default `breakpoints` and `screens` by passing options during plugin installation. This flexibility allows you to tailor the plugin to fit your specific design requirements.

```js
import { createApp } from 'vue';
import App from './App.vue';
import { breakpoints } from 'v-breakpoints';

createApp(App)
  .use(breakpoints, {
    screens: {
      "mini-tablet": 600,
    },
    breakpoints: {
      md: 740,
      "3xl": 1850,
    },
  })
  .mount("#app");

```

You can also define your own `breakpoints` and `screens` as shown below, which will override the default sizes defined by `v-breakpoints`.

```js
import { createApp } from 'vue';
import App from './App.vue';
import { breakpoints } from 'v-breakpoints';

createApp(App)
  .use(breakpoints, {
    override: {
      breakpoint: true, // Will not use `breakpoints` define by `v-breakpoints`
      screen: true // Will not use `screens` define by `v-breakpoints`
    },
    screens: {
      phone: 0,          // 0px - 767px
      tablet: 768,       // 768px - 1600px
      desktop: 1601,     // 1601px - Above
    },
    breakpoints: {
      xs: 0,       // 0px - 767px
      md: 768,     // 768px - 1023px
      lg: 1024,    // 1024px - Above
    },
  })
  .mount("#app");

```

## Default Breakpoints and Screens

#### Breakpoints
The default breakpoints follow Tailwind CSS standards.
```js
const defaultBreakpoints = {
  xs: 0,       // 0px - 639px
  sm: 640,     // 640px - 767px
  md: 768,     // 768px - 1023px
  lg: 1024,    // 1024px - 1279px
  xl: 1280,    // 1280px - 1535px
  "2xl": 1536, // 1536px - Above
};
```

#### Screens
The default screens cover a range of typical device sizes.
```js
const defaultScreens = {
  phone: 0,          // 0px - 767px
  tablet: 768,       // 768px - 1199px
  laptop: 1200,      // 1200px - 1600px
  desktop: 1601,     // 1601px - 1920px
  largeDesktop: 1921 // 1921px - Above
};
```

## Conclusion

`v-breakpoints` is a robust solution for managing responsive design in Vue applications. By centralizing and simplifying viewport handling, it ensures consistent and maintainable responsive behavior across your application.

## License

MIT License
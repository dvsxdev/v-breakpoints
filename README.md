# v-breakpoints

`v-breakpoints` provides **Vue 3 composition functions** to manage and respond to changes in the browser's viewport size, facilitating responsive design and screen orientation adjustments in Vue applications.

## Features

- **Dynamic Breakpoint Management**: Define and utilize custom breakpoints seamlessly.
- **Responsive Hooks**: Employ Vue composition functions to adapt to screen size and orientation changes.
- **Lightweight and Efficient**: Adds minimal overhead to your Vue projects, ensuring performance remains optimal.

## Installation

Install `v-breakpoints` using npm or yarn:

```bash
npm install v-breakpoints
```

or

```bash
yarn add v-breakpoints
```

## Usage

#### Basic Usage

To get started, import `useBreakpoints` into your Vue component and access the reactive state:

```html
<script setup>
  import { onMounted } from "vue"
  import { useBreakpoints } from "v-breakpoints"

  const { breakpoint } = useBreakpoints()

  onMounted(() => {
    console.log(breakpoint.value)
  })
</script>
```

#### Default Breakpoints

The package comes with these predefined breakpoints:

```js
const defaultBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}
```

#### Custom Breakpoints

Override the default breakpoints by passing custom values to `useBreakpoints`:

```js
const { breakpoint } = useBreakpoints({
  sm: 540,
  "3xl": 1800,
})
```

#### Get Breakpoints

Also, you can retrieve the list of configured breakpoints.

```js
const { breakpoints } = useBreakpoints()
console.log(breakpoints)
/* {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} */
```

#### Reactive State Attributes

`useBreakpoints` returns the following reactive state attributes:

| State               | Description                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **breakpoint**      | Active breakpoint based on current screen width.                                                                       |
| **width**           | Current viewport width in pixels.                                                                                      |
| **height**          | Current viewport height in pixels.                                                                                     |
| **breakpointWidth** | The width in pixels associated with the current `breakpoint`.                                                          |
| **orientation**     | Current screen orientation (**portrait**, **landscape**, **square**, or null if the orientation cannot be determined). |

## Global Configuration

You can globally configure breakpoints in your Vue application's main entry file (typically `main.ts` or `main.js`):

```js
import { createApp } from "vue"
import App from "./App.vue"
import { breakpoints } from "v-breakpoints"

const app = createApp(App)

app.use(breakpoints, {
  sm: 540,
  "3xl": 1800,
})

app.mount("#app")
```

## License

MIT License

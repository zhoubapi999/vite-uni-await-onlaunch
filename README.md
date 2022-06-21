**English | [简体中文](https://github.com/zhoubapi999/vite-uni-await-onlaunch/blob/master/README.zh-CN.md)**
# vite-uni-await-onlaunch

A vite plug-in to solve the asynchronous problem between onlaunch and onload in uniapp+vue3.2

## Install (pnpm or npm)

```bash
pnpm add vite-uni-await-onlaunch -D
```

or

```bash
npm i vite-uni-await-onlaunch -D
```

## Usage

- Config plugin in vite.config.ts. In this way, the required functions can be introduced as needed

```ts
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import AwaitOnlaunch from 'vite-uni-await-onlaunch'

export default defineConfig({
  plugins: [vue(), AwaitOnlaunch({
    fn: () => {
      // your code
      // return a promise
      return Promise.resolve(1)
    }
  })],
})

```

##  0ptions
|  params   | required  | type | default
|  ----  | ----  |----  | ----  | 
| fn  | yes | `() => Promise<any>` | 无
| pagesRE  | no | `RegExp` | /src[\/\\]pages[\/\\]((?!.+(component(s)?|static).+).)*\.vue$/
| triggerMethods  | no | `string[]` |`['onLoad', 'onShow']`


## License

MIT

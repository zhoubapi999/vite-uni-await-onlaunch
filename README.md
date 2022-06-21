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
|  params   | required  | type | default | explain
|  ----  | ----  |----  | ----  | ----  | 
| fn  | yes | `() => Promise<any>` |  | <div style="width: 300pt">methods to be executed first on the current page, such as login, etc
| pagesRE  | no | `RegExp` | /src/pages | <div style="width: 300pt">page regularity to insert fn</div>
| triggerMethods  | no | `string[]` |`['onLoad', 'onShow']`| <div style="width: 300pt">The inserted life cycle array has a decreasing priority. Only one is inserted. For example, if the page has onload and Onshow, it is only executed in advance in onload.fn</div>


## License

MIT

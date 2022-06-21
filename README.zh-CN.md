# vite-uni-await-onlaunch

解决uniapp+vue3.2中onlaunch和onload之间异步问题的vite插件

## Install (pnpm or npm)

```bash
pnpm add vite-uni-await-onlaunch -D
```

or

```bash
npm i vite-uni-await-onlaunch -D
```

## Usage


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
|  参数   | 必填  | 类型 | 默认值
|  ----  | ----  |----  | ----  | 
| fn  | yes | `() => Promise<any>` | 无
| pagesRE  | no | `RegExp` | /src[\/\\]pages[\/\\]((?!.+(component(s)?|static).+).)*\.vue$/
| triggerMethods  | no | `string[]` |`['onLoad', 'onShow']`


## License

MIT
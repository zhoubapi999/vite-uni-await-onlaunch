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
|  参数   | 必填  | 类型 | 默认值 | 说明
|  ----  | ----  |----  | ----  | ----  | 
| fn  | yes | `() => Promise<any>` | 无 | <div style="width: 300pt">当前页面要先执行的方法，如登录等</div>
| pagesRE  | no | `RegExp` | src下的pages目录 | <div style="width: 300pt">需要插入fn的页面正则，默认src下的pages目录</div>
| triggerMethods  | no | `string[]` |`['onLoad', 'onShow']` | <div style="width: 300pt">插入的生命周期数组，优先级递减，只插入一个，如页面有onLoad和onShow，只在onLoad中提前执行fn</div>


## License

MIT

import path from 'path';
import normallize from 'normalize-path';
export const defaultPagesRE =
  /src[\/\\]pages[\/\\]((?!.+(component(s)?|static).+).)*\.vue$/;

export interface Options {
  pagesRE?: RegExp;
  fn: () => Promise<any>;
  triggerMethods?: string[]; // 触发时机,优先级递减，只触发一次
}

export default function (options: Options) {
  const {
    pagesRE = defaultPagesRE,
    fn,
    triggerMethods = ['onLoad', 'onShow'], // uniapp setup暂不支持suspense
  } = options;

  return {
    name: 'vite-plugin-uni-await-onlaunch',
    enforce: 'pre',
    transform(code, id) {
      if (!fn) return;
      id = normalizePagePathFromBase(id);
      if (pagesRE.test(normalizePagePathFromBase(id))) {
        const codeArr = code.split('\n');
        const triggerMethod = getTriggerMethod(code);
        code = codeArr
          .map((m) => {
            if (triggerMethod && m.includes(triggerMethod)) {
              m = replaceStr(m, triggerMethod);
            }
            return m;
          })
          .join('\n');
      }
      return { code, map: null };
    },
  };

  // 返回第一个匹配的方法
  function getTriggerMethod(code: string[]) {
    for (const method of triggerMethods) {
      if (code.includes(method)) {
        return method;
      }
    }
    return '';
  }

  // 替换字符串
  // 判断有无 async，无的话插入
  // 执行 fn 并插入到 {} 之间
  function replaceStr(str: string, triggerMethod: string) {
    const name = 'fn' + +new Date();
    if (!str.includes('async')) {
      str = str.replace(`${triggerMethod}(`, `${triggerMethod}(async `);
    }
    str = str.replace(`{`, `{\nconst ${name} = ${fn}\nawait ${name}()\n`);
    return str;
  }

  function normalizePagePathFromBase(file) {
    return normallize(path.relative(process.cwd(), file));
  }
}

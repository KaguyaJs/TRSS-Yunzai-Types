# TRSS-Yunzai-Types

为 [TRSS-Yunzai](https://github.com/TimeRainStarSky/Yunzai) 提供全局对象的 TypeScript 类型支持。

[![pkg.pr.new](https://pkg.pr.new/badge/KaguyaJs/TRSS-Yunzai-Types)](https://pkg.pr.new/~/KaguyaJs/TRSS-Yunzai-Types)

> [!TIP]
> 本项目提供的全局类型仅供参考，如需完整的模块类型支持，可以使用内置类型的 [Fork 版本](https://github.com/KaguyaJs/TRSS-Yunzai) 作为开发环境框架。

## 使用教程

### 方法一：借助 `@types` 自动注册全局对象（推荐）

使用 `@types` 作用域可以让 TypeScript 自动识别全局类型，无需额外配置，推荐大多数项目使用此方式：

```bash
pnpm add -D @types/trss-yunzai@npm:@kaguyajs/trss-yunzai-types
```

### 方法二：手动配置全局类型

1. 安装类型库：

```bash
npm install -D @kaguyajs/trss-yunzai-types
# 或者使用 pnpm
pnpm add -D @kaguyajs/trss-yunzai-types
```

2. 配置全局类型白名单

在你的项目的 `tsconfig.json` 或 `jsconfig.json` 中添加 `types` 字段：
  
> [!WARNING]
> 配置了 `types` 白名单后，TypeScript **只会自动加载白名单中的类型包**。  
> 这意味着其他未列出的类型包（包括 `@types` 下的常规类型）将不会被自动识别，需要手动在 `types` 中添加或通过 `import` 引入。

```json
{
  "compilerOptions": {
    "types": [
      "@kaguyajs/trss-yunzai-types"
    ]
  }
}
```

## 已支持全局类型

  > [!IMPORTANT]
  > 本项目的大部分类型继承自ICQQ.js，对于其他协议端/适配器可能存在不准确性。

 - [x] logger
 - [x] segment
 - [x] Bot
 - [x] redis
 - [x] plugin
 - [ ] Renderer

## 在项目中使用

如果想要获得更加准确的 e 事件类型，需要使用plugin泛型

在 TypeScript 中：

```ts
// plugin泛型使用事件名称以获得更精准的类型提示
export class Example extends plugin<'message.group'> {
  constructor () {
    super({
      name: '示例插件',
      dsc: '插件功能示例',
      event: 'message.group', // 此时event将被约束与泛型一致
      priority: 5001,
      rule: [
        {
          reg: '说你好',
          fnc: 'HandleFnc'
        },
        {
          reg: '测试',
          fnc: 'test'
        },
        {
          reg: '你好',
          fnc: 'Hello'
        }
      ]
    })
  }

  // 给 e 赋予默认值：this.e
  async HandleFnc(e = this.e) { // IDE会自动推断 e 与 this.e 类型一致
    await e.reply("你好")
    return true
  }

  // 如果你不希望给 e 赋予默认值也可以只赋予类型
  async test(e: typeof this.e) {
    // 此时同样能够获得类型提示
    if (!(e.user_id === 10086 || e.isMaster)) return false
    await e.reply("Hello world")
    return true
  }
  
  // 或者直接使用 this.e
  async Hello() {
    if (e.isMaster) {
      await this.e.reply("Hello Master!")
    } else {
      await this.e.reply(`Hello ${this.e.user_id}!`)
    }
    return true
  }
}
```

如果是在 JavaScript 环境中则可以借助 JSDoc 实现

```js
/**
 * @augments {plugin<'message.group'>}
 */
export class Example extends plugin {
  constructor () {
    super({
      name: '示例插件',
      dsc: '插件功能示例',
      event: 'message.group',
      priority: 500,
      rule: [
        {
          reg: '测试',
          fnc: 'test'
        }
      ]
    })
  }

  /**
   * 测试
   * @param {typeof this.e} e
   */
  async test(e) {
    e.group_id // 鼠标悬停时显示类型和注释
  }

  // 如果觉得写JSDoc过于繁琐，给 e 赋予默认值也可以获得类型提示
  async hello(e = this.e) {
    e.user_id // 鼠标悬停时显示类型和注释
  }
}
```

---

通常情况下如果你不指定事件类型，一些群聊的字段和私聊的字段可能无法正常显示

```ts
async abc(e: typeof this.e) {
    e.group_id // ❌ 不存在的属性 在js中显示any
    e.group.muteMember() // ❌ 未定义
    e.friend.nickname // ❌ 不存在的属性或any
}
```

这时，可以通过显式判断 `isGroup` 和 `isPrivate`来推断是群聊还是私聊事件，但是这种写法不适用于通知或其他请求事件。

```ts
async abc(e: typeof this.e) {
  if (e.isGroup) {
    e.group_id // ✅ 正确显示类型
    e.group.muteMember(12345, 600) // ✅ 显示函数类型
  }
  if (e.isPrivate) {
    e.frined.nickname // ✅ 正确显示类型与注释
    e.friend.getAvatarUrl() // ✅ 正确显示函数类型与描述
  }
}
```

## 许可证

[GNU General Public License v3.0](./LICENSE)

## 免责声明

本项目仅供学习使用，禁止用于任何违法用途。

## 相关链接

- [TRSS-Yunzai](https://github.com/TimeRainStarSky/Yunzai)
- [Miao-Yunzai](https://github.com/yoimiya-kokomi/Miao-Yunzai)
- [icqq](https://github.com/icqqjs/icqq)
- [oicq](https://github.com/takayama-lily/oicq)
- [node-redis](https://github.com/redis/node-redis)

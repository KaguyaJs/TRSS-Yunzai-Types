# TRSS-Yunzai-Types

为 [TRSS-Yunzai](https://github.com/TimeRainStarSky/Yunzai) 提供全局对象的 TypeScript 类型支持。

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

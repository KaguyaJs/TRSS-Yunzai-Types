# TRSS-Yunzai-Types

适用于[TRSS-Yunzai](https://github.com/TimeRainStarSky/Yunzai)的类型支持库。

> [!TIP]
> 仅供参考，不保证完全正确可用

## 使用教程

1. 安装

```sh
npm i -D @kaguyajs/trss-yunzai-types # or pnpm i -D @kaguyajs/trss-yunzai-types
```

2. 配置

在你的项目的`jsconfig.json`或`tsconfig.json`中添加`types`字段

```json
{
  "types": [
    "@kaguyajs/trss-yunzai-types"
  ]
}
```

## 已支持类型

  > [!WARNING]
  > 本项目的大部分类型继承自ICQQ.js，更偏向于QQ平台，因此对于其他非QQ平台可能出现一些奇奇怪怪的问题，请酌情选择使用。

 - [x] logger
 - [x] segment
 - [x] Bot
 - [x] redis
 - [x] plugin

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

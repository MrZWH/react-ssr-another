## 前端技术选型
先问自己一个问题： 我的项目需求是怎么样的

### 如何区分
两大分类：
- 单页应用
  - 所有内容都在前端生成
  - JS 承担更多的业务逻辑，后端只需要提供 API
  - 页面路由跳转不需要经过后端
  - 常用类库：React、vue、angular、backbone
  - 架构工具：npm、bower、jspm
  - 模块化工具：webpack、rollup、browseriy
  - 处理静态文件：可以直接在 JS 代码中进行引用，并且交由模块化工具转化成线上可用的静态资源，并且可以定制转化过程以适应不同需求场景。
- 多页应用
  - 内容都由服务端用模板生成
  - 每次页面跳转都要经过服务端
  - JS 更多只是做做动画
  - 常用类库：jQuery、MooTools、YUI
  - 架构工具：grunt、gulp
  - 模块化工具：seajs(CMD)、requirejs(AMD)
  - 静态文件处理：使用 gulp 或 grunt 等工具手动编译到 html 中，自由度低，操作复杂。或者甚至不处理，交给后端，让后端服务处理。

### 其他考虑因素
- 浏览器兼容性
- toB 还是 toC
- 移动端还是 PC 端

## WebApp 架构简介
厉害的前端工程师要学会定制工程架构，对架构工具了如指掌。
### 工程架构：
- 解放生产力
  - 源代码预处理
  - 自动打包，自动更新页面显示
  - 自动处理页面依赖，保证开发和正式环境的统一
- 围绕解决方案搭建环境
  - 不同的前端框架需要不同的运行架构
  - 预期可能出现的问题并规避
- 保证项目质量（代码规范...）
  - code lint
  - 不同编写代码环境排除差异
  - git commit 预处理

### 项目架构
- 技术选型
- 数据解决方案
- 整体代码风格

## web 开发常用网络优化
### 优化方法
- 合并资源文件，减少 http 请求
- 压缩资源文件减小请求大小
- 利用缓存机制，尽可能使用缓存减少请求

## webpack
publicPath 区分静态文件
React.createElement

## 服务端渲染基础配置
### 为什么会有服务端渲染
单页应用存在的问题：
- SEO 不友好
- 首次请求等待时间较长，体验不好

### React 中如何使用服务端渲染
react-dom 是react 专门为 web 端开发的渲染工具。我们可以在客户端使用 react-dom 的 render 方法渲染组件，而在服务端，react-dom/server 提供我们将 react 组件渲染成 html 的方法。

新建入口文件 `server-entry.js`

新建 webpack 打包文件 `webpack.config.server.js`

npm i rimraf -D 用于删除 dist 文件夹

npm i express -D
创建服务端代码 server/server.js

create client/template.html

## 项目开发时的常用配置
- webpack dev server
- Hot Module Replacement

npm i webpack-dev-server -D

npm i cross-env -D
cross-env 用于设置 NODE_ENV 环境变量，兼容 windows mac

.babelrc 文件配置
npm i react-hot-loader@next -D

```
npm i axios -S
npm i memory-fs -D
npm i http-proxy-middleware -D
```
在 webpack-dev-server 启动的时候 template.html 不写到硬盘上，需要发送一个请求到 dev server 启动的服务上获取文件，详细见`server/util/dev-static.js`

## 使用 eslint 和 editorconfig 规范代码
### 为什么要用这些
- 规范代码有利于团队协作
- 纯手工规范费时费力而且不能保证准确性
- 能配合编辑器自动提醒错误，提高开发效率

### eslint
随着 ECMAScript 版本一致更新的 Js lint 工具，插件丰富并且能够套用规范，规则非常丰富，能够满足大部分团队的需求。

### eslint 配合 git
为了最大程度控制每个人的规范，我们可以在 git commit 代码的时候，使用 git hook 调用 eslint 进行代码规范验证，不规范的代码无法提交到仓库。

### editorconfig
不同编辑器对文本的格式会有一定的区别，如果不统一一些规范，可能你跟别人合作的时候每次更新别人的代码下来就有一大堆的报错。

```
npm i eslint babel-eslint eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-jsx-ally eslint-plugin-node eslint-plugin-react eslint-plugin-promise eslint-plugin-standard -D
```
// eslint-disable-line
```
npm i husky -D
```
husky 会在执行`git commit`的时候执行 script 脚本里的的 `precommit`

## 工程架构优化
合并 webpack 配置
```
npm i webpack-merge -D
```

由于，网页上请求 `favicon.ico`没有该文件会返回 html
```
// express 的插件
npm i serve-favicon -S
```

服务端渲染时文件改动了自动重启服务：
```
npm i nodemon -D
```
在编写配置文件`nodemon.json`
其中 verbose 表示输出详细信息
修改启动命令 script
一定要配置 "restartable": "rs"

## 项目架构

### 项目基本目录结构
- views
  - 用于存放项目功能模块的页面，需要根据路由配置情况分割子级目录。
- config
  - 存放一些配置目录，比如第三方类库引用，路由配置等
- store
  - 存放项目 store 相关的文件，包括数据获取的封装
- components
  - 存放非业务组件，或者在多个业务间都需要用到的功能组件。

### 路由配置
#### 什么是前端路由
路由是用来区分一个网站不同功能模块的地址，浏览器通过访问同一站点下的不同路由，来访问网站不同功能，同样路由也让开发者区分返回的内容。

#### 如何做前端路由
HTML5 API 中的 history 能够让我们控制 url 跳转后不刷新页面，而是交给我们的 JS 代码进行相应操作。在 history api 出现之前，我们可以使用 hash 跳转来实现。

#### react 中的路由
react-router 是一个非常好用的路由控制插件，能够让我们像书写 JSX 组件一样控制路由的跳转。
```
npm i react-router-dom -S
```
### 什么是 store
伴随 React 一起诞生的，是 Facebook 推出的一套前端数据流方案，叫做 flux，在其数据存储的地方，就叫 store，flux 又叫做单项数据流

#### Mobx
Mobx 是 flux 实现的后起之秀，其以更简单的使用和更少的概念，让 flux 使用起来变得更加简单。相比于 Redux 有 mutation、action、dispatch 等概念，Mobx 则更符合一个对 store 增删改查的操作概念

安装 mobx：
```
npm i mobx mobx-react -S
```

配置环境使用装饰器写法：
```
npm i babel-preset-stage-1 babel-plugins-transform-decorations-legacy -D
```
`.babelrc`
```
{
  "presets": [
    "stage-1",
  ],
  "plugins": ["transform-decorations-legacy"] //必须放在第一位
}
```

安装 react 组件 props 类型的工具：
```
npm i prop-types -S
```

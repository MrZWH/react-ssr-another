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
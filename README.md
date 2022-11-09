# 享智实验室安全管理平台 Labreview

## 基础功能
利用数字孪生，物联网等技术实现实验室安全管理

## 项目运行
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 主要技术栈
node.js,npm,ECMAScript6,Bable,vue-cli脚手架,vue-router,axios,webpack,vue.js

## 项目文件结构
### 部分重要文件解释
.git:同步至GitHub相关文件
package-lock.json/package.json:项目环境依赖锁
pulic:图片等资源存放
src:页面等主要文件，views为页面文件，router为路由配置

```
lmsystem
├─ .browserslistrc
├─ .eslintrc.js
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-applypatch
│  │  ├─ post-checkout
│  │  ├─ post-commit
│  │  ├─ post-merge
│  │  ├─ post-receive
│  │  ├─ post-rewrite
│  │  ├─ post-update
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-auto-gc
│  │  ├─ pre-commit
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate
│  │  ├─ update
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ README.md
├─ babel.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ img
│  │  └─ 404
│  │     └─ 404.png
│  └─ index.html
├─ src
│  ├─ App.vue
│  ├─ api
│  ├─ assets
│  │  ├─ js
│  │  │  └─ login.js
│  │  └─ logo.png
│  ├─ components
│  ├─ config
│  ├─ main.js
│  ├─ mock
│  ├─ plugins
│  │  ├─ index.js
│  │  └─ myPlugin.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  ├─ index.js
│  │  └─ module
│  │     └─ theme.js
│  ├─ util
│  │  └─ request.js
│  ├─ views
│  │  ├─ Error404.vue
│  │  ├─ chemicalType
│  │  │  ├─ borrowChemical
│  │  │  │  └─ borrowChemical.vue
│  │  │  ├─ chemicalAdd.vue
│  │  │  ├─ chemicalList.vue
│  │  │  └─ platformManage.vue
│  │  ├─ console
│  │  │  ├─ myTeam.vue
│  │  │  ├─ personalInformation.vue
│  │  │  └─ platform.vue
│  │  ├─ index.vue
│  │  ├─ layOut.vue
│  │  ├─ logIn.vue
│  │  ├─ message
│  │  │  └─ borrowMessage.vue
│  │  └─ role
│  │     ├─ addMember.vue
│  │     └─ roleList.vue
│  └─ vue.config.js
└─ vue.config.js

```

## written by Amos Tang
### mr.amos@njtech.edu.cn
### 此项目禁止开源，已经发现后果自负

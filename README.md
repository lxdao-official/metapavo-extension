## build

```bash
# 安装依赖
lerna run bootstrap
# 构建 extension
cd packages/metapavo
npm run build:dev
```

## struct

```bash
./extension/ # the result extesion folder
    |- manifest.json
    |- background.js
    |- content.js
    |- popup.js
├── pages
│   ├── content-script # the content script folder,注入到页面的js文件
│       ├── ContentScript.tsx # 入口
│       ├── components
│           ├── main    # 右侧划出的界面
│               ├── home    # 右侧划出的界面的主体组件
│                   ├── AccordionPage.tsx
│                   ├── index
│                   ├── nofound.tsx
│                   └── project
│                       ├── ProjectContainer.tsx
│                       └── ProjectMain.tsx
│               ├── login.tsx # 登录界面
│               ├── root.tsx # 主界面入口
│               └── styles.tsx # 样式文件
│           ├── pavo-ball # 球的组件
│               ├── ball.tsx # 球的组件
│               ├── status # 球的状态组件
│                   ├── danger.tsx
│                   └── success.tsx
│               └── styles.tsx
│           └── wallet  # 钱包组件
│               └── ConnectWallet.tsx
│       ├── context # 全局的上下文组件
│           ├── global.ts
│           └── useWallet.ts
│       └── plugins # 插件组件
│           └── date-tool
│               ├── selectText.tsx
│               └── util.ts
│   └── popup # 插件 popup 界面
│       ├── alarmList.tsx
│       ├── favList.tsx
│       └── popup.tsx
├── scripts # 其他插件脚本
│   ├── background.ts # 后台脚本
│   └── twitter.ts  # twitter 插件脚本（弃用）
└── utils
│   ├── apis # 后台接口
│       ├── fetch.ts
│       ├── nft_api.ts
│       └── types.ts
│   ├── detector # 垃圾twitter检测插件
│       └── src
│           ├── index.ts
│   └── recognizer # 主体信息识别脚本
│       ├── opensea.ts
│       ├── twitter.ts
│       └── website.ts


```

## 开发其他新的入口页面或脚本

```

add new script to extension

add entry to webpack config ./metapavo/config/webpack.config.js

entry: {
    app: paths.appIndexJs,
    content: paths.content,
    popup: paths.popup,
    background: paths.background,
    twitter: paths.twitter,
    login: paths.login,
},

```

## build

```bash
# install dependencies
lerna run bootstrap
# build extension
cd packages/metapavo
npm run build:dev
```

and then open chrome extension dev mode

add /extensions folder to chrome

each time you modify the extension, you need to rebuild and reload it in

## struct

```bash
./extensions/ # the result extesion folder
    |- manifest.json
    |- background.js
    |- content.js
    |- popup.js
├── pages
│   ├── content-script # the content script folder,JS file injected to the page
│       ├── ContentScript.tsx # 入口
│       ├── components
│           ├── main    # The interface drawn on the right
│               ├── home    # The main component of the interface drawn on the right
│                   ├── AccordionPage.tsx
│                   ├── index
│                   ├── nofound.tsx
│                   └── project
│                       ├── ProjectContainer.tsx
│                       └── ProjectMain.tsx
│               ├── login.tsx # login interface
│               ├── root.tsx # main interface entry
│               └── styles.tsx # style file
│           ├── pavo-ball # components of the ball
│               ├── ball.tsx # components of the ball
│               ├── status # ball state component
│                   ├── danger.tsx
│                   └── success.tsx
│               └── styles.tsx
│           └── wallet  # Wallet component
│               └── ConnectWallet.tsx
│       ├── context # global context component
│           ├── global.ts
│           └── useWallet.ts
│       └── plugins # Plugin components
│           └── date-tool
│               ├── selectText.tsx
│               └── util.ts
│   └── popup # Plugin popup interface
│       ├── alarmList.tsx
│       ├── favList.tsx
│       └── popup.tsx
├── scripts # Other plugin scripts
│   ├── background.ts # background script
│   └── twitter.ts  # twitter plugin script (deprecated)
└── utils
│   ├── apis # backend interface
│       ├── fetch.ts
│       ├── nft_api.ts
│       └── types.ts
│   ├── detector # Spam twitter detection plugin
│       └── src
│           ├── index.ts
│   └── recognizer # Subject Information Recognition Script
│       ├── opensea.ts
│       ├── twitter.ts
│       └── website.ts


```

## Develop other new entry pages or scripts

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

## struct

```
./extension/ # the result extesion folder
    |- manifest.json
    |- background.js
    |- content.js
    |- popup.js
./metapavo # this is a full react app to generate content script page
    |- src
        |- content # this is the content script page main file
            |- content.tsx # 入口文件
            |- components # this is the react components folder
                |- circle # 球相关代码和状态
                    |- circle.tsx # 球
                |- main  # 主体相关代码
                    |- main.tsx # 右侧弹出的界面入口
                    |- login.tsx # 登录界面
            |- plugins # 插件相关代码
                |- selectText.tsx # 选择文本组件
        |- popup # this is the popup page main file

    |- scripts # the other scripts

```

## build

```bash
lerna run build
```

## dev

```

add new content-script to extension

add entry to webpack config ./metapavo/config/webpack.config.js

entry: {
    app: paths.appIndexJs,
    content: "./src/content.tsx",
    background: "./src/scripts/background.ts",
    twitter: "./src/scripts/twitter.ts",
},

```

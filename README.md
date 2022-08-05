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

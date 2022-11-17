## build

```bash
# install dependencies
lerna bootstrap

# build website
npm run build:website

# run website dev
npm run dev:website

# build extension dev
npm run dev:extension

# build extension prod
npm run build:extension

```

and then open chrome extension dev mode

add /extensions folder to chrome

each time you modify the extension, you need to rebuild and reload it in

## struct

```bash

extensions/  # chrome extension dist dir
┣ _locales/
┣ contentscript/
┣ dashboard/
┣ data/      # data dir
┣ dist/      # build dir
┗ images/    # images dir

packages/
┣ extension-dashboard/  # dashboard code
┣ extension-provider/   # metamask inpage provider package
┣ metapavo/             # metapavo content-script code
┗ metapavo-website/     # metapavo website code


```

## Develop other new entry pages or scripts for content script

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

## code style guide

1. you should always use style-components to write style for components.
2. you should always define font/color/backgroundColor in every element, otherwise it will be overwritten by some page's styles.
3. you should never use mui components, because it will be overwritten by some page's styles.
4. you should never define global style or normal className in components, because it will be overwritten by some page's styles.

```

```

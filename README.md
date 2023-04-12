# vue-desktop-3

## Project setup

```
node -v
v14.15.4

npm -v
6.14.10
```


```
Electron 13.0.0

nvm use 14
npm install -g @vue/cli
npm install --global yarn

vue create my-app-name
cd my-app-name
yarn run electron:serve

# Bulid
vue add electron-builder
yarn add electron-builder@23.0.2
yarn run electron:build
```

Wiser Endpoints

```
WISERHUBURL = "http://{}/data/domain/"
WISERNETWORKURL = "http://{}/data/network/"
WISERMODEURL = "http://{}/data/domain/System/RequestOverride"
WISERSETROOMTEMP = "http://{}//data/domain/Room/{}"
WISERROOM = "http://{}//data/domain/Room/{}"
WISERSCHEDULEURL = "http://{}/data/domain/Schedule/{}"
WISERSMARTPLUGURL = "http://{}/data/domain/SmartPlug/{}"
WISERSMARTPLUGSURL = "http://{}/data/domain/SmartPlug"

```
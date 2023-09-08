# My Youtube

## Intro

A lightweight, ad-free Youtube video watching app built with VUE and Google Youtube Data API.

## Features & Functionality

- Google authorization
- Display channel lists subscribed by authorized user.
- Display play list created by authorized user.
- View channel details and play list.
- Play video and see video comments.
- Browse recommended videos.
- Subscribe/Unsubscribe channels.
- Two advantages compared to Youtube app: Ad free and playing in the background.

## Development setup

- Install Node.js and NPM.
- Under project root directory, run `npm install` to install packages.
- Create `.env.local` file under project root directory as per `.env.template`

- To get API key, you need to sign up on Google cloud platform, create a new project and create a new credential under the project so that you can get API key.

- To get your channel id, you need to first signup as a youtube user and navigate to your channel. You can get your channel id in URL: `https://www.youtube.com/channel/your_channel_id?view_as=subscriber`

- Run `npm start` to run it on local machine.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

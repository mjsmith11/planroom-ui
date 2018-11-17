# Getting Started

## node.js
This uses the node package manager ([npm](https://www.npmjs.com)) to manage dependencies.  Project information including direct dependencies is stored in `package.json`. The full dependency tree is stored in `package-lock.json`. Code for installed dependencies is stored in the `node_modules` directory.

## Vue.js
This project uses the [Vue.js](https://vuejs.org/) framework and was scaffolded using [Vue CLI 3](https://cli.vuejs.org/). The scripts in package.json all use Vue CLI services. When using the build script, artifacts that could be deployed are placed in the `dist` directory. The configuration for Vue is in `vue.config.js`. The primary building block used in this project is the Vue single file component. These components are files with the extension .vue and have three parts. The parts are a template in html, a script in JavaScript, and styling in CSS.

The application's entrypoint is `src/main.js`. This file sets up and mounts the application's primary Vue instance.

Environment variables are loaded from `.env` files. There are separate files for development, production, and test environments. Only variable names that start with `VUE_APP` are available to the client running in a browser.

### Vue Router
The Vue Router is used to make this project a single page application. It determines the component that should be rendered for each route visited and provides the component with any url arguments, query parameters, etc. The router is in `src/router.js`, and it uses lazy loading so that the user doesn't have to download all JavaScript and CSS assets unless they are all needed.

### Vuex
Vuex can be used for state management in Vue.js applications.  A standard Vuex store has 4 parts:
 - State: An object that contains data representing the current state.
 - Getters: Retrieve a piece of data or derived data from the state.
 - Mutations: Change the state and must be synchronous.
 - Actions: Commit mutations to change the state and can be asynchronous.

 The Vuex store for this application is in `src/store.js` and keeps track of the current user and login status.

### Event Bus
This application uses a secondary Vue instance as an event bus for communication between Vue components. This event bus is created in src/event-bus.js.

### Public Assets
The `public` directory contains the applications static assets. `index.html` shows the Vue component in src/App.vue. The template for this component contains `<router-view/>` which is where the component indicated by the route will be rendered. The Vue Router is using [HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) which requires that the server always serves `index.html` for any route.  The `.htaccess` file contains configuration for an Apache server to serve `index.html` in this manner.

## PostCSS
[PostCSS](https://postcss.org/) provides CSS transforming features and is configured in `postcssrc.js`.

## Unit Testing
[Jest](https://jestjs.io/) is used as the unit testing framework for this project.  Configuration for jest is in jest.config.js.  Test files are in the tests/unit directory and end with `.spec.js`. [Vue Test Utils](https://vue-test-utils.vuejs.org/) is also used as a testing utility library.

## Linting
[ESLint](https://eslint.org/) is used to enforce style rules.  It is configured at a directory level using `.eslint.js` files. For example, this project uses a global `.eslint.js` in the root directory and overrides it in `/tests/unit`.

## Babel
[Babel](https://babeljs.io/) is used as a JavaScript compiler. It allows JavaScript ES6 syntax and will output browser-compatible JavaScript. It is configured in `babel.config.js`.

## Targeted Browsers
(browserslist)[https://github.com/browserslist/browserslist] allows configuration in `.browserslistrc` to specify targeted browsers and be shared with multiple tools used in the project.

## Travis
[Travis CI](https://travis-ci.org/) is used for [Continuous Integration Builds](https://travis-ci.org/mjsmith11/planroom-ui). Build settings, scripts, etc. are in `.travis.yml`.
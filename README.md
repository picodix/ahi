![logo](template/src/assets/logo.png?raw=true)

# ahi

> Ahi is the Maori name for `fire`. Built on top of the official [webpack](https://github.com/vuejs-templates/webpack) template, Ahi will bring you a warm and comfortable feeling that only a good fire can provide.

## Features

This template is Vue 2.0 compatible, and is a fork of the official [webpack](https://github.com/vuejs-templates/webpack) template. A few more optional opinionated features and conventions are bundled with Ahi:

- **[VueX](https://picodix.github.io/ahi/store.html)** installed and ready to use
- **[Routing](https://picodix.github.io/ahi/routing.html)** using official [vue-router](https://github.com/vuejs/vue-router) and conventions with Vue async component and Webpack Code splitting.
- **[SVG Sprites](https://picodix.github.io/ahi/svg.html)** using [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) and conventions.
- **[SCSS](https://picodix.github.io/ahi/scss.html)** using [sass-loader](https://github.com/webpack-contrib/sass-loader) and globally available mixins, fonts and variables.
- **[Docute documentation](https://picodix.github.io/ahi/documentation.html)** generate a doc based on your component's `README.md` files using [Docute](docute.js.org).

## Documentation

- [For this template](http://picodix.github.io/ahi): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init picodix/ahi my-project
$ cd my-project
$ npm install
$ npm run dev
```

If port 9090 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise `npm run dev` will fail.

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.

- `npm run docs`: Generate documentation based on [Docute](docute.js.org).
  - Parse folder in the `components` directory and grab the `README.md` file of every single component.
  - Create a `components.md` file in the docs directory containing README.md of every components
  - Watch for `README.md` changes and regenerate doc.
  - hot reload

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015+ in test files.
  - Supports all webpack loaders.
  - Easy mock injection.

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```

## Todos

- [ ] Write documentation
- [ ] Move documentation configuration to a config file

# Pre-Processors

This boilerplate has pre-configured CSS extraction for SASS.

Note `node-sass` is also installed because `sass-loader` depends on it as a peer dependency.

### Using SCSS inside Components

You can use `scss` inside your `*.vue` components using the `lang` attribute on `<style>` tags:

``` html
<style lang="scss">
/* write SASS! */
</style>
```

### Global access to mixins, font and variables

Using a Webpack trick every component has also access to `mixins`, `fonts` and `variables` defined in `src/styles/imports.scss` without having to import it.


### A note on SASS syntax

- `lang="scss"` corresponds to the CSS-superset syntax (with curly braces and semicolones).
- `lang="sass"` corresponds to the indentation-based syntax.


### Standalone CSS Files

For consistent extraction and processing, a standalone file is imported globally in the root `App.vue` component, like so:

``` html
<!-- App.vue -->
<style src="styles/main.scss" lang="scss"></style>
```

For existing libraries e.g. Bootstrap or Semantic UI, you can place them inside `/static` and reference them directly in `index.html`.
This avoids extra build time and also is better for browser caching. (See [Static Asset Handling](static.md))

# Routing

Ahi is wrapping [vue-router](https://github.com/vuejs/vue-router) to provide routes to your application.

You can follow the [documentation here](http://router.vuejs.org/en/index.html).

## Add routes

Add routes in the file `/src/routes/index.js` following the [vue-router documentation](http://router.vuejs.org/en/index.html)
You can use the `@` to point to the `src` folder.

Combining Vue's [async component feature](https://vuejs.org/v2/guide/components.html#Async-Components) and Webpack's [code splitting](https://webpack.js.org/guides/code-splitting-require/) feature, it's trivially easy to lazy-load route components like the example bellow.

```javascript
export default [
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/sections/Home.vue'], resolve)
    },
    {
        path: '/about',
        name: 'about',
        component: resolve => require(['@/sections/About.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/home'
    }
]
```

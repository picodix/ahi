{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import Router from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import routes from './routes'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Head from 'vue-head'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#vuex}}
import { sync } from 'vuex-router-sync'
import store from '@/vuex/store'
{{/vuex}}
{{/router}}

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}

// plugins
Vue.use(Router)
Vue.use(Head)

// router options
const router = new Router({
    scrollBehavior: () => ({ y: 0 }),
    mode: 'hash',
    base: process.env.ROOT_URL,
    linkActiveClass: 'on',
    routes
})
{{#vuex}}

// sync router
sync(store, router)
{{/vuex}}
{{/router}}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    {{#router}}
    router,
    {{/router}}
    {{#if_eq build "runtime"}}
    render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    template: '<App/>',
    components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

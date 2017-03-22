<template>
    <div id="app">
        <img src="./assets/logo.png">
        {{#router}}
        <router-view></router-view>
        {{else}}
        <hello></hello>
        {{/router}}
    </div>
</template>

<script>
{{#unless router}}
import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
export default {
    name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
    components: {
        Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{/router}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style src="styles/main.scss" lang="scss"></style>

<template>
    <div id="app">
        {{#if svg}}
        <icon name="logo"></icon>
        {{else}}
        <img src="./assets/logo.png">
        {{/if}}

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
{{#vuex}}

// vuex
import store from '@/vuex/store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import debounce from 'lodash/debounce'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/vuex}}
export default {
    name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
    components: {
        Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{/router}}{{#vuex}},
    methods: {
        save: function () {
            this.$bus.$emit('app:resize')
            this.$store.dispatch('saveSize', {
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    },
    created: function () {
        this.save(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
        this.resize = debounce(this.save, 500){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
        window.addEventListener('resize', this.resize, false){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    },
    store{{/vuex}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style src="styles/main.scss" lang="scss"></style>

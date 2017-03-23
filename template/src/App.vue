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
{{#vuex}}

// vuex
import store from '@/vuex/store'
import debounce from 'lodash/debounce'

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
        this.save()
        this.resize = debounce(this.save, 500)
        window.addEventListener('resize', this.resize, false)
    },
    store{{/vuex}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style src="styles/main.scss" lang="scss"></style>

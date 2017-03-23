<template>
    <section class="home">
        Home Section
        <router-link :to="{ name: 'about', params: {}}">Navigate to About</router-link>
    </section>
</template>

<script>
    export default {
        name: 'home',

        head: {
            title: {
                inner: 'Home',
                separator: ' ',
                complement: ' '
            }
        },

        props: {
        },

        data: () => ({
        }),

        components: {
        },

        methods: {
        },

        mounted () {
        },

        beforeDestroy () {
        }
    }
</script>

<style scoped>
</style>

<template>
    <section class="about">
        About section
        <router-link :to="{ name: 'home', params: {}}">Navigate to Home</router-link>
    </section>
</template>

<script>
    export default {
        name: 'about',

        head: {
            title: {
                inner: 'About',
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

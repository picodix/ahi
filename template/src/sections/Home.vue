<template>
    <section class="home">
        Home Section
        <router-link :to="{ name: 'about', params: {}}">Navigate to About</router-link>
    </section>
</template>

<script>
    export default {
        name: 'home',

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

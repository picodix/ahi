<template>
    <section class="about">
        About section
        <router-link :to="{ name: 'home', params: {}}">Navigate to Home</router-link>
    </section>
</template>

<script>
    export default {
        name: 'about',

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

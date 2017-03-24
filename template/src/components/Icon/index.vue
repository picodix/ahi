<template>
    <svg class="icon" :class="'icon-' + name">
        <use :xlink:href="xlink"/>
    </svg>
</template>

<script>
module.exports = {
    props: ['name'],
    computed: {
        xlink () {
            return require(`@/assets/svg/${this.name}.svg`)
        }
    }
}
</script>

<style></style>

<template>
    <svg aria-hidden="true">
        <use :xlink:href="svgName"></use>
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        iconName: { type: String, required: true }
    },
    computed: {
        svgName () { return `#icon-${this.iconName}` }
    }
}
</script>

<style scoped>
</style>

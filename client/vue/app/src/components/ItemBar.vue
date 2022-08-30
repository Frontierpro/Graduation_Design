<template>
    <div class="itemBar">
        <span v-for="item in num" :key="item"
        :class="{'item': true, 'active': item == position + 1}"
        @click="select(item)">
            {{ ('0' + item).slice(-2) }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'ItemBar',
    props: {
        num: { type: Number, required: true },
        position: { type: Number, required: true }
    },
    methods: {
        select: function (val) {
            this.$emit('positionChange', val - 1)
        }
    }
}
</script>

<style scoped>
.itemBar {
    position: fixed;
    width: calc(100vw - 380px);
    height: 35px;
    background-color: white;
}

.item {
    width: 35px;
    height: 22px;
    line-height: 22px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    margin-right: 13px;
    border: 1.5px solid cornflowerblue;
    border-radius: 2px;
    color: cornflowerblue;
    cursor: pointer;
}

.active {
    background-color: cornflowerblue;
    color: white;
}
</style>

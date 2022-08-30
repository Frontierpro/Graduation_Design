<template>
    <div class="toggleBtn">
        <span :class="{'divBtn': true, 'leftBtn': true, 'active': selection === 'left'}"
        @click="select('left')">{{ leftText }}</span>
        <span :class="{'divBtn': true, 'rightBtn': true, 'active': selection === 'right'}"
        @click="select('right')">{{ rightText }}</span>
    </div>
</template>

<script>
export default {
    name: 'ToggleButton',
    props: {
        selection: { type: String, required: true },
        leftText: { type: String, required: true },
        rightText: { type: String, required: true }
    },
    methods: {
        select: function (val) {
            this.$emit('selectionChange', val)
        }
    }
}
</script>

<style scoped>
.toggleBtn {
    position: absolute;
    width: 100px;
    height: 22px;
    margin-top: 22px;
    margin-left: 40px;
    border: 2px solid yellowgreen;
    border-radius: 2px;
    cursor: pointer;
}

.divBtn {
    position: absolute;
    width: 50px;
    text-align: center;
    font-weight: 550;
    font-size: 13px;
    height: 22px;
    line-height: 22px;
}

.rightBtn {
    margin-left: 50px;
}

.active {
    background-color: yellowgreen;
    color: white;
}

</style>

<template>
    <div>
        <span :class="{'clkBtn': true, 'disable': disabled, 'hover': hover, 'active': active}"
        @mouseover="mouseOver" @mouseout="mouseOut"
        @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseLeave">
            {{ title }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'ClkBtn',
    props: {
        title: { type: String, required: true },
        disabled: { type: Boolean, required: true }
    },
    data () {
        return { hover: false, active: false }
    },
    methods: {
        mouseOver: function () { this.hover = true && !this.disabled },
        mouseOut: function () { this.hover = false },
        mouseDown: function () { this.active = true && !this.disabled },
        mouseLeave: function () { this.active = false },
        mouseUp: function () {
            this.active = false
            if (this.title === '保 存')
                this.hover = false
            this.$emit('btnClick')
        }
    }
}
</script>

<style scoped>
.clkBtn {
    position: fixed;
    display: inline-block;
    background-color: cornflowerblue;
    color: white;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    font-weight: 550;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
}

.hover {
    box-shadow: cornflowerblue 0 0 5px; 
}

.active {
    background-color: #4586F3;
}

.disable {
    background-color: #cccccc;
    cursor: default;
}
</style>

<template>
    <div class="form">
        <div class="mask head">
            <ClkBtn class="top" :disabled="false" title="发 布" @btnClick="mouseUp('release')" />
        </div>

        <div class="mask foot">
            <ClkBtn class="left" :disabled="!update" title="保 存" @btnClick="mouseUp('save')" />
            <ClkBtn class="right" :disabled="false" title="删 除" @btnClick="mouseUp('drop')" />
        </div>

        <div class="pseudoHead"></div>

        <div v-for="form in formList" :key="form.sec">
            <div class="inputBar">
                <span class="titleText">{{ form.tit }}</span>
                
                <div class="textInput">
                    <input type="text" spellcheck="false" :placeholder="placeHolder(form)"
                    :value="form.text" @input="textInput" @keyup.enter="mouseUp(form.sec)"
                    @focus="inputFocus(form.sec)" @blur="inputBlur(form.sec)" />

                    <span :class="{'ctrlBtn': true, 'hover': hover[form.sec], 'active': active[form.sec]}"
                    @mouseover="mouseOver(form.sec)" @mouseout="mouseOut(form.sec)"
                    @mousedown="mouseDown(form.sec)" @mouseleave="mouseLeave(form.sec)"
                    @mouseup="mouseUp(form.sec)">
                        <SvgIcon class="svgIcon" :iconName="form.svg" />
                    </span>
                </div>
            </div>

            <div class="optionList" v-if="form.sec !== 'title' && focus[form.sec]" :style="listHeight(form)">
                <span class="option" v-for="label in curList(form)" :key="label.id"
                @mousedown="setInput({'event': form.sec, 'text': label.title})">
                    {{ label.title }}
                </span>
            </div>

            <div v-for="txt in instance[form.sec]" :key="txt"
            class="optionBkg" v-show="form.sec !== 'title'">
                <span class="optionTxt">{{ txt }}</span>
                <span class="optionBtn" @click="optionDelete({'event': form.sec, 'text': txt})">
                    <SvgIcon class="svgBtn" iconName="delete" />
                </span>
            </div>
        </div>

        <div class="pseudoFoot"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Sketch',
    computed: {
        ...mapState('sketch', ['update', 'formList', 'hover', 'active', 'focus']),
        ...mapState('listing', ['instance']),
        ...mapGetters('listing', ['caption']),
        ...mapGetters('sketch', ['focusInput']),
        listHeight () {
            return function (form) {
                return `height: ${25 * (this.curList(form).length <= 4 ? this.curList(form).length : 4)}px;`
            }
        },
        curList () {
            return function (form) {
                if (form.text.length === 0)
                    return form.list
                return form.list.filter((label) => {
                    return label.title.toLowerCase().indexOf(form.text.toLowerCase().trim()) >= 0
                })
            }
        },
        placeHolder () {
            return function (form) { return form.sec === 'title' ? this.caption : '---' }
        }
    },
    methods: {
        ...mapMutations('sketch', [
            'mouseOver', 'mouseOut', 'mouseDown', 'mouseLeave', 'setInput', 'inputFocus', 'inputBlur'
        ]),
        ...mapActions('sketch', ['mouseUp', 'optionDelete']),
        textInput (event) { this.setInput({'event': this.focusInput, 'text': event.target.value}) }
    }
}
</script>

<style src="../../assets/css/form.css" scoped></style>

<style scoped>
.head {
    height: 70px;
}

.top {
    margin-top: 23px;
    margin-left: calc(100vw - 450px);
}

.pseudoHead {
    height: 70px;
}

.optionList {
    overflow-y: auto;
    width: calc(100vw - 485px);
    margin-left: 80px;
    background-color: #f2f2f2;
    border-radius: 3px;
    margin-bottom: 5px;
}

.optionList::-webkit-scrollbar {
    width: 0;
}

.option {
    display: inline-block;
    width: calc(100vw - 495px);
    padding-left: 10px;
    font-size: 12px;
    font-weight: 550;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
}

.option:hover {
    background-color: #dddddd;
}

.optionBkg {
    position: relative;
    width: calc(100vw - 485px);
    height: 23px;
    margin-left: 80px;
}

.optionTxt {
    position: absolute;
    font-size: 13px;
    font-weight: 550;
    height: 23px;
    line-height: 23px;
    margin-left: 17px;
}

.optionBtn {
    position: absolute;
    background-color: coral;
    width: 11px;
    height: 11px;
    margin-top: 6px;
    border-radius: 2px;
    cursor: pointer;
}

.optionBtn:hover {
    background-color: #EB4334;
}

.svgBtn {
    position: absolute;
    width: 9px;
    height: 9px;
    margin-top: 1px;
    margin-left: 1px;
}
</style>

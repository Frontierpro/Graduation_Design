<template>
    <div class="form">
        <div class="mask foot">
            <ClkBtn class="left" :disabled="false" :title="leftTitle" @btnClick="leftClick" />
            <ClkBtn class="right" :disabled="false" title="删 除" @btnClick="mouseUp('drop')" />
        </div>

        <input :value="url" class="link" ref="link" />

        <div class="pseudoHead"></div>

        <div class="inputBar">
            <span class="titleText">试卷链接</span>    
            <div class="textInput">
                <input class="url" type="text" spellcheck="false" :placeholder="url" :disabled="true" />
                <span :class="{'ctrlBtn': true, 'hover': hover['copy'], 'active': active['copy']}"
                @mouseover="mouseOver('copy')" @mouseout="mouseOut('copy')"
                @mousedown="mouseDown('copy')" @mouseleave="mouseLeave('copy')"
                @mouseup="copyLink">
                    <SvgIcon class="svgIcon" iconName="link" />
                </span>
            </div>
        </div>

        <div class="inputBar">
            <span class="titleText">答卷抽取</span>    
            <div class="textInput">
                <input class="sel" type="text" spellcheck="false" readonly="readonly"
                :placeholder="placeHolder" @focus="setFocus(true)" @blur="setFocus(false)" />
                <span class="ctrlBtn"><SvgIcon class="svgIcon" iconName="turn" /></span>
            </div>
        </div>

        <div class="optionList" v-if="focus" :style="listHeight">
            <span class="option" v-for="(label, index) in result" :key="label.name"
            @mousedown="setSelect(index + 1)">
                {{ label.name }}
            </span>
        </div>

        <div class="section" v-if="instance.reading.length > 0">
            <span class="titleText marginTop">阅读部分</span>  
            <div class="textArea" v-for="(txt, index) in instance.reading" :key="txt">
                <span class="titleArea">{{ txt }}</span>
                <span class="answerArea">{{ answer('reading', index) }}</span>
            </div>
        </div>

        <div class="section" v-if="instance.listening.length > 0">
            <span class="titleText marginTop">听力部分</span>  
            <div class="textArea" v-for="(txt, index) in instance.listening" :key="txt">
                <span class="titleArea">{{ txt }}</span>
                <span class="answerArea">{{ answer('listening', index) }}</span>
            </div>
        </div>

        <div class="section" v-if="instance.speaking.length > 0">
            <span class="titleText marginTop">口语部分</span>  
            <div class="textArea" v-for="(txt, index) in instance.speaking" :key="txt">
                <span class="titleArea">{{ txt }}</span>
                <span class="answerArea urlType">{{ answer('speaking', index).slice(77) }}</span>
                <span class="ctrlBtn" @click="download('speaking', index)">
                    <SvgIcon class="svgIcon" iconName="link" />
                </span>
            </div>
        </div>

        <div class="section" v-if="instance.writing.length > 0">
            <span class="titleText marginTop">写作部分</span>  
            <div class="textArea" v-for="(txt, index) in instance.writing" :key="txt">
                <span class="titleArea">{{ txt }}</span>
                <span class="answerArea urlType">{{ answer('writing', index).slice(76) }}</span>
                <span class="ctrlBtn" @click="download('writing', index)">
                    <SvgIcon class="svgIcon" iconName="link" />
                </span>
            </div>
        </div>
        
        <div class="pseudoFoot"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Result',
    computed: {
        ...mapState(['user']),
        ...mapState('result', ['hover', 'active', 'focus', 'select']),
        ...mapState('listing', ['code', 'instance', 'result']),
        ...mapGetters('listing', ['status']),
        url () { return `http://106.12.17.34/toefl?uid=${this.user}&pid=${this.code}` },
        leftTitle () { return this.status === 2 ? '暂 停' : '恢 复' },
        listHeight () {
            return `height: ${25 * (this.result.length <= 4 ? this.result.length : 4)}px;`
        },
        placeHolder () {
            return this.select === 0 ? '---' : this.result[this.select - 1].name
        },
        answer () {
            return function (name, index) {
                if (this.select > 0) {
                    let str = JSON.stringify(this.result[this.select - 1][name][index].reply)
                    str = str.replaceAll('"', '').replaceAll(',', ', ')
                    return str.replace('[', '').replace(']', '')
                }
                return ''
            }
        }
    },
    methods: {
        ...mapMutations('result', [
            'mouseOver', 'mouseOut', 'mouseDown', 'mouseLeave', 'setFocus', 'setSelect'
        ]),
        ...mapActions('result', ['mouseUp']),
        leftClick () { this.status === 2 ? this.mouseUp('stop') : this.mouseUp('open') },
        copyLink () {
            this.$refs.link.select()
            document.execCommand('copy')
            this.mouseUp('copy')
        },
        download (name, index) {
            let element = document.createElement('a')
            document.body.append(element)
            element.href = this.result[this.select - 1][name][index].reply
            element.download = ''
            element.click()
            document.body.removeChild(element)
        }
    }
}
</script>

<style src="../../assets/css/form.css" scoped></style>

<style scoped>
.pseudoHead {
    height: 30px;
}

.url {
    text-overflow: ellipsis;
}

.sel {
    cursor: pointer;
}

.link {
    z-index: -1;
}

.section {
    position: relative;
    margin-top: 10px;
}

.marginTop {
    margin-top: 0;
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

.textArea {
    position: relative;
    width: calc(100vw - 460px);
    height: 25px;
    margin-left: 80px;
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: 550;
}

.titleArea {
    position: absolute;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    margin: 0;
}

.answerArea {
    position: absolute;
    width: calc(100vw - 660px);
    margin-left: 180px;
    padding-left: 10px;
    padding-right: 10px;
    height: 25px;
    line-height: 25px;
    background-color: #f2f2f2;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.urlType {
    width: calc(100vw - 685px);
    padding-right: 35px;
}
</style>

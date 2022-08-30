<template>
    <div class="readItem">
        <p class="pseudoHead"></p>

        <p v-for="each in section" :key="each" v-html="each"></p>

        <p v-if="items[position].answer.search(',') === -1 && items[position].answer.length === 3">
            Directions: An introductory sentence for a brief summary of the passage is provided below.
            Complete the summary by selecting the THREE answer choices that
            express the most important ideas in the passage.
            Some sentences do not belong in the summary because
            they express that are not presented in the passage or are minor ideas in the passage.
            This question is worth 2 points.
        </p>
        <p v-else-if="items[position].highlight.length === 4">
            Look at the four squares [■] that indicate
            where the following sentence could be added to the passage.
            Where would the sentence best fit?
        </p>
        <p v-for="caption in items[position].caption" :key="caption"
        :class="{
            'caption': items[position].answer.search(',') === -1 || caption !== items[position].caption[0]
        }">
            {{ caption }}
        </p>

        <div v-if="items[position].answer.search(',') === -1 && items[position].answer.length === 1">
            <div v-for="option in items[position].option" :key="option">
                <input class="zone" type="radio" disabled="true" />
                <p class="option">{{ option }}</p>
            </div>
        </div>
        <div v-else-if="items[position].answer.search(',') === -1 && items[position].answer.length === 2">
            <div v-for="option in items[position].option" :key="option">
                <input class="zone" type="checkbox" disabled="true" />
                <p class="option">{{ option }}</p>
            </div>
        </div>
        <div v-else>
            <div class="section" v-for="option in items[position].option" :key="option">
                <p class="sectionText">{{ option }}</p>
            </div>
        </div>

        <p class="pseudoTail"></p>
    </div>
</template>

<script>
export default {
    name: 'ReadingItem',
    props: {
        text: { type: Array, required: true },
        items: { type: Array, required: true },
        position: { type: Number, required: true }
    },
    computed: {
        section () {
            let tmp_list = this.text.slice()
            let cnt = this.items[this.position].highlight.length
            if (cnt === 4) {
                for (let k = 0; k < cnt; k++) {
                    let m = this.items[this.position].highlight[k][0]
                    let n = this.items[this.position].highlight[k][1]
                    tmp_list[m] = tmp_list[m].substring(0, n) + '\n' + tmp_list[m].substring(n + 1)
                }
                let begin = this.items[this.position].highlight[0][0]
                let end = this.items[this.position].highlight[3][0]
                for (let k = begin; k <= end; k++)
                    tmp_list[k] = tmp_list[k].replaceAll('\n', ' [■] ')
                return tmp_list.slice(begin, end + 1)
            }
            else if (cnt === 0)
                return []
            else if (this.items[this.position].highlight[0].length === 1) {
                let begin = this.items[this.position].highlight[0][0]
                let end = this.items[this.position].highlight[cnt - 1][0]
                return tmp_list.slice(begin, end + 1) 
            }
            else {
                let n = this.items[this.position].highlight[0][0]
                for (let k = 0; k < cnt; k++) {
                    let begin = this.items[this.position].highlight[k][1] + k * 34
                    let end = this.items[this.position].highlight[k][2] + k * 34 + 27
                    let head = '<span style="color: coral">'
                    let tail = '</span>'
                    tmp_list[n] = tmp_list[n].substring(0, begin) + head + tmp_list[n].substring(begin)
                    tmp_list[n] = tmp_list[n].substring(0, end) + tail + tmp_list[n].substring(end)
                }
                return tmp_list.slice(n, n + 1)
            }
        }
    }
}
</script>

<style scoped>
.readItem {
    font-size: 14px;
    text-align: justify;
}

.pseudoHead {
    width: 100%;
    height: 35px;
    margin: 0;
}

.pseudoTail {
    width: 100%;
    height: 55px;
    margin: 0;
}

.caption {
    font-weight: 550;
}

.zone {
    margin-left: 0;
    float: left;
}

.option {
    margin-top: 0;
    margin-left: 25px;
}

.section {
    border: 1px solid #666666;
    margin-top: 15px;
    padding: 5px;
}

.sectionText {
    margin: 0;
}
</style>

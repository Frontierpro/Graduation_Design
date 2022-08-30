<template>
    <div class="editorContainer">
        <TextEditor class="editor" :hint="hint" v-if="type === 'text'" />
        <PwdEditor class="editor" :hint="hint" v-else-if="type === 'password'" />
        <CodeEditor class="editor" :hint="hint" v-else-if="type === 'code'" />
    </div>
</template>

<script>
import TextEditor from './TextEditor'
import PwdEditor from './PwdEditor'
import CodeEditor from './CodeEditor'

export default {
    name: "Editor",
    props: {
        type: { type: String, required: true },
        hint: { type: String, required: true }
    },
    components: {
        'TextEditor': TextEditor,
        'PwdEditor': PwdEditor,
        'CodeEditor': CodeEditor
    }
}
</script>

<style scoped>
.editorContainer {
    width: 74%;
    height: 35px;
    margin-left: 13%;
    margin-bottom: 15px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    background-color: white;
}

.editor {
    width: 100%;
    height: 100%;
}
</style>

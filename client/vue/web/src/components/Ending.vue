<template>
    <div class="bkg">
        <span class="refer"><strong>The test is ending and your answer is under review.</strong></span>
    </div>
</template>

<script>
export default {
    name: 'Ending'
}
</script>

<style scoped>
.bkg {
    padding-left: calc(50vw - 302px);
    padding-top: calc(50vh - 24px);
}

.refer {
    display: inline-block;
    width: 600px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 20px;
}
</style>

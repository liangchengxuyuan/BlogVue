<template>
    <div id="div1">
    <p>欢迎使用 wangEditor 富文本编辑器</p>
</div>
</template>

<script>
export default {
    mounted() {
        var E = window.wangEditor
    var editor = new E('#div1')

    // 配置服务器端地址
    editor.customConfig.uploadImgServer = '/upload'

    // 进行下文提到的其他配置
    // ……
    // ……
    // ……

    editor.create()
    }
}
</script>

<style scoped>

</style>



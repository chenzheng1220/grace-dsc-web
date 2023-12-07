<template>
    <tui-footer :copyright="name" :fixed="false" color="#b3c5de"></tui-footer>
</template>
  
<script setup>
 import { onMounted, getCurrentInstance, ref } from "vue";
 import { getWord } from 'https://special.zhaopin.com/wecan/2023/sh/aslk022839/getname.js'
const app = getCurrentInstance();
const { useSystem } = app.appContext.config.globalProperties.grace;
const name = ref('智联招聘版权所有©')
onMounted(() => {
  const type = useSystem().deviceType
  name.value = getWord(type)
})
</script>
  
<style scoped>
  
</style>
  
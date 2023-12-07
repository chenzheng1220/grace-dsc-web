<template>
  <div @click="download" class="grace-dsc-function-download">{{ downloadWord }}</div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from "vue";

const app = getCurrentInstance();
const { useData } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  downloadWord: {
    type: String,
    default: '' // 下载文字
  },
  downloadUrl: {
    type: String,
    default: '' // 下载链接
  },
  fileName: {
    type: String,
    default: '' // 文件名
  }
})

const {
  downloadWord,
  downloadUrl,
  fileName
} = toRefs(props)

function download() {
  const link = document.createElement('a');
  link.href = downloadUrl.value;
  link.download = fileName.value; // 替换成你想要的文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

}

onMounted(async () => {

});


</script>

<style lang="scss">

</style>

<template>
  <div>
    <grace-dsc-function-loading />
    <div class="grace-dsc-longGraphic-box" :style='{
      background: "url(" +bgImgSrc+ ") no-repeat",
      backgroundSize: "cover",
      height: height + "rpx"
    }'>
      <slot name="loading" :ifCurrent="ifCurrent"></slot>
      
    </div>
  </div>
</template>

<script setup>
import { toRefs, ref, getCurrentInstance, onMounted } from "vue";
const app = getCurrentInstance();
const { useRouter } = app.appContext.config.globalProperties.grace
const props = defineProps({
  bgImgSrc: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: "auto"
  }
});
const { bgImgSrc, height } = toRefs(props);
const ifCurrent = ref(false)
onMounted(async () => {
  uni.$on('loading', async (postData) => {
    if(postData) ifCurrent.value = postData;
  })
});
</script>

<style>
.grace-dsc-longGraphic-box {
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

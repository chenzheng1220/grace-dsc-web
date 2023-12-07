<template>
  <div class="grace-dsc-layout-box" :style="'background: url('+bgImgSrc+') no-repeat;background-size: cover;height:'+height+'rpx'">
    <slot></slot>
    
  </div>
</template>

<script setup>
import { toRefs, getCurrentInstance } from "vue";
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
</script>

<style>
.grace-dsc-layout-box {
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>

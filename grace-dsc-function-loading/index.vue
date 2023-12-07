<template>
  <div class="grace-dsc-function-loading enter" v-if="isShow">
    <view class="enterAPP">
      <view id="demo" style="width: 100%;height: 100%;"></view>
      <view class="percent"
            style="position: fixed;top: 23%;text-align: center;font-size: 30rpx;color: #0829F9;left: 50%;transform: translateX(-50%);
            transition: 0.5s;">
            {{ percent }}%
      </view>
    </view>
  </div>
</template>

<script setup>
import { toRefs, getCurrentInstance, onMounted, ref } from 'vue'
import { onShow } from "@dcloudio/uni-app";


const props = defineProps({
  svgaHref: {
    type: String,
    default: "https://special.zhaopin.com/wecan/2023/sh/grac010625/images/loading.svga"
  }
})

const {
  svgaHref
} = toRefs(props);
const isShow = ref(true);

const app = getCurrentInstance()
const { useSvga, useRouter } = app.appContext.config.globalProperties.grace

const percent = ref(0);

onShow(async () => {
  setTimeout(() => {
    const timer = setInterval(() => {
      percent.value = percent.value + 1
      if (percent.value >= 100) {
        clearInterval(timer);
        isShow.value = false;
        uni.$emit("loading", true);
      }
    }, 20)
  }, 500)
}) 
onMounted(async () => {
  await useSvga('demo', svgaHref.value);
})
</script>

<style>
.enter {
  position: relative;
  width: 100%;
  background: #ffffff;
  z-index: 1000000;
}

.enterAPP {
  display: block;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.enterAPP img {
  width: 100%;
  height: 100vh;
 }
#demo /deep/ #demo-canvas {
  width: 100vw;
}
</style>

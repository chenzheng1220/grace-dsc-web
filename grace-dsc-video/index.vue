<template>
  <video class="grace-dsc-video" id="video" :src="videoSrc" controls :poster="image"></video>
</template>

<script setup>
import { toRefs, onMounted, ref } from "vue";

const props = defineProps({
  videoSrc: {
    type: String,
    default: ""
  }, // 视频链接
  image: {
    type: String,
    default: ""
  } // 封面图
});
const {
  videoSrc,
  image
} = toRefs(props)
onMounted(()=>{
  
})
</script>

<style lang="scss">
$videoWidth: 100%; // 视频宽度
$videoHeight: 350rpx; // 视频高度
.grace-dsc-video{
    width: $videoWidth;
    height: $videoHeight;
    display: block;
    margin: 0 auto;
    background-color: #000000;
    border-radius: 20rpx;
}
</style>
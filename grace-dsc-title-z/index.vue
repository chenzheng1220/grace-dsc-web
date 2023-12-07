<template>
  <div
    class="grace-dsc-title-z"
    :style="{
      margin: margin,
      padding: padding,
      background: backgroundImage === '' ? background : 'url(' + backgroundImage + ')', backgroundSize: '100% 100%',
      textAlign: textAlign
    }"
  >
    {{ content }}
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  content: {
    type: String,
    default: "", // 字体内容
  }, 
  background: {
    type: String,
    default: "#ccc", // 背景颜色
  },
  backgroundImage: {
    type: String,
    default: "", // 背景图片
  }
});
const {
  content,
  background,
  backgroundImage,
} = toRefs(props);
</script>

<style lang="scss">
.grace-dsc-title-z {
  overflow-x: hidden;
  position: relative;
  width: 100%;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  color: #333;
}
</style>

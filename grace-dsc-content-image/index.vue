<template>
  <div :style="{
      marginBottom: marginBottom+'rpx',
      marginLeft: marginLeft+'rpx',
      marginRight: marginRight+'rpx',
      marginTop: marginTop+'rpx',
      width: width+'rpx',
      opacity: opacity
    }">
    <img class="grace-dsc-content-image" :src="imgSrc" @click="jumpLink"/>
  </div>
</template>

<script setup>
import { toRefs, getCurrentInstance } from "vue";
const app = getCurrentInstance();
const { useRouter } = app.appContext.config.globalProperties.grace
const props = defineProps({
  imgSrc: {
    type: String,
    default: ""
  },
  marginTop: {
    type: Number,
    default: 0
  },
  marginLeft: {
    type: Number,
    default: 0
  },
  marginRight: {
    type: Number,
    default: 0
  },
  marginBottom: {
    type: Number,
    default: 0
  },
  link: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: "auto"
  },
  target: {
    type: String,
    default: "inner"
  },
  opacity: {
    type: Number,
    default: 1
  }
});
const { imgSrc, link, target } = toRefs(props);
function jumpLink(){
  if (target.value === 'inner') {
    useRouter(link.value, {
      target: target.value
    })
  } else {
    window.location.href = link.value
  }
}
</script>

<style lang="scss">
.grace-dsc-content-image {
  width: 100%;
}
</style>

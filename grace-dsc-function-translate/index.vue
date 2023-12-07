<template>
  <div
    class="grace-dsc-function-translate"
    :class="isSwiperBtn?'grace-dsc-function-translate-btn':''"
    ref="grace-dsc-function-translate"
    :style="[mergeStyle]"
    @touchmove="noop"
    @click="swiperBtn != '' ? swiperBtn == 'next' ? mySwiperNext() : mySwiperPrev() : ''"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import "./animate.min.css";
import { toRefs, ref, computed, watch, nextTick, onMounted, getCurrentInstance } from "vue";
const app = getCurrentInstance();
const { useScrollRect } = app.appContext.config.globalProperties.grace
const props = defineProps({
  isIh5: {
    type: Boolean,
    default: true
  },
  ifCurrent: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: "absolute"
  },
  top: {
    type: String,
    default: "auto"
  },
  bottom: {
    type: String,
    default: "auto"
  },
  left: {
    type: String,
    default: "auto"
  },
  right: {
    type: String,
    default: "auto"
  },
  animation: {
    type: Array, // 动画数据
    default: () => []
  },
  offset: {
    type: Number,
    default: 200
  },
  zIndex: {
    type: String,
    default: '1'
  },
  isSwiperBtn: {
    type: Boolean,
    default: false
  },
  swiperBtn: {
    type: String,
    default: ''
  }
});

const { isIh5, ifCurrent, position, top, bottom, left, right, animation, offset, zIndex, isSwiperBtn, swiperBtn } = toRefs(props);
function noop(e) {
  e && typeof e.stopPropagation === "function" && e.stopPropagation();
}
const mergeStyle = ref(null);
if(isIh5.value){
  watch(ifCurrent, (newVal) => {
    newVal ? enter() : leave()
  }, {
    immediate: true
  })
}else{
  onMounted(()=>{
    watch(ifCurrent, (newVal) => {
      if(newVal && top.value < 1136){
        enter()
      }
    }, {
      immediate: true
    })
    useScrollRect(`.grace-dsc-function-translate`, (data) => {
      if(data.isVisible){
        enter()
      }else{
        leave()
      }
    })
  })
}

function mySwiperNext() {
  uni.$emit("mySwiperNext", '');
}
function mySwiperPrev() {
  uni.$emit("mySwiperPrev", '');
}

async function enter() {
  let animate = {
    animationName: [],
    animationDuration: [],
    animationDelay: [],
    animationTimingFunction: [],
    animationIterationCount: []
  };
  animation.value.forEach(element => {
    animate.animationName.push(element.mode);
    animate.animationDuration.push(element.duration + "ms");
    animate.animationDelay.push(element.animationDelay + "ms");
    animate.animationTimingFunction.push(element.timingFunction);
    animate.animationIterationCount.push(element.delay == 0 ? 'infinite': element.delay);
  });
  mergeStyle.value = {
    position: position.value,
    top: `${top.value}${top.value == "auto" ? "" : "rpx"}`,
    left: `${left.value}${left.value == "auto" ? "" : "rpx"}`,
    right: `${right.value}${right.value == "auto" ? "" : "rpx"}`,
    bottom: `${bottom.value}${bottom.value == "auto" ? "" : "rpx"}`,
    zIndex: zIndex.value,
    animationName: animate.animationName.toString(),
    animationDuration: animate.animationDuration.toString(),
    animationDelay: animate.animationDelay.toString(),
    animationTimingFunction: animate.animationTimingFunction.toString(),
    animationIterationCount: animate.animationIterationCount.toString(),
    animationFillMode: "forwards"
  };
}
async function leave() {
  mergeStyle.value = null
  mergeStyle.value = {
    position: position.value,
    top: `${top.value}${top.value == "auto" ? "" : "rpx"}`,
    left: `${left.value}${left.value == "auto" ? "" : "rpx"}`,
    right: `${right.value}${right.value == "auto" ? "" : "rpx"}`,
    bottom: `${bottom.value}${bottom.value == "auto" ? "" : "rpx"}`,
    zIndex: zIndex.value
  };
}
</script>
<style>
.grace-dsc-function-translate {
  display: inline-block;
  opacity: 0;
  pointer-events: none;
}
.grace-dsc-function-translate-btn{
  pointer-events: auto;
}
</style>

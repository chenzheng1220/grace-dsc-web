<template>
  <div>
    <p class="grace-dsc-content-ihText__p" :style="{textAlign: textList[0].fontAlign}">
      <span
        v-for="(item, i) in textList"
        :key="i"
        v-html="item.text"
        :style="{
          fontSize: item.fontSize + 'rpx',
          color: 'rgba(' + item.fontColor + ')',
          fontWeight: item.fontBold ? 'bold' : '',
          fontStyle: item.fontStyle,
          opacity: item.opacity,
          textIndent: item.fontIndent + 'em',
          lineHeight: item.fontLineHeight + 'rpx'
        }"
      ></span>
    </p>
  </div>
</template>

<script setup>
import { toRefs, getCurrentInstance, ref } from "vue";
const props = defineProps({
  textList: {
    type: Array,
    default: () => []
  }
});
const { textList } = toRefs(props);
</script>

<style lang="scss">
.grace-dsc-content-ihText__p {
  box-sizing: border-box;
}
</style>

<template>
  <div class="grace-dsc-title-ze" :class="title_way"
    :style="{ background: bgImg === '' ? background : 'url(' + bgImg + ') center', backgroundSize: '100% 100%' }">
    <!-- 中文 -->
    <p class="title-z">
      <i class="title-icon" v-if="title_icon_show"><img :src="title_icon" alt=""></i>
      <span :style="{
          fontSize: title_z_fontSize,
          color: title_z_color
        }">
        {{ title_text_z }}
      </span>
    </p>
    <!-- 英文 -->
    <p class="title-e">
      {{ title_text_e }}
    </p>

  </div>
</template>
<script setup>
import { toRefs } from "vue";
const props = defineProps({
  title_icon: {
    type: String,
    default: "", // 小icon
  },
  title_icon_show: {
    type: Boolean,
    default: false, // 是否显示小icon
  },
  title_text_z: {
    type: String,
    default: "", // 中文
  },
  title_text_e: {
    type: String,
    default: "", // 英文
  },
  title_way: {
    type: String,
    default: "left_right", // 文字位置类型
  },
  background: {
    type: String,
    default: "#fff", // 背景颜色
  },
  bgImg: {
    type: String,
    default: "", // 背景图片
  }
});
const {
  title_text_z,
  title_text_e,
  title_background,
  title_backgroundImage,
  title_way,
  title_icon,
  title_icon_show
} = toRefs(props);
</script>

<style lang="scss">
$textZ: 36rpx; // 中文字体大小
$textE: 24rpx; // 英文字体大小
$textColorZ: #333; // 中文字体颜色
$textColorE: #333; // 英文字体颜色
$lineHeight: 75rpx; // 中英文 字体高度、行高
$iconWidht: 38rpx; // 标题小icon的宽度   高度自适应

.grace-dsc-title-ze {
  overflow-x: hidden;
  position: relative;
  width: 100%;
  height: $lineHeight; //标题框 高度
  padding: 0 20rpx;

  >p {
    position: relative;
    text-align: center;
    line-height: $lineHeight; //中英文 高度
  }
}

.title-z {
  // 中文样式
  font-weight: bolder;
  font-size: $textZ;
  color: $textColorZ;
  display: flex;

  >i {
    width: $iconWidht;
    display: block;
    margin-right: 10rpx;

    >img {
      display: block;
      width: 100%;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  >span {
    display: inline-block;
    line-height: $lineHeight;
  }
}

.title-e {
  font-size: $textE;
  color: $textColorE;
}

.left_right {
  // 左右两端对齐
  display: flex;
  justify-content: space-between;
}

.left_ {
  // 靠左对齐
  display: flex;
  justify-content: flex-start;
}

.center_ {
  .title-z {
    justify-content: center;
  }

  // 文字两行居中对齐
  >p {
    text-align: center !important;
  }
}

.overlap_ {

  // 文字叠加居中对齐
  >.title-e {


    z-index: 1;
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
  }

  >.title-z {
    position: absolute !important;
    justify-content: center;
    z-index: 9;
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
}

div {
  box-sizing: border-box;
}
</style>

<template>
  <ul class="grace-dsc-function-spread-right">
    <li
      class="grace-dsc-function-spread-right__box"
      v-for="(item, index) in spread_right_data"
      :key="index"
    >
      <div>
        <div class="grace-dsc-function-spread-right__top-box">
          <div class="grace-dsc-function-spread-right__btn-box" @click="show(index)">
            <span
              v-html="index !== show_cont ? '点击展开' : '收起'"
            ></span>
            <svg
              :class="{ cont_show_img: index == show_cont }"
              t="1670392212492"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1383"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="13.5"
              height="13.5"
            >
              <path
                :style="{ fill: color_btn }"
                d="M454.188 785.022c-145.192-150.177-290.378-300.353-435.422-450.526-59.842-61.836 37.327-154.021 97.313-91.899 129.23 133.647 258.318 267.296 387.548 400.868 133.646-134.287 267.436-268.574 401.083-402.934 60.84-61.123 158.011 31.060 97.244 91.971-150.105 150.89-300.279 301.703-450.454 452.521-24.933 24.934-72.666 25.575-97.311 0z"
                p-id="1384"
              ></path>
            </svg>
          </div>
        </div>
        <div
          class="grace-dsc-function-spread-right__cont"
          :class="[
            show_cont == index ? 'cont_show' : 'show_mp',
            { transition_: transition_on },
          ]"
        >
          <slot :name="`${item.id}`"></slot>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { ref, toRefs } from "vue";
// 展开开关
const show_cont = ref(null);
const show = function (i) {
  if (show_cont.value == i) {
    show_cont.value = null;
  } else {
    show_cont.value = i;
  }
};
const props = defineProps({
  transition_on: {
    type: Boolean,
    default: true,// 动画
  },
  spread_right_data: {
    type: Array,
    default: () => [],
  },
});
const {
  transition_on,
  spread_right_data,
} = toRefs(props); // 数据列表
</script>
<style lang="scss">
.grace-dsc-function-spread-right {
  list-style: none;
  margin: 0;
  padding: 0;
}
.grace-dsc-function-spread-right__box {
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  width: 95%;
  margin: 0 auto 35rpx;
  background: #ebebeb;
  > div {
    width: 90%;
    margin: 0 auto;
    padding: 30rpx 0 15rpx;
    .grace-dsc-function-spread-right__name {
      font-size: 28rpx;
    }
    > .grace-dsc-function-spread-right__top-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > .grace-dsc-function-spread-right__btn-box {
        display: flex;
        align-items: center;
        text-align: center;
        > span {
          font-weight: normal;
          font-size: 20rpx;
        }
        > svg {
          display: inline-block;
          margin-left: 8rpx;
          position: relative;
          top: 2.5rpx;
          opacity: 0.7;
        }
      }
    }
    > .grace-dsc-function-spread-right__cont {
      text-align: justify;
      overflow: hidden;

      box-sizing: border-box;
      padding: 0;
      white-space: pre-line;
      font-size: 20rpx;
      background: #d4d4d4;
      line-height: 45rpx;
      margin: 15rpx 0 0 0;
    }
  }
}
.cont_show {
  max-height: 1000rpx !important;
}
.show_mp {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  max-height: 0px !important;
}
.transition_ {
  transition: max-height 0.5s, padding 0.65s, margin 0.65s;
}
.cont_show_img {
  transform: rotate(180deg);
}
</style>

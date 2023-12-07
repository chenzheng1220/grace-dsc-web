<template>
  <div>
    <grace-dsc-function-loading />
    <swiper
      class="grace-dsc-ih-swiper"
      ref="mySwiper"
      :style="{ height: win_H + 'px' }"
      :autoplay="autoplay"
      :current="current1"
      :duration="duration"
      :circular="circular"
      :vertical="vertical"
      :disable-touch="disableSwiper"
      @change="onSwiperChange"
    >
      <swiper-item v-for="tab in swiperList" :key="tab" lazy-load>
        <view
          class="grace-dsc-ih-swiper__item"
          :style="
            'background: url(' + tab.bgImage + ') no-repeat;background-size:cover;'
          "
        >
          <slot :name="`${tab.id}`" :ifCurrent="tab.id == currentIndex"></slot>
        </view>
      </swiper-item>
    </swiper>
  </div>
  
</template>

<script setup>
import { ref, toRefs, useAttrs, onMounted } from "vue";

const attrs = useAttrs();

const props = defineProps({
  swiperList: {
    type: Array, // 轮播数据
    default: () => [{ id: "1" }, { id: "2" }, { id: "3" }]
  },
  autoplay: {
    type: Boolean,
    default: false // 是否自动切换
  },
  current: {
    type: Number,
    default: 0 // 当前所在滑块的 index
  },
  duration: {
    type: Number,
    default: 500 // 滑动动画时长
  },
  circular: {
    type: Boolean,
    default: false // 是否循环衔接滑动
  },
  vertical: {
    type: Boolean,
    default: true // 是否纵向滑动
  }
});

const { swiperList, autoplay, current, duration, circular, vertical } = toRefs(
  props
);
const currentIndex = ref(null);
const win_W = ref(0); // 设备宽度
const win_H = ref(0); // 设备高度
const disableSwiper = ref(swiperList.value[0].disableTouch);
const current1 = ref(current.value)
function onSwiperChange(event){
  current1.value = event.detail.current
  currentIndex.value = event.detail.current
  disableSwiper.value = swiperList.value[event.detail.current].disableTouch
}

onMounted(async () => {
  // 获取图片的高度
  uni.getSystemInfo({
    success: function(res) {
      // 获取设备宽高
      win_W.value = res.windowWidth;
      win_H.value = res.windowHeight;
    }
  });
  uni.$on('loading',async (postData) => {
    if(postData) currentIndex.value = 0;
  })
  uni.$on('mySwiperNext', () => {
    if(current1.value + 1 < swiperList.value.length) current1.value = current1.value + 1
  })
  uni.$on('mySwiperPrev', () => {
    if(current1.value > 0) current1.value = current1.value - 1
  })
});
</script>

<style lang="scss" scoped>
.grace-dsc-ih-swiper {
  width: 100%;
  .grace-dsc-ih-swiper__item {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>

<template>
  <swiper class="grace-dsc-content-swiper" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :style="{height:bannerH + indicatorSeat + 'px'}" :indicator-active-color="indicatorActiveColor" 
    :autoplay="autoplay" :current="current" :interval="interval" :duration="duration" :circular="circular" :vertical="vertical" :previous-margin="previousMargin" 
    :next-margin="nextMargin" :display-multiple-items="displayMultipleItems" :disable-touch="disableTouch">
    <swiper-item  v-for="(item, index) in list" :key="index" lazy-load >
      <view class="grace-dsc-content-swiper__item">
        <image class="grace-dsc-content-swiper__item-image" :src="item.image" mode="widthFix" @click="toHref(item.url)"></image>
      </view>
    </swiper-item>
  </swiper>
  
</template>
   
   
   
<script setup>
import {ref, toRefs, useAttrs, onMounted, getCurrentInstance } from 'vue'
   
 const attrs = useAttrs()
   
const props = defineProps({
       imglist: {
         type: Array, // 轮播数据
         default: () => [
           {image:''}
         ]
       },
       indicatorDots: {
         type: Boolean,
         default: false // 是否展示面板指示点
       },
       indicatorColor: {
         type: String,
         default: 'rgba(0, 0, 0, .3)' // 指示点颜色
       },
       indicatorActiveColor: {
         type: String,
         default: '#ff0000' // 当前选中指示点颜色
       },
       autoplay: {
         type: Boolean,
         default: false // 是否自动切换
       },
       current: {
         type: Number,
         default: 0 // 当前所在滑块的 index
       },
       interval: {
         type: Number,
         default: 5000 // 自动切换时间间隔
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
         default: false // 是否纵向滑动
       },
       previousMargin: {
        type: String,
        default: '0px' // 前边距(可用于露出前一项的一小部分)
      },
       nextMargin: {
          type: String,
          default: '0px' // 后边距(可用于露出后一项的一小部分)
       },
        displayMultipleItems: {
          type: Number,
          default: 1 // 同时显示的滑块数量
       },
        disableTouch: {
          type: Boolean,
          default: false // 是否禁止用户touch操作
       },
       indicatorSeat: {
          type: Number,
          default: 0 // 指示点是否在图片下方（只能是正数）
       }
})

const { imglist, indicatorDots, indicatorColor, indicatorActiveColor, autoplay, current, interval, duration, circular, 
vertical, previousMargin, nextMargin, displayMultipleItems, disableTouch, indicatorSeat } = toRefs(props)

let win_W = '' // 设备宽度
let win_H = '' // 设备高度
    
const bannerH = ref(0) // swiper高度
const list = ref(imglist.value)
const app = getCurrentInstance()
const { useRouter } = app.appContext.config.globalProperties.grace
async function toHref(url) {
  if (url && url !== '') {
    await useRouter(url, {
      target: 'outer',
      params: '',
      nativeHref: '',
      success: (e) => {
        console.log("success", e);
      },
      fail: (e) => {
        console.log("fail", e);
      },
      complete: (e) => {
        console.log("complete", e);
      },
    });
  }
   
}

onMounted(async () => {
  // 获取图片的高度
  uni.getSystemInfo({
    success: function (res) {
      // 获取设备宽高
      win_W = res.windowWidth
      win_H = res.windowHeight
    }
  })
  let swiperWidth = 0
  let infos = uni.createSelectorQuery().select(".grace-dsc-content-swiper")
	console.log('info', infos)  // 获取元素
  infos.boundingClientRect((data) => { //data - 各种参数
    swiperWidth =  data.width // 获取swiper宽度
	}).exec()

  console.log(swiperWidth)
  uni.getImageInfo({
		src: list.value[0].image,
		success:function(image){
      // 获取图片数据
      var imgBl = (image.width / win_W).toFixed(3)
      list.value[0].height = Math.ceil(image.height / imgBl)
      bannerH.value = Math.ceil(image.height / imgBl) * (swiperWidth/win_W) // 设置swiper高度
		}
	})    
});
</script>
   
<style lang="scss" scoped>
.grace-dsc-content-swiper{
  width: 100%;
  .grace-dsc-content-swiper__item {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
    .grace-dsc-content-swiper__item-image {
      width: 100%;
    }
  }
}
</style>
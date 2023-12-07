<template>

       <swiper  v-bind="attrs" class="grace-dsc-content-swiper"
       :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :style="{height:bannerH + 'px'}" :indicator-active-color="indicatorActiveColor" 
        :autoplay="autoplay" :current="current" :interval="interval" :duration="duration" :circular="circular" :vertical="vertical" :previous-margin="previousMargin" 
        :next-margin="nextMargin" :display-multiple-items="displayMultipleItems" :disable-touch="disableTouch"
       @change="swiperChange"
       >
          <swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'"
              v-for="(item, index) in list" :key="index" lazy-load>
              <view class="grace-dsc-content-swiper__item" :class="currentIndex == index ? 'item-img' : 'item-img-side'" :style="{
                width: currentIndex == index ? middleWidth + 'rpx' : '100%'
            }">
                <image class="grace-dsc-content-swiper__item-image" :src="item.image" mode="widthFix"></image> 
              </view>
          </swiper-item>
      </swiper>
</template>



<script setup>
  import {ref, toRefs, useAttrs, onMounted } from 'vue'

  const attrs = useAttrs()

  const props = defineProps({
       imglist: {
         type: Array, // 轮播数据
         default: () => [
          { image: ''},
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
         default: true // 是否自动切换
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
         default: true // 是否循环衔接滑动
       },
       vertical: {
         type: Boolean,
         default: false // 是否纵向滑动
       },
       previousMargin: {
        type: String,
        default: '145rpx' // 前边距(可用于露出前一项的一小部分)
      },
       nextMargin: {
          type: String,
          default: '145rpx' // 后边距(可用于露出后一项的一小部分)
       },
        displayMultipleItems: {
          type: Number,
          default: 1 // 同时显示的滑块数量
       },
        disableTouch: {
          type: Boolean,
          default: false // 是否禁止用户touch操作
       },
       middleWidth: {
          type: Number,
          default: 630 // 中间项的宽度
       }
    })

    const { middleWidth, imglist, indicatorDots, indicatorColor, indicatorActiveColor, autoplay, current, interval, duration, circular, vertical, previousMargin, nextMargin, displayMultipleItems, disableTouch } = toRefs(props)
    const currentIndex = ref(0);
    // 获取当前currentIndex
    function swiperChange(e) {
        console.log(e);
        currentIndex.value = e.detail.current;
    }
    let win_W = ''
    let win_H = ''
        
    const bannerH = ref('') // swiper高度
    const list = ref(imglist.value)
    onMounted(async () => {
        let imgWidth = 750/middleWidth.value
        // 获取图片最高的高度
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
          var imgBl =  (image.width / (middleWidth.value / 2) ).toFixed(3)
          list.value[0].height = Math.ceil(image.height / imgBl)
          bannerH.value = Math.ceil(image.height / imgBl) * (swiperWidth/win_W) // 设置swiper高度
        }
      })      
    });
</script>

<style lang="scss" scoped>

      // 轮播图
      .grace-dsc-content-swiper{
          width: 100%;
      }

      .grace-dsc-content-swiper__item {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
      }

      .item-highlight {
          font-size: 32rpx;
          color: #0072EB;
          margin-left: 10rpx;
      }

      .swiper-item {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 99;
          overflow: visible;
          align-items: center;
      }

      .swiper-item-side {
          width: 80%;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      // 中间项样式
      .item-img {
          height: 100%;
          border-radius: 14rpx;
          animation: to-big 10ms;
      }
       // 两边项样式 
      .item-img-side {
          width: 100%;
          height: 80%;
          border-radius: 14rpx;
          animation: to-mini 10ms;
      }

      
      // 中间项变小
      @keyframes to-mini {
          from {
              height: 100%;
          }

          to {
              height: 80%;
          }
      }

       // 右边项变大
      @keyframes to-big {
          from {
              height: 100%;
          }

          to {
              height: 80%;
          }
      }

</style>
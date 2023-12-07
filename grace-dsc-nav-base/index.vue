<template>
  <div class="grace-dsc-nav-base" :class="[navType === 'bottom' ? 'nav-bottom-fixed':'', isTop === true ? 'nav-top-fixed' : '']" ref="topHeight">
    <div class="grace-dsc-nav-base-content">
      <div class="grace-dsc-nav-base-content__list" :class="[myNavList.length > 5 ? 'nav-list-max':'nav-list-flex']">
        <a v-for="item in myNavList" :key="item.nativeHref" @click="toHref(item)" class="grace-dsc-nav-base-content__item">
          <div class="nav-list-max-lot">
            <img :src="item.isActive ? item.selectedIcon : item.defaultIcon" alt="" v-if="item.defaultIcon && item.defaultIcon !== '' && item.defaultIcon !== null">
            <div class="nav-name" :class="[item.isActive ? 'nav-name-active':'']">{{ item.message }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <!-- 居中吸顶导航吸顶式顶替原导航位置 为了保持页面高度  -->
  <div class="grace-dsc-nav-base" v-if="isTop === true"></div>
</template>

<script setup>
import { ref, toRefs, getCurrentInstance, onMounted } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
const props = defineProps({
  navType: {
    type: String, 
    default: 'bottom' // 导航样式分三种居底，居中，居中吸顶
  },
  isZdyRoute: {
    type: Boolean,
    default: false
  },
  navList: {
    type: Array, // 菜单数据列表
    default: () => []
  }
})

const app = getCurrentInstance()
const { useRouter } = app.appContext.config.globalProperties.grace

const {
  navType,
  isZdyRoute,
  navList
} = toRefs(props)

// 是自定义路由还是全局路由
const allRoute = []
const routes = JSON.parse(app.appContext.app._component.globalData.router) 
for (let key in routes) {
  if (routes.hasOwnProperty(key) && routes[key].hasOwnProperty('setTab')) {
    // 执行代码
    allRoute.push(routes[key].setTab)
  }
}
const myNavList = isZdyRoute.value === true ? navList.value : allRoute

// 当前路由
const pages = getCurrentPages();
const currentRoute = '/' + pages[pages.length - 1].route;
myNavList.sort((a, b) => a.order - b.order);
myNavList.forEach((item, index) => {
  if (currentRoute === item.nativeHref) {
    myNavList[index].isActive = true
  } else {
    myNavList[index].isActive = false
  }
})

const isTop = ref(false) // 居中吸顶导航时判定是否到顶部变量
const topHeight = ref() // 居中吸顶导航时获取ref="topHeight" 元素的数据
const initHight = ref(0) // 居中吸顶导航时设置初始化导航距离顶部的高度

onMounted(async () => {
  // 设置初始化导航距离顶部的高度
  initHight.value = topHeight.value.offsetTop
});

onPageScroll((e) => {
  // 监听页面滚动位置 当类型是居中吸顶导航时作用
  if (navType.value === 'centerTop') {
    // 当页面滚动位置大于等导航初始化高度 isTop为True 否则为false
    if (e.scrollTop >= initHight.value) {
      isTop.value = true
    } else {
      isTop.value = false
    }
  }
  
});


// 跳转导航
async function toHref (item) {
  if (item.target === 'inner') {
    await useRouter(item.nativeHref, {
      target: item.target,
      params: item.params,
      nativeHref: item.nativeHref
    })
  } else if (item.target === 'outer') {
    window.location.href = item.outerHref
  } else {
    window.location.href = item.nativeHref
  }
}

</script>

<style lang="scss">
$bgColor: #e1e1e1; // 背景颜色
$fontColor: #333333; // 字体颜色
$fontColorActive: #ffffff; // 当前导航字体颜色
$navHeight: 160rpx; // 导航高度
$fontSize: 20rpx; // 字体大小
// 吸顶样式
.nav-top-fixed {
  width: 750rpx;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
// 居底样式
.nav-bottom-fixed {
  width: 750rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.grace-dsc-nav-base {
  width: 750rpx;
  background: $bgColor; // 背景颜色
  height: $navHeight;
  display: flex;
  align-items: center;
  .grace-dsc-nav-base-content {
    width: 100%;
    overflow-x: scroll;
    .grace-dsc-nav-base-content__list {
      width: max-content;
      a {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        padding: 0 5rpx;
        box-sizing: border-box;
        img{
          // 图片大小
          width: 52rpx;
        }
        .nav-name {
          // 正常字体样式
          font-size: $fontSize;
          color: $fontColor;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nav-name-active {
          // 选中字体样式
          color: $fontColorActive;
        }
      }
    }
    .nav-list-max {
      a {
        .nav-list-max-lot {
          width: 125rpx;
        }
      }
    }
    .nav-list-flex {
      display: flex;
      justify-content: space-around;
      width: 100%;
      a {
        min-width: 20%;
      }
    }
  }
}
</style>

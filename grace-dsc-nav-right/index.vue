<template>
  <div class="grace-dsc-nav-right">
    <!-- 右上角导航icon -->
    <div
      class="grace-dsc-nav-right__btn"
      @click.stop="isShow = !isShow"
    >
      <img :src="navbtnImg" v-if="navbtnImg !== ''" />
    </div>
    <!-- 导航菜单模块 -->
    <div
      class="grace-dsc-nav-right__popup"
      v-if="isShow"
      @click.self="closeIt"
    >
      <div
        class="grace-dsc-nav-right__content"
      >
        <div class="grace-dsc-nav-right__wrap">
          <!-- 导航模块logo 标题 -->
          <div class="grace-dsc-nav-right__logo">
            <div
              v-if="isLogo"
            >
              <img :src="logoImg" />
            </div>
            <p>导&nbsp;航</p>
          </div>
          <!-- 导航模块菜单list -->
          <ul class="grace-dsc-nav-right__list">
            <li
              class="grace-dsc-nav-right__item"
              v-for="(item, index) of myNavList"
              :key="index"
              @click.stop="toHref(item)"
            >
              <!-- 导航icon -->
              <img
                :src="item.isActive ? item.selectedIcon : item.defaultIcon"
              />
              <!-- 导航文字 -->
              <p
                class="nav-name" :class="[item.isActive ? 'nav-name-active':'']"
              >
                {{ item.message }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, toRefs } from "vue";

const props = defineProps({
  navbtnImg: {
    type: String,
    default: '', // 右上角icon
  }, 
  isLogo: {
    type: Boolean,
    default: false, // logo是否显示
  },
  logoImg: {
    type: String,
    default: '', // logoUrl链接
  }, 
  navList: {
    type: Array,
    default: () => [] // 菜单列表
  },
  isZdyRoute: {
    type: Boolean,
    default: false
  }
})

const {
  navbtnImg,
  isLogo,
  logoImg,
  isZdyRoute,
  navList
} = toRefs(props);

const app = getCurrentInstance()
const { useRouter } = app.appContext.config.globalProperties.grace

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

const isShow = ref(false) // 导航菜单模块是否显示

async function closeIt() {
  // 关闭菜单
  isShow.value = false 
}

// 跳转导航
async function toHref (item) {
  closeIt()
  if (item.target === 'inner') {
    await useRouter(item.nativeHref, {
      target: item.target,
      params: item.params,
      nativeHref: item.nativeHref
    })
  } else if (item.target === 'outer') {
    window.location.href = item.outerHref
  } else {
    window.location.href = item.outerHref
  }
}
</script>
<style lang="scss">
$fontColor: #333333; // 字体颜色
$fontColorActive: #ffffff; // 当前导航字体颜色
$navWeight: 300rpx; // 导航高度
$fontSize: 20rpx; // 字体大小

.grace-dsc-nav-right {
  // 右上角菜单icon样式
  .grace-dsc-nav-right__btn {
    width: 70rpx;
    height: 70rpx;
    box-sizing: border-box;
    position: fixed !important;
    z-index: 998;
    display: flex;
    align-items: center;
    background: #e1e1e1;
    border-radius: 50%;
    top: 25rpx;
    right: 25rpx;
    overflow: hidden;
    img {
      width: 70rpx;
      height: 70rpx;
    }
  }
}

// 导航菜单模块 样式
.grace-dsc-nav-right__popup {
  width: 750rpx;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed !important;
  z-index: 999 !important;
  background-color: rgba(0, 0, 0, 0.7);
  .grace-dsc-nav-right__content {
    height: 100%;
    position: relative;
    width: $navWeight; // 菜单宽度
    .grace-dsc-nav-right__wrap {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #e1e1e1;
      opacity: 0;
      left: -100%;
      animation: nav_vrc_box_show 0.5s ease-out both;
      -webkit-animation: nav_vrc_box_show 0.5s ease-out both;
      // 导航模块logo 标题样式
      .grace-dsc-nav-right__logo {
        width: 88%;
        padding: 15rpx 0;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid #000;
        justify-content: space-between;
        > div {
          max-width: 75%;
          max-height: 60rpx;
          overflow: hidden;
          > img {
            display: block;
            width: 100%;
          }
        }
        > p {
          color: #aaaaaa;
          font-size: 16rpx;
        }
      }
      // 列表样式
      .grace-dsc-nav-right__list {
        width: 88%;
        list-style: none;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 0;
        height: auto;
        .grace-dsc-nav-right__item {
          margin: 0;
          padding: 15rpx 0;
          width: 100%;
          display: flex;
          align-items: center;
          border-bottom: 1rpx solid #cecece;
          img {
            width: 40rpx;
          }
          .nav-name {
            // 导航菜单文字样式
            padding-left: 15rpx;
            font-size: $fontSize;
            color: $fontColor;
          }
          .nav-name-active {
            color: $fontColorActive
          }
        }
      }
    }
  }
}

// 导航弹出动画
@keyframes nav_vrc_box_show {
  0% {
    opacity: 1;
    left: -100%;
  }

  100% {
    opacity: 1;
    left: -0%;
  }
}

@-webkit-keyframes nav_vrc_box_show {
  0% {
    opacity: 1;
    left: -100%;
  }

  100% {
    opacity: 1;
    left: 0%;
  }
}



div {
  box-sizing: border-box;
}
</style>

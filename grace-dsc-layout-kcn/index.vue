<template>
  <div class="grace-dsc-layout-kcn">
    <!-- kv模块 -->
    <div
      class="grace-dsc-layout-kcn__kv"
      @click="closeRoute"
      :style="{ background: 'url(' + kvImg + ')', backgroundSize: '100% 100%' }"
    >
      <slot name="kvslot"></slot>
    </div>
    <div
      class="grace-dsc-layout-kcn__fixed"
      :class="[
        isAll === true && isbegin === true ? 'all-content' : '',
        isAll === false && isbegin === true ? 'no-all-content' : '',
      ]"
    >
      <!-- 切换的内容模块 -->
      <div
        class="grace-dsc-layout-kcn__content"
      >
        <div v-for="tab in navList" :key="tab.id">
          <div v-if="tab.id == currentTabId">
            <slot :name="`${tab.id}`"></slot>
            <grace-dsc-content-copyright />
          </div>
        </div>
      </div>
      <!-- 导航tabs模块 -->
      <div class="grace-dsc-layout-kcn__nav">
        <div class="grace-dsc-layout-kcn__nav-wrap">
          <div class="grace-dsc-layout-kcn__nav-list" :class="[navList.length > 5 ? 'nav-list-max':'nav-list-flex']">
            <a v-for="item in navList" :key="item.href"  @click.stop="changeRoute(item)">
              <div class="grace-dsc-layout-kcn__nav-lot">
                <img :src="item.id === currentTabId ? item.iconUrlActive : item.iconUrl" alt="" v-if="item.iconUrl && item.iconUrl !== '' && item.iconUrl !== null">
                <div class="grace-dsc-layout-kcn__nav-name" :class="[item.id === currentTabId ? 'nav-name-active' : '']">{{ item.name }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted } from "vue";

const props = defineProps({
  navList: {
    type: Array,
    default: () => [], // 菜单列表
  },
  kvImg: {
    type: String,
    default: "", // kv图片
  },
  defaultTabId: {
    type: String,
    default: "", // 默认菜单id
  }
});
const {
  navList,
  kvImg,
  defaultTabId
} = toRefs(props);

// 是否第一次进来（阻止第一次进来后动画执行）
const isbegin = ref(false);

// 是否点击菜单展开内容
const isAll = ref(false);

// 展开的内容id
const currentTabId = ref(defaultTabId.value)

// 切换菜单
function changeRoute(item) {
  if (item.target === "outer") {
    window.location.href = item.outHref;
    return;
  }
  isAll.value = true; // 展开菜单内容
  isbegin.value = true; // 
  currentTabId.value = item.id;
}

// 点击外层关闭菜单
function closeRoute() {
  if (isAll.value === false) {
    return;
  }
  isAll.value = false; // 关闭菜单内容
  isbegin.value = true;
}

onMounted(() => {
  if (defaultTabId.value !== '') {
    isAll.value = true // 展开菜单内容
    isbegin.value = true //
  }
})
</script>

<style lang="scss">
$allcontentHeight: 90%; // 包含导航的所有内容高度
$contentScrollHeight: calc(-90% + 160rpx); // 除导航以外的滑动高度
$contentHeight: calc(100% - 160rpx); // 除导航意外的内容高度
$navColor: #333333; // 导航字体颜色
$navActiveColor: #ffffff; // 导航选中字体颜色
$navBottomHeight: 160rpx; // 导航高度以及内容模块距离底部padding距离
$navbgColor: #e1e1e1; // 导航背景颜色
$contentBg: #f6f6f6; // 内容背景颜色
.all-content {
  // 内容展开动画
  animation: myheight 700ms linear 1 forwards;
  -webkit-animation: myheight 700ms linear 1 forwards;
}
@keyframes myheight {
  from {
    bottom: $contentScrollHeight;
  }
  to {
    bottom: 0;
  }
}
.no-all-content {
  // 内容关闭动画
  animation: mynoheight 700ms linear 1 forwards;
  -webkit-animation: mynoheight 700ms linear 1 forwards;
}
@keyframes mynoheight {
  from {
    bottom: 0;
  }
  to {
    bottom: $contentScrollHeight;
  }
}

.grace-dsc-layout-kcn {
  width: 750rpx;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  position: relative;
  // kv样式
  .grace-dsc-layout-kcn__kv {
    width: 750rpx;
    height: 100%;
  }
  .grace-dsc-layout-kcn__fixed {
    width: 100%;
    height: $allcontentHeight;
    position: fixed;
    background: #ffffff;
    left: 0;
    bottom: $contentScrollHeight;
    // 内容样式
    .grace-dsc-layout-kcn__content {
      padding-bottom: $navBottomHeight;
      width: 100%;
      height: $allcontentHeight;
      z-index: 99;
      overflow-y: scroll;
      background: $contentBg;
    }
    .grace-dsc-layout-kcn__nav {
      width: 100%;
      background: $navbgColor; // 导航背景颜色
      display: flex;
      align-items: center;
      height: $navBottomHeight;
      position: fixed !important;
      bottom: 0;
      left: 0;
      z-index: 9999;
      .grace-dsc-layout-kcn__nav-wrap {
        width: 100%;
        overflow-x: scroll;
        .grace-dsc-layout-kcn__nav-list {
          width: max-content;
          a {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            padding: 0 5rpx;
            box-sizing: border-box;
            img{
              width: 52rpx;
            }
            .grace-dsc-layout-kcn__nav-name {
              font-size: 20rpx;
              color: $navColor; // 导航背景颜色
              line-height: 24px;
            }
            .nav-name-active {
              color: $navActiveColor; // 导航选中字体颜色
            }
          }
        }
        .nav-list-max {
          a {
            .grace-dsc-layout-kcn__nav-lot {
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
  }
}

div {
  box-sizing: border-box;
}
</style>
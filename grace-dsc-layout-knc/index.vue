<template>
  <div class="grace-dsc-layout-knc">
    <!-- kv模块 -->
    <div class="grace-dsc-layout-knc__kv" @click="closeRoute" :style="{background:'url(' + kvImg + ')', backgroundSize: '100% 100%'}">
      <slot name="kvslot"></slot>
    </div>
    <div class="grace-dsc-layout-knc__fixed" :class="[isAll === true && isbegin === true ? 'all-content' : '', isAll === false && isbegin === true ? 'no-all-content' : '']" >
      <!-- 导航tabs模块  --> 
      <div class="grace-dsc-layout-knc__nav">
        <div class="grace-dsc-layout-knc__nav-wrap">
          <div class="grace-dsc-layout-knc__nav-list" :class="[navList.length > 5 ? 'nav-list-max':'nav-list-flex']">
            <a v-for="item in navList" :key="item.href"  @click.stop="changeRoute(item)">
              <div class="grace-dsc-layout-knc__nav-lot">
                <img :src="item.id === currentTabId ? item.iconUrlActive : item.iconUrl" alt="" v-if="item.iconUrl && item.iconUrl !== '' && item.iconUrl !== null">
                <div class="grace-dsc-layout-knc__nav-name" :class="[item.id === currentTabId ? 'nav-name-active' : '']">{{ item.name }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- 切换的内容模块 -->
      <div class="grace-dsc-layout-knc__content">
        <div v-for="tab in navList"
          :key="tab.id">
          <div v-if="tab.id === currentTabId">
            <slot :name="`${tab.id}`"></slot>
            <grace-dsc-content-copyright />
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
    default: () => [] // 菜单列表
  },
  defaultTabId: {
    type: String, // 默认id可不填写
    default: ''
  },
  kvImg: {
    type: String, // kv图片
    default: ''
  },
})

const {
  navList,
  kvImg,
  defaultTabId
} = toRefs(props)

// 是否第一次进来（阻止第一次进来后动画执行）
const isbegin = ref(false);

// 是否点击菜单展开内容
const isAll = ref(false);

// 展开的内容id
const currentTabId = ref(defaultTabId.value)

// 切换菜单
function changeRoute(item) {
  if (item.target === 'outer') {
    // 如果菜单是外链 跳转外链
    window.location.href = item.outHref
    return
  }
  isAll.value = true // 展开菜单内容
  isbegin.value = true //
  currentTabId.value = item.id
}

// 点击外层关闭菜单
function closeRoute() {
  if (isAll.value === false) {
    return
  }
  isAll.value = false // 关闭菜单内容
  isbegin.value = true
}

onMounted(() => {
  if (defaultTabId.value !== '') {
    isAll.value = true // 展开菜单内容
    isbegin.value = true //
  }
})
</script>

<style lang="scss">
$allcontentHeight: 85%; // 包含导航的所有内容高度
$contentScrollHeight: calc(-85% + 160rpx); // 除导航以外的滑动高度
$contentHeight: calc(100vh - 160rpx); // 除导航以外的内容高度
$navColor: #333333; // 导航字体颜色
$navActiveColor: #ffffff; // 导航选中字体颜色
$navbgColor: #e1e1e1; // 导航背景颜色
.all-content {
  // 内容展开动画
  animation:myheight 700ms linear 1 forwards;
  -webkit-animation:myheight 700ms linear 1 forwards; 
}
@keyframes myheight {
  from {bottom: $contentScrollHeight} // 除导航以外的滑动高度
  to {bottom: 0}
}
.no-all-content {
  // 内容关闭动画
  animation:mynoheight 700ms linear 1 forwards;
  -webkit-animation:mynoheight 700ms linear 1 forwards;
}
@keyframes mynoheight {
  from {bottom: 0}
  to {bottom: $contentScrollHeight} // 除导航以外的滑动高度
}
.grace-dsc-layout-knc {
  width: 750rpx;
  height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  .grace-dsc-layout-knc__kv {
    width: 750rpx;
    height: 100%;
  }
  .grace-dsc-layout-knc__fixed {
    width: 100%;
    height: $allcontentHeight; // 包含导航的所有内容高度
    position: absolute;
    background: #ffffff;
    left: 0;
    bottom: $contentScrollHeight;// 除导航意外的内容高度

    // 导航模块样式
    .grace-dsc-layout-knc__nav {
     
      width: 100%;
      height: 160rpx;
      background: $navbgColor; // 导航背景颜色
      display: flex;
      align-items: center;
      .grace-dsc-layout-knc__nav-wrap {
        width: 100%;
        overflow-x: scroll;
        .grace-dsc-layout-knc__nav-list {
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
            .grace-dsc-layout-knc__nav-name {
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
            .grace-dsc-layout-knc__nav-lot {
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

    // 切换的内容部分样式
    .grace-dsc-layout-knc__content {
      width: 100%;
      height: $contentHeight;
      overflow-y:scroll;
    }
  }

}
div {
  box-sizing: border-box;
}
</style>

<template>
  <div class="grace-dsc-tabs">
    <!-- 全部展示 -->
    <div class="grace-dsc-tabs__all-bd" v-if="tabType === 'all'">
      <div v-for="tab in tabs"
        :key="tab.id" class="grace-dsc-tabs-bd-item" :class="[tab.id === currentTabId ? 'grace-dsc-tabs-bd-item-active' : '']" @click="handleTabClick(tab.id)">
        <span >{{ tab.name }}</span>
      </div>
    </div>

    <!-- 滚动展示 -->
    <div class="grace-dsc-tabs__scroll-bd" v-if="tabType === 'scroll'">
      <div class="grace-dsc-tabs-bd-list" :class="[tabs.length > 5 ? 'grace-dsc-tabs-bd-list-max':'grace-dsc-tabs-bd-list-flex']">
        <div v-for="tab in tabs"
          :key="tab.id" class="grace-dsc-tabs-bd-item" :class="[tab.id === currentTabId ? 'grace-dsc-tabs-bd-item-active' : '']">
          <span @click="handleTabClick(tab.id)" class="top-nav-lot">{{ tab.name }}</span>
        </div>
      </div>
    </div>

    <!-- 弹窗展示 -->
    <div class="grace-dsc-tabs__dailog-bd" v-if="tabType === 'dailog'">
      <div class="grace-dsc-tabs-bd-list" >
        <div v-for="tab in tabs"
          :key="tab.id" class="grace-dsc-tabs-bd-item" :class="[tab.id === currentTabId ? 'grace-dsc-tabs-bd-item-active' : '']">
          <span @click="handleTabClick(tab.id)" class="top-nav-lot">{{ tab.name }}</span>
        </div>
        <div class="grace-dsc-tabs-bd-list-btn" @click="openDailog">
          <img :src="tabbtn" alt="">
        </div>
      </div>
    </div>

    <!-- tab切换内容 -->
    <div v-for="tab in tabs"
      :key="tab.id" class="grace-dsc-tabs-content">
      <div v-if="tab.id === currentTabId">
        <slot :name="`${tab.id}`"></slot>
      </div>
    </div>

    <!-- 弹窗 -->
    <tui-bottom-popup :height="1000"  :show="popupShow" @close="closeDailog">
      <div class="grace-dsc-tabs-all-bd">
        <div v-for="tab in tabs"
          :key="tab.id" class="grace-dsc-tabs-bd-item" :class="[tab.id === currentTabId ? 'grace-dsc-tabs-bd-item-active' : '']" @click="handleTabClick(tab.id)">
          <span>{{ tab.name }}</span>
        </div>
      </div>
    </tui-bottom-popup>
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue'

const props = defineProps({
  tabType: {
    type: String,
    default: 'all'
  },
  tabs: {
    type: Array,
    default: () => []
  },
  defaultTabId: {
    type: String,
    default: ''
  }
})

const {
  tabType,
  tabs,
  defaultTabId,
  backgroundUrl,
  backgroundColor
} = toRefs(props)

// 当前选项id
const currentTabId = ref(defaultTabId.value)

// 弹窗展示按钮图片
const tabbtn = ref('https://webapp.zhaopin.com/common/static-resource/tab-btn.fc448c08.png')

// 弹窗显示关闭开关
const popupShow = ref(false)

// 切换tab
function handleTabClick (id) {
  currentTabId.value = id
}

// 打开弹窗
function openDailog () {
  popupShow.value = true
}

// 关闭弹窗
function closeDailog () {
  popupShow.value = false
}
</script>

<style lang="scss">
.grace-dsc-tabs {
  width: 100%;
  // 全部展示样式
  .grace-dsc-tabs__all-bd {
    width: 100%;
    padding: 20rpx;
    background: #d1ecf9;
    .grace-dsc-tabs-bd-item {
      width: 46%;
      margin: 10rpx 2%;
      display: inline-block;
      text-align: center;
      padding: 10rpx;
      border-radius: 35rpx;
      background: #ffffff;
      span {
        font-size: 26rpx;
      }
    }
    .grace-dsc-tabs-bd-item-active {
      background: #33bdf4;
      color: #ffffff;
    }
  }

  // 滚动展示样式
  .grace-dsc-tabs__scroll-bd {
    width: 100%;
    padding: 20rpx;
    overflow-x: scroll;
    background: #d1ecf9;
    .grace-dsc-tabs-bd-list {
      width: max-content;
      .grace-dsc-tabs-bd-item {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        padding: 0 5rpx;
        box-sizing: border-box;
        span {
          font-size: 20rpx;
          color: #333333;
          line-height: 24px;
          background: #ffffff;
          border-radius: 25rpx
        }
      }
      .grace-dsc-tabs-bd-item-active {
        span {
          color: #ffffff;
          background: #33bdf4;
        }
      }
      
    }
    .grace-dsc-tabs-bd-list-max {
        .grace-dsc-tabs-bd-item {
          .top-nav-lot {
            width: 125rpx;
            display: inline-block;
          }
        }
    }
    .grace-dsc-tabs-bd-list-flex {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .grace-dsc-tabs-bd-item {
          min-width: 20%;
          .top-nav-lot {
            width: 125rpx;
            display: inline-block;
          }
        }
    }
  }

  // 弹窗展示样式
  .grace-dsc-tabs__dailog-bd {
    width: 100%;
    padding: 20rpx 20rpx;
    overflow: hidden;
    background: #d1ecf9;
    .grace-dsc-tabs-bd-list {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: relative;
      .grace-dsc-tabs-bd-list-btn {
        width: 60rpx;
        position: absolute;
        right: -20rpx;
        top: -20rpx;
        background: #d1ecf9;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 40rpx;
        }
      }
      .grace-dsc-tabs-bd-item {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        padding: 0 5rpx;
        box-sizing: border-box;
        span {
          font-size: 20rpx;
          color: #333333;
          line-height: 24px;
          background: #ffffff;
          border-radius: 25rpx;
          width: 135rpx;
          display: inline-block;
        }
      }
      .grace-dsc-tabs-bd-item-active {
        span {
          color: #ffffff;
          background: #33bdf4;
        }
      }
    }
  }
}
div {
  box-sizing: border-box;
}
</style>
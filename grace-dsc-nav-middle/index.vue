<template>
  <div class="grace-dsc-nav-middle">
    <div class="grace-dsc-nav-middle__list" :style="{'justify-content':myNavList.length > 5 ? 'flex-start':'space-evenly'}">
      <div  
        class="grace-dsc-nav-middle__item"
        v-for="(item, index) in myNavList"
        :key="index"
        @click="toHref(item)"
        :style="{'width':isWidth + '%'}"
        >
        <div class="grace-dsc-nav-middle__box">
          <img :src="item.isActive ? item.selectedIcon : item.defaultIcon" />
          <div class="nav-name" :class="[item.isActive ? 'nav-name-active':'']">{{ item.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, toRefs, getCurrentInstance} from 'vue';
  
const props = defineProps({
  isZdyRoute: {
    type: Boolean,
    default: false
  },
  navList: {
    type: Array,
    default: () =>  [],
  }
});

const app = getCurrentInstance();
const { useRouter } = app.appContext.config.globalProperties.grace;

let isWidth = ref(20); // 每个菜单的宽度
const {navList, isZdyRoute} = toRefs(props)

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

onMounted(async() => {
  await handleChange();      
})

// 导航数量动态宽度
async function handleChange(){
  const count = navList.length;
  switch(count) {
    case 6:
      isWidth.value = 33.33;
      break;
    case 7:
      isWidth.value = 25;
      break;
    case 8:
      isWidth.value = 25;
      break;
    case 9:
      isWidth.value = 20;
      break;
    case 10:
      isWidth.value = 20;
      break;
  }
}

// 切换导航
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
    window.location.href = item.outerHref
  }
}

</script>

<style lang="scss">
$bgColor: #e1e1e1; // 背景颜色
$fontColor: #333333; // 字体颜色
$fontColorActive: #ffffff; // 当前导航字体颜色
$fontSize: 20rpx; // 字体大小
.grace-dsc-nav-middle{
  width: 750rpx;
  padding: 10rpx 0;
  background: $bgColor;
  .grace-dsc-nav-middle__list {
    list-style: none;
    padding: 0;
    outline: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .grace-dsc-nav-middle__item{
      width:20%;
      display:flex;
      justify-content:center;
      align-items:center;
      margin:20rpx 0;
      .grace-dsc-nav-middle__box{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          // 图片大小
          width: 52rpx;
        }
        .nav-name{
          // 正常字体样式
          font-size: $fontSize;
          color: $fontColor;
          line-height: 24px;
          text-align: center;
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
  }
}
</style>

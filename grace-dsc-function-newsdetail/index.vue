<template>
  <div class="grace-dsc-function-newsdetail">
    <div class="grace-dsc-function-newsdetail-title" v-if="isShowTitle">
      {{ title }}
    </div>
    <div class="grace-dsc-function-newsdetail-content" v-html="detail"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from "vue";

const app = getCurrentInstance();
const { useData, useRouter } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  isShowTitle: {
    type: Boolean,
    default: false // 跳转路由地址
  },
  newsCode: {
    type: String,
    default: '' // 新闻编号
  }
})

const { 
  isShowTitle,
  newsCode
} = toRefs(props)

const companyId = app.appContext.app._component.globalData.companyNumber // 公司社招id

// 接口参数
const newData = {
  companyId: companyId,
  newsCode: ""
}

const detail = ref() // 内容
const title = ref() // 标题
// 获取列表
async function getnewsDetail(extra = {}) {
  const res = await useData("newsDetail", extra)
  detail.value = res.data.data.news_content
  title.value = res.data.data.news_title
}

onMounted(async () => {
  let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  let code = routes[routes.length - 1].$page.options.code ? routes[routes.length - 1].$page.options.code : newsCode.value
  
  newData.newsCode = code
  await getnewsDetail(newData);
});


</script>

<style lang="scss">
.grace-dsc-function-newsdetail {
  width: 100%;
  .grace-dsc-function-newsdetail-title {
    text-align: center;
    padding: 10rpx 0;
  }
}
</style>

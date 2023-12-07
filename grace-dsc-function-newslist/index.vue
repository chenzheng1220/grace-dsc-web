<template>
  <div class="grace-dsc-function-news">
    <tui-loading v-if="loading"></tui-loading>
    <tui-no-data v-if="noData" imgUrl="https://webapp.zhaopin.com/common/static-resource/img_nodata.64228dd4.png" :fixed="false">
      <text class="tui-color__black">暂无数据</text>
    </tui-no-data>
    <div v-for="item in newList" :key="item.code" class="grace-dsc-function-news-list" @click="navClick(item.news_code)">
      <div class="grace-dsc-function-news-title">{{ item.news_title }}</div>
      <div class="grace-dsc-function-news-jt">
        <img src="https://webapp.zhaopin.com/2023/shh/gdnhn0112ZL81814/new-jt.png" alt="">
      </div>
    </div>
    <tui-nomore v-if="noMore" text="NO MORE"></tui-nomore>
  </div>
  <!-- 详情弹窗 -->
  <tui-bottom-popup  :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="popup">
    <div class="grace-dsc-function-newsdetail">
      <div class="grace-dsc-function-newsdetail-title">
        {{ title }}
      </div>
      <div class="grace-dsc-function-newsdetail-content" v-html="detail"></div>
    </div>
  </tui-bottom-popup>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
const app = getCurrentInstance();
const { useData, useRouter } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  newsType:{
    type: String,
    default: '' // 新闻类型用逗号分隔
  },
  newsCode:{
    type: String,
    default: '' // 新闻编号用逗号分隔
  },
  isOutUrl: {
    type: Boolean,
    default: false // 详情是否跳转新路由
  },
  href: {
    type: String,
    default: '' // 跳转路由地址
  }
})

const { 
  newsType,
  newsCode,
  href,
  isOutUrl
} = toRefs(props)

const companyId =  app.appContext.app._component.globalData.companyNumber // 公司社招id
const popupShow =  ref(false)
const loading = ref(false); // loading显示
const noMore = ref(false); // 没有更多职位
const noData = ref(false); // 没有数据
const detail = ref()
const title = ref()
// 获取新闻详情数据
async function getDetail(code) {
  popupShow.value = true
  const data = {
    companyId: companyId,
    newsCode: code
  }
  const res = await useData("newsDetail", data)
  detail.value = res.data.data.news_content
  title.value = res.data.data.news_title
}

// 关闭详情弹窗
const popup = () =>{
  popupShow.value = false
}

// 接口参数
const newData = reactive({
  companyId: companyId,
  newsType: newsType.value,
  newsCode: newsCode.value,
  pageIndex: 1,
  pageSize: 20
})

const newList = ref([])
// 获取列表
async function getnewsList(extra = {}) {
  loading.value = true;
  const res = await useData("newsList", extra)
  const list = res.data.data.listObj
  let isEndPage = false
  if (res.data.data.currPage === res.data.data.totalPage) {
    // 判断是否是最后一页
    isEndPage = true
  }

  if (extra.pageIndex == 1) newList.value = []

  let now_list = newList.value;
  now_list = now_list.concat(list);
  newList.value = now_list;
  loading.value = false;
 
  if (newList.value.length == 0) noData.value = true;
  else noData.value = false;

  if (newList.value.length > 0 && isEndPage) noMore.value = true;
  else noMore.value = false;
}

//跳转详情
async function navClick(id) {
  if(isOutUrl.value === true) {
     await useRouter(href.value + '?code=' + id, {
      target: 'inner',
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
  } else {
    getDetail(id)
  }
}

onMounted(async () => {
  await getnewsList(newData);
});

onReachBottom(async () => {
  // 上滑加载更多
  if (noMore.value) return;

  newData.pageIndex++;
  const mydata = JSON.parse(JSON.stringify(newData))
  // mydata.orgNumbers = ['CZ628039430']
  await getnewsList(mydata);
});

</script>

<style lang="scss">

.grace-dsc-function-news {
  width: 100%;
  .grace-dsc-function-news-list {
    width: 100%;
    background: #ffffff;
    padding: 20rpx;
    margin-bottom: 15rpx;
    border-radius: 10rpx;
    -moz-box-shadow:0px 0px 3px #DEDEDE; 
    -webkit-box-shadow:0px 0px 3px #DEDEDE; 
    box-shadow:0px 0px 3px #DEDEDE;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .grace-dsc-function-news-title {
      font-size: 30rpx;
      font-weight: bold;
      flex: 1;
      padding-right: 10rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .grace-dsc-function-news-jt {
      img {
        width: 18rpx;
      }
    }
  }
}
// 详情
.grace-dsc-function-newsdetail {
  width: 100%;
  padding: 15rpx 15rpx;
  max-height: 90vh;
  overflow-y: scroll;
  .grace-dsc-function-newsdetail-title {
    text-align: center;
    padding: 10rpx 0;
  }
  .grace-dsc-function-newsdetail-content {
    width: 100%;
  }
}
div {
  box-sizing: border-box;
}
</style>

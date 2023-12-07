<template>
  <div class="grace-dsc-job-list-company">
    <tui-no-data v-if="noData" imgUrl="https://webapp.zhaopin.com/common/static-resource/img_nodata.64228dd4.png" :fixed="false">
        <text class="tui-color__black">暂无数据</text>
    </tui-no-data>
    <div v-for="item in companyList" :key="item.code" class="grace-dsc-job-list-company-item" @click="navClick(item.code, item)">
      <div class="grace-dsc-job-list-company-title">{{ item.name }}</div>
      <div class="grace-dsc-job-list-company-item-tag">
        <span v-for="list in opslist" :key="list">{{ item[list] }}</span>
        <div class="grace-dsc-job-list-company-item-jt">
          <img src="https://webapp.zhaopin.com/2023/shh/gdnhn0112ZL81814/new-jt.png" alt="">
        </div>
      </div>
      <div class="grace-dsc-job-list-company-item-count">
        <div v-if="isAddress">{{ item.cityName }}</div>
        <div v-if="isAddress">|</div>
        <div>在招岗位<span style="color: #3b97e6">{{ item.count }}</span>个</div>
      </div>
    </div>
  </div>
  <tui-bottom-popup  :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="popup">
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="grace-dsc-job-list__detail-hei">
      <div class="grace-dsc-job-list-detail grace-dsc-job-list-company-item-detail" >
        <div>{{ detailData.campusOrgName }}</div>
        <div class="grace-dsc-job-list-company-item-tag">
          <span v-if="detailData.property && detailData.property !== null && detailData.property !== ''">{{ detailData.property }}</span>
          <span v-if="detailData.companySize && detailData.companySize !== null && detailData.companySize !== ''">{{ detailData.companySize }}</span>
          <span v-if="detailData.industry && detailData.industry !== null && detailData.industry !== ''">{{ detailData.industry }}</span>
        </div>
        <div class="grace-dsc-job-list-company-item-count">
          <div v-if="detailData.cityName && detailData.cityName !== null && detailData.cityName !== ''">{{ detailData.cityName }}</div>
          <div>|</div>
          <div>在招岗位<span style="color: #3b97e6">{{ detailData.onlinePositionNumbers }}</span>个</div>
        </div>
      </div>
      <!-- 公司简介 -->
      <div class="grace-dsc-job-list-company-item-detail" >
        <div class="grace-dsc-job-list-company-item-js">公司介绍</div>
        <div class="grace-dsc-job-list-company-item-word" v-html="detailData.companyDescription">
        </div>
      </div>
    </scroll-view>
  </tui-bottom-popup>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";

const app = getCurrentInstance();
const { useData, useRouter } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  href: {
    type: String,
    default: '' // 跳转路由地址
  },
  opslist: {
    type: Array,
    default: () => ['orgTypeName', 'orgSizeName', 'smallName'] // 标签显示
  },
  isAddress: {
    type: Boolean,
    default: true // 是否显示地址
  },
  isOutUrl: {
    type: Boolean,
    default: true // 详情是否跳转新路由
  },
})

const { 
  href,
  isAddress,
  opslist,
  isOutUrl
} = toRefs(props)

const companyId =  app.appContext.app._component.globalData.companyId // 公司社招id
const companyXzId =  app.appContext.app._component.globalData.xiaozhaoId // 公司校招id
const scene = app.appContext.app._component.globalData.scene // 社招还是校招
const popupShow =  ref(false)
const detailData = ref({}); // 公司详情数据
const scrollTop = ref(0)

const loading = ref(false); // loading显示
const noMore = ref(false); // 没有更多职位
const noData = ref(false); // 没有数据

const companyData = reactive({
  orgNumber: scene === 'cam' ? companyXzId : companyId,
  jobSource:  scene === 'cam' ? 2 : 1,
  facetFields: [ "SOU_COMPANY_ID"],
  pageIndex: 1,
  sortType: 1,
  pageSize: 5
})

// 获取详情数据
async function getDetail(id) {
  const data = {
    companyNumber: id,
    scene: scene,
    convertRequired: scene === 'social' ? false : true
  }
  const res = await useData("dscGetCompanyDetail", data)
  detailData.value = res.data.data.companyBase
}

// 关闭详情弹窗
const popup = () =>{
  popupShow.value = false
}

const companyList = ref([])
// 登陆点公司聚合
async function getdscGetSearchAggregation(extra = {}) {
  loading.value = true;
  const res = await useData("dscGetSearchAggregation", extra)

  loading.value = false;

  const list = res.data.data.itemMap !== null ? res.data.data.itemMap.SOU_COMPANY_ID : []
  list.sort((a, b) => a.extend.seqNumber - b.extend.seqNumber);
  if (extra.pageIndex == 1) companyList.value = []

  const newcompanyList = []
  list.forEach(item => {
    const companyobj = {
      count: '',
      name: '',
      code: '',
    }
    companyobj.count = item.count
    companyobj.name = JSON.parse(item.extend.companyInfo).campusOrgName
    companyobj.code = JSON.parse(item.extend.companyInfo).orgId
    companyobj.largeName = JSON.parse(item.extend.companyInfo).superIndustryType.mainIndustry.smallName
    const summary = {...companyobj, ...JSON.parse(item.extend.companyInfo)}
    newcompanyList.push(summary)
  })
  companyList.value = [...companyList.value, ...newcompanyList]

  let isEndPage = false
  if (res.data.data.properties.SOU_COMPANY_ID.totalCount === companyList.value.length) {
    // 判断是否是最后一页
    isEndPage = true
  }

  if (companyList.value.length == 0) noData.value = true;
  else noData.value = false;

  if (companyList.value.length > 0 && isEndPage) noMore.value = true;
  else noMore.value = false;
}

//跳转公司列表
async function navClick(id, item) {
  if (isOutUrl.value === false) {
    popupShow.value = true
    getDetail(id)
  } else {
    await useRouter(href.value + '?id=' + id, {
      target: 'inner',
      params: item,
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
  await getdscGetSearchAggregation(companyData);
});


onReachBottom(async () => {
  // 上滑加载更多
  if (noMore.value) return;

  companyData.pageIndex++;
  getdscGetSearchAggregation(companyData)
});

</script>

<style lang="scss">
.grace-dsc-job-list-company-title {
  font-size: 30rpx;
  font-weight: bold;
}
.grace-dsc-job-list-company {
  width: 100%;
}
.grace-dsc-job-list__detail-hei {
  height: 1300rpx;
}
// 详情
.grace-dsc-job-list-company-item-detail {
    width: 100%;
    background: #ffffff;
    padding: 20rpx;
    margin-bottom: 15rpx;
    border-radius: 10rpx;
    box-sizing: border-box;
    .grace-dsc-job-list-company-item-count {
      width: 100%;
      display: flex;
      align-items: center;
      color: #666666;
      margin-top: 10rpx;
      div {
        padding-right: 10rpx;
        font-size: 26rpx;
      }
    }
    .grace-dsc-job-list-company-item-tag {
      padding: 10rpx 30rpx 10rpx 0;
      position: relative;
      span {
        font-size: 22rpx;
        background: #f3f3f3;
        padding: 4rpx 7rpx;
        margin-right: 10rpx;
        border-radius: 3rpx;
      }
      .grace-dsc-job-list-company-item-jt {
        position: absolute;
        right: 0;
        top:15rpx;
        img {
          width: 18rpx;
        }
      }
    }
}
.grace-dsc-job-list-company-item {
    width: 100%;
    background: #ffffff;
    padding: 20rpx;
    margin-bottom: 15rpx;
    border-radius: 10rpx;
    -moz-box-shadow:0px 0px 3px #DEDEDE; 
    -webkit-box-shadow:0px 0px 3px #DEDEDE; 
    box-shadow:0px 0px 3px #DEDEDE;
    box-sizing: border-box;
    .grace-dsc-job-list-company-item-count {
      width: 100%;
      display: flex;
      align-items: center;
      color: #666666;
      margin-top: 10rpx;
      div {
        padding-right: 10rpx;
        font-size: 26rpx;
      }
    }
    .grace-dsc-job-list-company-item-tag {
      padding: 10rpx 30rpx 10rpx 0;
      position: relative;
      span {
        font-size: 22rpx;
        background: #f3f3f3;
        padding: 4rpx 7rpx;
        margin-right: 10rpx;
        border-radius: 3rpx;
      }
      .grace-dsc-job-list-company-item-jt {
        position: absolute;
        right: 0;
        top:15rpx;
        img {
          width: 18rpx;
        }
      }
    }
  }
.grace-dsc-job-list-base {
  width: 100%;
  .grace-dsc-job-list-base__job-filter {
    width: 100%;
    position: relative;
  }
  .grace-dsc-job-list-base__job-list {
    width: 100%;
  }
}
</style>

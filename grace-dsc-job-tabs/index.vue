<template>
   <!-- 职位列表 -->
  <div class="grace-dsc-job-list-base" >
    <div class="grace-dsc-job-tabs__list">
      <div class="grace-dsc-tabs__scroll-bd" >
        <div class="grace-dsc-tabs__more-btn" @click="open"  v-if="isMore">
          <img src="https://webapp.zhaopin.com/2023/shh/zgtjg0316ZL81814/list.png" alt="">
        </div>
        <div class="grace-dsc-tabs-bd-list" :style="{paddingRight: isMore === true ? '55rpx' : '0'}" :class="[tabList.length > 5 ? 'grace-dsc-tabs-bd-list-max':'grace-dsc-tabs-bd-list-flex']">
          <div v-for="(tab, index) in tabList"
            :key="tab.id" class="grace-dsc-tabs-bd-item" :class="[index === currentIndex ? 'grace-dsc-tabs-bd-item-active' : '']">
            <span @click="handleTabClick(tab, index)" class="top-nav-lot">{{ tab.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <tui-loading v-if="loading"></tui-loading>
    <!-- 职位卡片插槽 -->
    <div class="grace-dsc-job-list-base__job-list">
      <tui-no-data v-if="noData" imgUrl="https://webapp.zhaopin.com/common/static-resource/img_nodata.64228dd4.png" :fixed="false">
        <text class="tui-color__black">暂无数据</text>
      </tui-no-data>
      <div v-for="(jobItem, index) in jobList" :key="index"  style="background: #ffffff;padding: 0rpx 25rpx;margin-bottom: 20rpx;border-radius: 10rpx">
        <slot name="item" :jobItem="jobItem" />
      </div>
    </div>

    <tui-nomore v-if="noMore" text="NO MORE"></tui-nomore>
  </div>
  <tui-bottom-popup  :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="close">
	  <div class="grace-dsc-tabs__dailog">
      <div class="grace-dsc-tabs__dailog-list">
          <div v-for="(tab, index) in tabList"
            :key="tab.id" class="grace-dsc-tabs__dailog-item" :class="[index === currentIndex ? 'grace-dsc-tabs__dailog-item-active' : '']">
            <span @click="handleTabClick(tab, index)">{{ tab.name }}</span>
          </div>
      </div>
    </div>
  </tui-bottom-popup>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from "vue";
import { onReachBottom, onPageScroll } from "@dcloudio/uni-app";


const app = getCurrentInstance();
const { useData, usePageData, useRouter } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  tabType: {
    type: String,
    default: 'SOU_COMPANY_ID' // 聚合数据
  },
  isMore: {
    type: Boolean,
    default: false // 是否需要显示更多按钮
  },
  firstList: {
    type: Array,
    default: () => [] // 优先字段
  }
});
const {tabType, isMore, firstList} = toRefs(props)

const scrollTop = ref(0);
const jobList = ref([]); // 职位列表
const loading = ref(false); // loading显示
const noMore = ref(false); // 没有更多职位
const noData = ref(false); // 没有数据
const currentIndex = ref(0) // 当前tab index
const companyId =  app.appContext.app._component.globalData.companyId // 公司社招id
const companyXzId =  app.appContext.app._component.globalData.xiaozhaoId // 公司校招id
const scene = app.appContext.app._component.globalData.scene // 社招还是校招
const popupShow = ref(false) // 列表弹窗是否显示

const tabList = ref([]); // 选项卡列表

// 打开列表弹窗
async function close() {
  popupShow.value = false
}

// 关闭列表弹窗
async function open() {
  popupShow.value = true
}

// 排序优先数据 
function firstSort() {
  if (firstList.value.length === 0) {
    return
  }
  const newArr = firstList.value
  newArr.reverse()
  newArr.forEach(list => {
    tabList.value.sort((a, b) => {
      if (a.name === list.name) {
        return -1; // a 在 b 前面
      } else if (b.name === list.name) {
        return 1; // b 在 a 前面
      }
    });
  })
}

// tabs数据
async function getdscGetSearchAggregation(extra = {}) {

  const res = await useData("dscGetSearchAggregation", extra);

  if (res.data.code === 200) {
    
    
    if (tabType.value === 'JD_WORK_CITY_CODE') {
      // 城市列表
    const city = res.data.data.itemMap !== null ? res.data.data.itemMap.JD_WORK_CITY_CODE : {};
    const cityArr = []
    for (let key in city) {
      city[key].forEach(item => {
        const cityobj = {
          name: '',
          code: ''
        }
        cityobj.name = item.name
        cityobj.code = item.code
        cityArr.push(cityobj)
      })
    }
    tabList.value = cityArr;
    } else if (tabType.value === 'SOU_COMPANY_ID') {
      
      // 登陆点列表
      const companyList = res.data.data.itemMap !== null ? res.data.data.itemMap.SOU_COMPANY_ID : [];
      console.log(JSON.parse(companyList[0].extend.companyInfo))
    //   if (scene === 'cam') {
    //   const companyList = res.data.data.itemMap !== null ? res.data.data.itemMap.SOU_XY_ORG_ID : [];
    //   tabList.value = companyList
    //  } else {
    //   const companyList = res.data.data.itemMap !== null ? res.data.data.itemMap.SOU_COMPANY_AUTOID : [];
    //   tabList.value = companyList
    //  }
      const newcompanyList = []
      companyList.forEach(item => {
        const companyobj = {
          count: '',
          name: '',
          code: '',
        }
        companyobj.count = item.count
        companyobj.name = scene === 'cam' ? JSON.parse(item.extend.companyInfo).campusOrgName : JSON.parse(item.extend.companyInfo).orgName
        companyobj.code = JSON.parse(item.extend.companyInfo).orgId 
        const summary = {...companyobj, ...JSON.parse(item.extend.companyInfo)}
        newcompanyList.push(summary)
      })
      tabList.value = newcompanyList;
      
    }  else {
      // 常规列表
      const list = res.data.data.itemMap !== null ? res.data.data.itemMap[tabType.value] : []
      tabList.value = list
    }
    firstSort()
  }
}

// 职位数据参数
const jobFilter = reactive({ pageIndex: 1, pageSize: 5, orgNumbers:"", jobSource:'2', orgDepartmentIds:"", workRegionIds: "", jobTypes: "", priorityMajors: "", customTags: ""});

// 判断是校招还是社招
if (scene === 'cam') {
  jobFilter.orgNumbers = companyXzId + ''
  jobFilter.jobSource = 2
} else {
  jobFilter.orgNumbers = companyId
  jobFilter.jobSource = 1
}

/**
 * https://wiki.zhaopin.com/pages/viewpage.action?pageId=114979602
 */
// 获取公司列表数据
async function getJobList(extra = {}) {
  loading.value = true;
  const res = await useData("dscSearchJobList", extra);
  // const { list, isEndPage, isVerification } = res.data.jobList;
  const list = res.data.data.jobList
  let isEndPage = false
  if (res.data.data.pageInfo.pageIndex === res.data.data.pageInfo.totalPage) {
    // 判断是否是最后一页
    isEndPage = true
  }

  if (extra.pageIndex == 1) jobList.value = []

  let now_list = jobList.value;

  now_list = now_list.concat(list);
  jobList.value = now_list;
  loading.value = false;
 
  if (jobList.value.length == 0) noData.value = true;
  else noData.value = false;

  if (jobList.value.length > 0 && isEndPage) noMore.value = true;
  else noMore.value = false;
}

async function handleTabClick(tab, index) {
  currentIndex.value = index
  const mydata = JSON.parse(JSON.stringify(jobFilter))
  mydata.pageIndex = 1
  if (tabType.value === 'JD_WORK_CITY_CODE') {
    mydata.workRegionIds = tab.code // 工作地点 
    jobFilter.workRegionIds = tab.code 
  } else if (tabType.value === 'SOU_COMPANY_ID') {
    mydata.orgDepartmentIds = tab.code // 登陆点
    jobFilter.orgDepartmentIds = tab.code
  } else if (tabType.value === 'JD_JOB_LEVEL3') {
    mydata.jobTypes = tab.code // 职位类型
    jobFilter.jobTypes = tab.code 
  } else if (tabType.value === 'SOU_XY_PRIORITY_MAJORS') {
    mydata.majors = tab.name // 优选专业
    jobFilter.majors = tab.name 
  } else if (tabType.value === 'JD_BUSINESS_TAG') {
    mydata.customTags = tab.pureName // 自定义标签
    jobFilter.customTags = tab.pureName 
  }
  popupShow.value = false
  await getJobList(mydata);
}

onMounted(async () => {
  const searchData = {
    orgNumber: scene === 'cam' ? companyXzId : companyId,
    jobSource:  scene === 'cam' ? 2 : 1,
    facetFields: [tabType.value],
    sortType: 1,
    pageSize: 50
  }
  await getdscGetSearchAggregation(searchData)
  const mydata = JSON.parse(JSON.stringify(jobFilter)) 

  const code = tabList.value.find((item, index) => index === 0).code;
  handleTabClick({ code: code}, 0);
  //await getJobList(mydata);

});

onReachBottom(async () => {
  // 上滑加载更多
  if (noMore.value) return;

  jobFilter.pageIndex++;
  const mydata = JSON.parse(JSON.stringify(jobFilter))
  // mydata.orgNumbers = ['CZ628039430']
  await getJobList(mydata);
});

onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});
</script>

<style lang="scss">
.grace-dsc-tabs__dailog {
  width: 100%;
  padding: 20rpx;
  .grace-dsc-tabs__dailog-list {
    width: 100%;
    height: 50vh;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .grace-dsc-tabs__dailog-item {
      
      width: 30%;
     
      text-align: center;
      span {
        display: block;
        margin-bottom: 10rpx;
        padding: 5rpx 10rpx;
        white-space:nowrap;
        overflow:hidden; 
        text-overflow:ellipsis;
        max-width: 100%;
        border-radius: 30rpx;
      }
      
    }
    .grace-dsc-tabs__dailog-item-active {
      span {
        background: #33bdf4;
        color: #ffffff;
      } 
    }
  }
}
// 公司介绍
.grace-dsc-job-list-company-item-js {
  font-size: 36rpx;
  font-weight: bolder;
}
.grace-dsc-job-list-company {
  width: 100%;
  margin-top: -35rpx;
  
}
.grace-dsc-job-list-company-item-word {
  font-size: 24rpx;
  line-height: 36rpx;
  margin-top: 10rpx;
}
// 公司详情
.grace-dsc-job-list-company-item {
    width: 100%;
    background: #ffffff;
    padding: 20rpx;
    margin-bottom: 15rpx;
    border-radius: 10rpx;
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
  
.grace-dsc-job-tabs__list {
  width: 100%;
  position: relative;
  .grace-dsc-tabs__more-btn {
      width: 70rpx;
      height: 100%;
      position: absolute;
      right: 0rpx;
      top: 0;
      background: #33bdf4;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50rpx;
        height: 60rpx;
      }
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
            white-space:nowrap;
            overflow:hidden; 
            text-overflow:ellipsis;
            padding: 0 10rpx;
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
            white-space:nowrap;
            overflow:hidden; 
            text-overflow:ellipsis;
            padding: 0 10rpx;
          }
        }
    }
  }
div {
  box-sizing: border-box;
}
</style>

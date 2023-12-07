<template>
  <!-- 公司详情 -->
  <div class="grace-dsc-job-list-detail grace-dsc-job-list-company-item" v-if="isCompanyDetail">
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
  <div class="grace-dsc-job-list-company-item" v-if="isCompanyDetail">
    <div class="grace-dsc-job-list-company-item-js">公司介绍</div>
    <div class="grace-dsc-job-list-company-item-word" v-html="detailData.companyDescription">
    </div>
  </div>
  <!-- 部门简介 -->
  <div class="grace-dsc-job-list-company-item" v-if="isDeptDetail">
    <div class="grace-dsc-job-list-dept-name">{{ detailDeptData.name }}</div>
    <div class="grace-dsc-job-list-company-item-js">公司介绍</div>
    <div class="grace-dsc-job-list-company-item-word" v-html="detailDeptData.description">
    </div>
  </div>
  <!-- 职位列表 -->
  <div class="grace-dsc-job-list-base" >
    <tui-loading v-if="loading"></tui-loading>
    <!-- 职位搜索插槽 -->
    <div v-if="$slots.filter" class="grace-dsc-job-list-base__job-filter">
      <slot name="filter" :companyIds="companyIds" :companyOutId="companyOutId" :isCam="isCam" :isGroup="isGroup"></slot>
    </div>
    <!-- 职位卡片插槽 -->
    <div class="grace-dsc-job-list-base__job-list">
      <tui-no-data v-if="noData" imgUrl="https://webapp.zhaopin.com/common/static-resource/img_nodata.64228dd4.png" :fixed="false">
        <text class="tui-color__black">暂无数据</text>
      </tui-no-data>
      <div v-for="(jobItem, index) in jobList" :key="index"  style="background: #ffffff;padding: 0rpx 25rpx;margin-bottom: 20rpx;border-radius: 10rpx">
        <slot name="item" :jobItem="jobItem" :isCam="isCam" />

      </div>
    </div>

    <tui-nomore v-if="noMore" text="NO MORE"></tui-nomore>
    <div class="back" @click="navClick" v-if="isBack">
      返回
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from "vue";
import { onReachBottom, onPageScroll } from "@dcloudio/uni-app";


const app = getCurrentInstance();
const { useData, usePageData, useRouter } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  isCompanyDetail: {
    type: Boolean,
    default: false // 是否显示公司详情， 公司简介
  },
  isDeptDetail: {
    type: Boolean,
    default: false // 是否显示公司详情， 公司简介
  },
  isBack: {
    type: Boolean,
    default: false // 是否显示返回按钮 返回公司列表页面
  },
  backUrl: {
    type: String,
    default: '' // 返回列表页面路由
  },
  positionType: {
    type: String,
    default: 'ordinary'
  },
  isCam: {
    type: String,
    default: '' // 校招还是社招id
  },
  companyIds: {
    type: Array,
    default: () => [] // 公司id
  },
  tagsId: {
    type: Array,
    default: () => [] // 自定义标签id
  },
  companyOutId: {
    type: Array,
    default: () => [] // 公司登陆点id
  },
  deptId: {
    type: Array,
    default: () => [] // 部门id
  },
  isGroup: {
    type: Boolean,
    default: false // 是否是集团账号
  }
});
const {
  isCompanyDetail,
  isDeptDetail,
  isBack,
  backUrl,
  isCam,
  companyIds,
  tagsId,
  companyOutId,
  deptId,
  positionType,
  isGroup
} = toRefs(props)

const scrollTop = ref(0);
const jobList = ref([]); // 职位列表
const loading = ref(false); // loading显示
const noMore = ref(false); // 没有更多职位
const noData = ref(false); // 没有数据

const companyId =  app.appContext.app._component.globalData.companyId // 公司社招id
const companyXzId =  app.appContext.app._component.globalData.xiaozhaoId // 公司校招id
const companyJtId =  app.appContext.app._component.globalData.companyNumber // 公司社招集团id
const scene = isCam.value === '' ? app.appContext.app._component.globalData.scene : isCam.value // 社招还是校招

// 职位数据参数
let jobFilter
// 职位数据参数
if (isGroup.value === true) {
  // 是集团账号
  jobFilter = reactive({ pageIndex: 1, pageSize: 5, orgNumber: "", orgGroupid: "", jobSource: 1, orgIds: "", workRegionIds: "", jobTypes: "", priorityMajors: "", customTags: "", workExperiences: "", minSalary: "", maxSalary: "", educations: "", orgScales: "", employmentTypes: "", orgNatures: "" });
} else {
  jobFilter = reactive({ pageIndex: 1, pageSize: 5, orgNumbers: "", jobSource: 2, campusParentDepartmentIds:"", orgIds: "", workRegionIds: "", jobTypes: "", priorityMajors: "", customTags: "", workExperiences: "", minSalary: "", maxSalary: "", educations: "", orgScales: "", employmentTypes: "", orgNatures: "" });
}

const myCompanyIds = []
companyIds.value.forEach(item => {
  myCompanyIds.push(item.id)
})
if(positionType.value !== 'ordinary') myCompanyIds.push(companyXzId);

// 配置项传进来的id
const myTagsId = tagsId.value.map((item) => {
  return item.id
})

const myCompanyOutId = companyOutId.value.map((item) => {
  return item.id
})

const myDeptId = deptId.value.map((item) => {
  return item.id
})

if (tagsId.value.length !== 0) {
  jobFilter.customTags = myTagsId
}
if (companyOutId.value.length !== 0) {
  jobFilter.campusParentDepartmentIds = myCompanyOutId
}
if (deptId.value.length !== 0) {
  if (scene === 'cam') {
    jobFilter.campusParentDepartmentIds = myDeptId
  } else {
    jobFilter.orgIds = myDeptId
  }
}

// 判断是校招还是社招
if (scene === 'cam') {
  jobFilter.orgNumbers = myCompanyIds.length === 0 ? companyXzId + '' : myCompanyIds 
  jobFilter.jobSource = 2
  delete jobFilter.orgIds
} else {
  if (isGroup.value === true) {
    jobFilter.orgGroupid = companyJtId
  } else {
    jobFilter.orgNumbers = myCompanyIds.length === 0 ? companyId : myCompanyIds
  }
  jobFilter.jobSource = 1
  delete jobFilter.campusParentDepartmentIds
}

const detailData = ref({}); // 公司详情数据
// 获取详情数据
async function getDetail() {
  if (isCompanyDetail.value === false) {
    return
  }
  const id = myCompanyIds.length !== 0 ? myCompanyIds[0] : (scene === 'cam' ? companyXzId : companyId)
  const data = {
    companyNumber: GetRequest('id') ? GetRequest('id') + '' : id,
    scene: scene,
    convertRequired: scene === 'social' ? false : true
  }
  const res = await useData("dscGetCompanyDetail", data)
  detailData.value = res.data.data.companyBase
}

const detailDeptData = ref({}); // 部门详情数据
// 获取部门详情数据
async function getDeptDetail() {
  if (isDeptDetail.value === false) {
    return
  }
  const data = {
    campusDepartmentId: GetRequest('id') ? GetRequest('id') : (myDeptId.length !== 0 ? myDeptId[0] : ''),
    departmentNumber: '',
  }
  const res = await useData("dscGetCampusDepartmentDetail", data)
  detailDeptData.value = res.data.data
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

// 获取职位标题列表数据
async function getJobtitle(extra = {}) {
  loading.value = true;
  const res = await useData("dscSearchGroupbyJobtitle", extra);
  const list = res.data.data.items
  let isEndPage = false

  let now_list = jobList.value;

  now_list = now_list.concat(list);
  jobList.value = now_list;
  loading.value = false;
 
  if (jobList.value.length == 0) noData.value = true;
  else noData.value = false;

  if (jobList.value.length > 0 && isEndPage) noMore.value = true;
  else noMore.value = false;
}

// 获取url的query
function GetRequest(name) {
	var url = window.location.href
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
} 

onMounted(async () => {
  if (scene === 'cam') {
    if (deptId.value.length === 0 && companyOutId.value.length === 0) {
      jobFilter.campusParentDepartmentIds = GetRequest('id') ? [GetRequest('id')] : '' // 校招部门

    }
    
  } else {
    if (deptId.value.length === 0) {
      jobFilter.orgIds =  GetRequest('id') ? [GetRequest('id')] : ''
    }
  }
  
  const mydata = JSON.parse(JSON.stringify(jobFilter)) 
  if (scene === 'cam') {
    if (deptId.value.length === 0 && companyOutId.value.length === 0) {
      mydata.campusParentDepartmentIds = GetRequest('id') ? [GetRequest('id')] : '' // 校招部门
    }
  } else {
    if (deptId.value.length === 0) {
      mydata.orgIds =  GetRequest('id') ? [GetRequest('id')] : ''
    } else {
      mydata.orgIds = myDeptId
    }
  }
  await getDetail()
  await getDeptDetail()
  if(positionType.value === 'ordinary'){
    await getJobList(mydata);
  } else{
    const mydata1 = JSON.parse(JSON.stringify(jobFilter)) 
    mydata1.orgDepartmentIds = GetRequest('id') ? GetRequest('id') + '' : ''
    await getJobtitle(mydata1);
  }

  uni.$on('filterJobList',async (postData) => {
    // 获取搜索组件参数
    const newData = JSON.parse(JSON.stringify(postData))
    // 登陆点公司
    jobFilter.workRegionIds = newData.workRegionIds // 工作地点
    jobFilter.jobTypes = newData.jobtype // 职位类别
    jobFilter.priorityMajors = newData.majors // 专业
    jobFilter.keyword = newData.keyword // 关键字
    jobFilter.customTags = newData.tags // 自定义标签
    jobFilter.educations = newData.education // 学历
    jobFilter.workExperiences = newData.working_time // 工作经验
    jobFilter.employmentTypes = newData.employment_type // 职位类型
    jobFilter.orgScales = newData.company_size // 公司规模
    if (newData.new_salary && newData.new_salary !== '' && newData.new_salary.length === 1) {
      const salayData = newData.new_salary[0].split(',')
      jobFilter.minSalary = parseInt(salayData[0])
      jobFilter.maxSalary = parseInt(salayData[1])
    }
    
    if (newData.company_type && newData.company_type !== '' && newData.company_type.length > 0) {
      let companyTypeData = []
      let newCompanyList = []
      newData.company_type.forEach(item => {
        const arr = item.split(';')
        companyTypeData = [...companyTypeData, ...arr]
      })
      companyTypeData.forEach(item => {
        newCompanyList.push(parseInt(item))
      })
      jobFilter.orgNatures = newCompanyList
    }

    if (scene === 'cam') {

      let arrCom = myCompanyOutId

      if (newData.orgDepartmentIds && newData.orgDepartmentIds.length !== 0) {
        arrCom = newData.orgDepartmentIds
      }
      let addDept = []

      if (newData.depts && newData.depts.length !== 0) {
        addDept = newData.depts
      }

      jobFilter.campusParentDepartmentIds = GetRequest('id') ? (arrCom.length == 0 ? [GetRequest('id')] : (addDept.length == 0 ? arrCom : addDept)) : (arrCom.length == 0 && addDept.length == 0 ? '' : (arrCom.length !== 0 && addDept.length !== 0 ? addDept : (arrCom.length == 0 ? addDept : arrCom))) // 校招部门
    } else {
      jobFilter.orgIds = GetRequest('id') ? [GetRequest('id')] : newData.orgDepartmentIds 
    }
    
    jobFilter.pageIndex = 1
    await getJobList(jobFilter)
  })
});

onReachBottom(async () => {
  // 上滑加载更多
  if (noMore.value) return;

  jobFilter.pageIndex++;
  const mydata = JSON.parse(JSON.stringify(jobFilter))
  // mydata.orgNumbers = ['CZ628039430']
  if(positionType.value === 'ordinary'){
    await getJobList(mydata);
  }else{
    await getJobtitle(mydata);
  }
});

onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});
// 返回公司列表页面
async function navClick() {
  await useRouter(backUrl.value, {
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
}
</script>

<style lang="scss">
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
.grace-dsc-job-list-dept-name {
  font-size: 40rpx;
  font-weight: bold;
  line-height: 70rpx;
}
.back {
  width: 100%;
  position: fixed;
  bottom: 0;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  color: #ffffff;
  left: 0;
  background: #999999;
  z-index: 99;
}
</style>

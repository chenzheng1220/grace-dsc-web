<template>
  <tui-sticky :scrollTop="scrollTop" :stickyTop="0" stickyHeight="76rpx">
    <template v-slot:header>
      <!-- 搜索组件按钮 -->
      <div class="grace-dsc-job-filter-base">
        <div class="jia_sou">
            <div class="inputm" @click="handleFilter(filterConfig[0])">
              <img src="https://webapp.zhaopin.com/2023/shh/gdnhn0112ZL81814/fang.png" alt="" style="width: 34rpx;height: 34rpx">
              <div class="" style="position: relative;flex: 1">
                <input type="text" v-model="filterPost.keyword" class="input1" placeholder="请搜索职位名称或职位描述" disabled="disabled" />
                <p class="dian"></p>
              </div>
              <img src="https://webapp.zhaopin.com/2023/shh/gdnhn0112ZL81814/ju.png" alt="">
              <span class="jiasou">搜索</span>
            </div>
            <p class="xuan" @click="handleFilter(filterConfig[0])">
              <span>筛选</span>
              <img src="https://webapp.zhaopin.com/2023/shh/gdnhn0112ZL81814/xia.png" alt="">
            </p>
        </div>
        <div class="jia-select-list" v-if="isSelectShow">
          <div class="jia-select" v-for="(item, index) in filterConfig.filter((key) => {
                  return key != 'keyword';
                })"
                :key="index"  @click="handleFilter(item)">
            <div class="jia-select-val">
              <input type="text" v-model="filterPostZh[item]" :placeholder="getZh(item)" disabled="disabled" />
            </div>
            <div>
              <img src="https://webapp.zhaopin.com/2023/shh/gdnhn0112ZL81814/xia.png" alt="">
            </div>
          </div>
        </div>
        
      </div>

      <tui-tips
        ref="toast"
        position="top"
        backgroundColor="#e04c24"
        color="#fff"
        size="30"
      ></tui-tips>

      <!-- 搜索组件弹窗 -->
      <tui-drawer mode="right" :visible="filterDrawerShow" @close="closeDrawer" class="my-dailog">
        <view class="job-filter-base__container">
           <tui-actionsheet  
              :show="showConfirm_ClearHistory" 
              :item-list="[{text: '确定',color: '#2B2B2B'}]" 
              tips="确认清空搜素历史吗？"
              color="#e04c24"
              @click="clearHistory" 
              @cancel="showConfirm_ClearHistory = !showConfirm_ClearHistory">
            </tui-actionsheet>
            
          <div class="job-filter-base__search-box">
            <!-- 搜索组件 -->
            <div class="real-search">
              <div class="real-search-input">
                <tui-searchbar
                  radius="20px"
                  height="72rpx"
                  backgroundColor="#ededed"
                  placeholder="请搜索职位名称或职位描述"
                  searchText=""
                  :cancel="false"
                  :value="filterPost.keyword"
                  @blur="handleBlur"
                ></tui-searchbar>
              </div>
              
              <span @click="cancelBtn">取消</span>
            </div>
            
            <!-- 历史搜索 -->
            <div
              class="job-filter-base__history-inner"
              v-if="filterHistory.length > 0"
            >
              <div class="job-filter-base__history-title-box">
                <div class="job-filter-base__history-title">历史搜索</div>
                <tui-icon
                  class="job-filter-base__history-clear"
                  name="delete"
                  size="30rpx"
                  color="#000000"
                  @click="showConfirm_ClearHistory = true;"
                ></tui-icon>
              </div>
              <span
                v-for="(historyItem, index) in filterHistory"
                :key="index"
                @click="setKeyword(historyItem)"
                class="job-filter-base__history-item"
                >{{ historyItem }}</span
              >
            </div>
           
          </div>

          
          <div class="job-filter-base__filter-inner" ref="filterInner">
            <!-- 搜索选项 -->
            <ul class="job-filter-base__filter-type">
              <li
                v-for="(filterItem, index) in filterConfig.filter((key) => {
                  return key != 'keyword';
                })"
                :key="index"
                class="job-filter-base__filter-type-item"
                :class="{ active: filterParam[filterItem] ? filterParam[filterItem].show : false}"
                @click="setFilterType(filterItem)"
              >
                {{ getFilterOptionName(filterItem) }}
                <tui-badge
                  type="danger"
                  absolute
                  :scaleRatio="0.8"
                  top="-6rpx"
                  v-if="filterPost[filterItem] && filterPost[filterItem].length > 0"
                  >{{ filterPost[filterItem].length }}</tui-badge
                >
              </li>
            </ul>

            <!-- 各选项数据 -->
            <scroll-view scroll-y="true" class="scroll-Y">
              <!--city-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.company.show }"
              >
                <li
                  v-for="(item, index) in filterParam.company.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('company', item.code),
                  }"
                  @click="setSelected('company', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>

              <!--city-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.city.show }"
              >
                <li
                  v-for="(item, index) in filterParam.city.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('city', item.code),
                  }"
                  @click="setSelected('city', item.code, item.name)"
                >
                  {{ item.name }}
                </li>
              </ul>

              <!--jobtype-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.jobtype.show }"
              >
                <li
                  v-for="(item, index) in filterParam.jobtype.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('jobtype', item.code),
                  }"
                  @click="setSelected('jobtype', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--depts-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.depts.show }"
              >
                <li
                  v-for="(item, index) in filterParam.depts.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('depts', item.code),
                  }"
                  @click="setSelected('depts', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--majors-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.majors.show }"
              >
                <li
                  v-for="(item, index) in filterParam.majors.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('majors', item.name),
                  }"
                  @click="setSelected('majors', item.name, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--tags-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.tags.show }"
              >
                <li
                  v-for="(item, index) in filterParam.tags.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('tags', item.name),
                  }"
                  @click="setSelected('tags', item.name, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--new_salary-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.new_salary.show }"
              >
                <li
                  v-for="(item, index) in filterParam.new_salary.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('new_salary', item.code),
                  }"
                  @click="setSelected('new_salary', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--education-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.education.show }"
              >
                <li
                  v-for="(item, index) in filterParam.education.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('education', item.code),
                  }"
                  @click="setSelected('education', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--working_time-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.working_time.show }"
              >
                <li
                  v-for="(item, index) in filterParam.working_time.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('working_time', item.code),
                  }"
                  @click="setSelected('working_time', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--employment_type-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.employment_type.show }"
              >
                <li
                  v-for="(item, index) in filterParam.employment_type.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('employment_type', item.code),
                  }"
                  @click="setSelected('employment_type', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--company_type-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.company_type.show }"
              >
                <li
                  v-for="(item, index) in filterParam.company_type.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('company_type', item.code),
                  }"
                  @click="setSelected('company_type', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
              <!--company_size-->
              <ul
                class="job-filter-base__filter-list city-list"
                :class="{ show: filterParam.company_size.show }"
              >
                <li
                  v-for="(item, index) in filterParam.company_size.list"
                  :key="index"
                  :class="{
                    selected: checkSelected('company_size', item.code),
                  }"
                  @click="setSelected('company_size', item.code, item.name)"
                  style="width: 47%;"
                >
                  {{ item.name }}
                </li>
              </ul>
            </scroll-view>
          </div>

          <div class="job-filter-base__button-bar">
            <button class="job-filter-base__button-reset reset-btn" @click="handleReset">
              重置
            </button>
            <button
              class="job-filter-base__button-submit sumbit-btn"
              @click="handleSubmit"
            >
              确认
            </button>
          </div>
        </view>
      </tui-drawer>
    </template>
  </tui-sticky>
</template>

<script setup>
import {
  onMounted,
  watch,
  ref,
  reactive,
  getCurrentInstance,
  toRefs
} from "vue";
import { onPageScroll } from "@dcloudio/uni-app";

import { getFilterOptionName, convertFilterPost } from "./filter";

const app = getCurrentInstance();
const { useData } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  isSticky: Boolean,
  filterConfig: {
    type: Array,
    default: () => ['company', 'city', 'jobtype', 'keyword'] // 需要配置的选项
  },
  maxSelectedCount: {
    type: Number,
    default: 1 // 最多选择几个
  },
  isSelectShow: {
    type: Boolean,
    default: false // 是否显示聚合下拉框
  },
  companyIds: {
    type: Array,
    default: () => [] // 
  },
  companyOutId: {
    type: Array,
    default: () => [] // 
  },
  isCam: {
    type: String,
    default: '' // 
  },
  isGroup: {
    type: Boolean,
    default: false // 是否是集团账号
  }
});
const {
  isSticky, filterConfig, maxSelectedCount, companyIds, companyOutId, isCam, isSelectShow, isGroup
} = toRefs(props)

const toast = ref(null);
const filterInner = ref(null);

const scrollTop = ref(0);
const filterDrawerShow = ref(false);
let filterHistory = ref([]);
const showConfirm_ClearHistory= ref(false);

const deptData = ref([])// 部门列表

let myCompanyIds = ''
if (companyIds.value.length && companyIds.value.length > 0) {
  myCompanyIds = companyIds.value[0].id
}
let myCompanyOutId = []

if (companyOutId.value.length && companyOutId.value.length > 0) {
  companyOutId.value.forEach(item => {
    myCompanyOutId.push(item.id)
  })
}

const companyId = myCompanyIds !== '' ? myCompanyIds : app.appContext.app._component.globalData.companyId // 公司社招id
const companyXzId = myCompanyIds !== '' ? myCompanyIds : app.appContext.app._component.globalData.xiaozhaoId // 公司社招id
const companyJtId =  app.appContext.app._component.globalData.companyNumber // 公司社招集团id
const scene = isCam.value === '' ? app.appContext.app._component.globalData.scene : isCam.value // 社招还是校招 

// 职位显示参数中文
const filterPostZh = reactive({
  company: '',
  depts: '',
  city: '',
  jobtype: '',
  majors: '',
  tags: '',
  new_salary: '',
  education: '',
  working_time: '',
  employment_type: '',
  company_type: '',
  company_size: ''
});

const filterPostZhList = reactive({
  company: [],
  city: [],
  jobtype: [],
  majors: [],
  depts: [],
  tags: [],
  new_salary: [],
  education: [],
  working_time: [],
  employment_type: [],
  company_type: [],
  company_size: []
});

// 职位列表参数
const filterPost = reactive({
  keyword: "",
  company: [],
  city: [],
  jobtype: [],
  majors: [],
  depts: [],
  tags: [],
  new_salary: [],
  education: [],
  working_time: [],
  employment_type: [],
  company_type: [],
  company_size: []
});

// 聚合数据1
const filterParam = reactive({
  company: {
    show: true,
    list: [],
  },
  depts: {
    show: true,
    list: []
  },
  city: {
    show: false,
    list: [],
  },
  jobtype:  {
    show: false,
    list: [],
  },
  majors: {
    show: false,
    list: []
  },
  tags: {
    show: false,
    list: []
  },
  keyword: {
    show: false,
    list: [],
  },
  new_salary: {
    show: false,
    list: []
  },
  education: {
    show: false,
    list: []
  },
  working_time: {
    show: false,
    list: []
  },
  employment_type: {
    show: false,
    list: []
  },
  company_type: {
    show: false,
    list: []
  },
  company_size: {
    show: false,
    list: []
  }
});

const deptParam = {
    rootCompanyId: companyXzId,
    companyOrDepartmentId: myCompanyOutId.length !== 0 ? myCompanyOutId[0] : '',
    includeAllChildren: false,
    format: 'list'
}

watch(filterDrawerShow, (val, preVal) => {
  if (val) {
    filterHistory.value = getHistory();

    setTimeout(resizeHeigth, 10);
    document.body.setAttribute("style", "overflow:hidden;");
  } else {
    document.body.removeAttribute("style");
  }
});

let allData = ''

let resId = GetRequest('id') ? [GetRequest('id')] : myCompanyOutId

const allParamXz = {
  city: {
    orgNumber: companyXzId,
    jobSource:  2,
    facetFields: ["JD_WORK_CITY_CODE"],
    orgDepartmentIds: resId,
    sortType: 1
  },
  company: {
    orgNumber: companyXzId,
    jobSource:  2,
    facetFields: ["SOU_XY_ORG_ID"],
    orgDepartmentIds: resId,
    sortType: 1
  },
  jobtype: {
    orgNumber: companyXzId,
    jobSource:  2,
    orgDepartmentIds: resId,
    facetFields: ["JD_JOB_LEVEL3"],
    sortType: 1
  },
  majors: {
    orgNumber: companyXzId,
    jobSource:  2,
    orgDepartmentIds: resId,
    facetFields: ["SOU_XY_PRIORITY_MAJORS"],
    sortType: 1
  },
  tags: {
    orgNumber: companyXzId,
    jobSource:  2,
    orgDepartmentIds: resId,
    facetFields: ["JD_BUSINESS_TAG"],
    sortType: 1
  }
}

const allParamSz = {
  city: {
    orgNumber: companyId,
    jobSource:  1,
    facetFields: ["JD_WORK_CITY_CODE"],
    sortType: 1
  },
  company: {
    orgNumber: companyId,
    jobSource:  1,
    facetFields: ["SOU_COMPANY_AUTOID"],
    sortType: 1
  },
  jobtype: {
    orgNumber: companyId,
    jobSource:  1,
    facetFields: ["JD_JOB_LEVEL3"],
    sortType: 1
  },
  majors: {
    orgNumber: companyId,
    jobSource:  1,
    facetFields: ["SOU_XY_PRIORITY_MAJORS"],
    sortType: 1
  },
  tags: {
    orgNumber: companyId,
    jobSource:  1,
    facetFields: ["JD_BUSINESS_TAG"],
    sortType: 1
  }
}

const allParamSzJt = {
  city: {
    orgGroupid: companyJtId,
    jobSource:  1,
    facetFields: ["JD_WORK_CITY_CODE"],
    orgIds: resId,
    orgNumber: "",
    sortType: 1
  },
  company: {
    orgGroupid: companyJtId,
    jobSource:  1,
    facetFields: ["SOU_COMPANY_AUTOID"],
    orgIds: resId,
    orgNumber: "",
    sortType: 1
  },
  jobtype: {
    orgGroupid: companyJtId,
    jobSource:  1,
    orgIds: resId,
    facetFields: ["JD_JOB_LEVEL3"],
    orgNumber: "",
    sortType: 1
  },
  majors: {
    orgGroupid: companyJtId,
    jobSource:  1,
    orgIds: resId,
    facetFields: ["SOU_XY_PRIORITY_MAJORS"],
    orgNumber: "",
    sortType: 1
  },
  tags: {
    orgGroupid: companyJtId,
    jobSource:  1,
    orgIds: resId,
    facetFields: ["JD_BUSINESS_TAG"],
    orgNumber: "",
    sortType: 1
  }
}

allData = scene === 'cam' ? JSON.parse(JSON.stringify(allParamXz)) : (isGroup.value === true ? JSON.parse(JSON.stringify(allParamSzJt)) : JSON.parse(JSON.stringify(allParamSz)))

const salaryData = [
  {
    name: '4K以下',
    code: '0000,4000'
  }, {
    name: '4K-6K',
    code: '4001,6000'
  }, {
    name: '6K-8K',
    code: '6001,8000'
  }, {
    name: '8K-10K',
    code: '8001,10000'
  }, {
    name: '10K-15K',
    code: '10001,15000'
  }, {
    name: '15K-25K',
    code: '15001,25000'
  }, {
    name: '25K-35K',
    code: '25001,35000'
  }, {
    name: '35K-50K',
    code: '35001,50000'
  }, {
    name: '50K以上',
    code: '50001,9999999'
  }
]

const companyTypeData = [
  {
    name: '国企',
    code: '1'
  }, {
    name: '外企',
    code: '2;3'
  }, {
    name: '合资',
    code: '4'
  }, {
    name: '民营',
    code: '5'
  }, {
    name: '上市公司',
    code: '9'
  }, {
    name: '股份制企业',
    code: '8'
  }, {
    name: '事业单位',
    code: '6;10'
  }, {
    name: '其他',
    code: '11;12;13;14;15;16;7'
  }
]

// 通用字典聚合数据
async function getdataNormalization(extra = {}, type) {
  if (extra.length === 0) {
    return
  }
  const res = await useData("dataNormalization", extra);

  // filterParam.city.list = cityArr;
  res.data.data.forEach(item => {
    if (item.config.dictName === 'new_salary') {
      filterParam[item.config.dictName].list = salaryData
    } else if (item.config.dictName === 'company_type') {
      filterParam[item.config.dictName].list = companyTypeData
    } else {
      item.data.forEach(list => {
        const obj = {
          name: list.label,
          code: list.value
        }
        filterParam[item.config.dictName].list.push(obj)
      })
    }
  })
}

// 获取url的query
function GetRequest(name) {
  var url = window.location.href
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

onMounted(async () => {
  if (GetRequest('id')) {
   filterPost.company.push(parseInt(GetRequest('id')))
   getOtherData('company')
  }
  let normalArr = []
  filterConfig.value.forEach(item => {
    if (item === 'company_type' || item === 'company_size' || item === 'education' || item === 'employment_type' || item === 'new_salary' || item === 'working_time' ) {
      let obj = {
        dictName: ''
      }
      obj.dictName = item
      normalArr.push(obj)
    }
  })
  document.querySelector('.tui-drawer-container').style.overflowY = 'hidden';
  // 调用城市数据
  await getdscGetSearchAggregation(allData.city, 'city');
  // 调用登陆点数据
  await getdscGetSearchAggregation(allData.company, 'company');
  // 职位类别数据
  await getdscGetSearchAggregation(allData.jobtype, 'jobtype');
  // 专业数据
  await getdscGetSearchAggregation(allData.majors, 'majors');
  // 自定义标签数据
  await getdscGetSearchAggregation(allData.tags, 'tags');
  // 部门数据
  await getDeptList(deptParam)
  await getdataNormalization(normalArr)
});

function getZh(en) {
  if (en === 'company') {
    return '分公司'
  } else if (en === 'city') {
    return '工作地点'
  } else if (en === 'jobtype') {
    return '职位类别'
  } else if (en === 'tags') {
    return '部门'
  } else if (en === 'majors') {
    return '优选专业'
  }
}

onPageScroll((e) => {
  // console.log("滚动距离为：" + e.scrollTop);
  if (props.isSticky) scrollTop.value = e.scrollTop;
});

// 获取园区下多个分类的公司
async function dscGetmultipleCategoryCompanylist(extra = {}, type) {
   const res = await useData("dscGetmultipleCategoryCompanylist", extra);
   console.log(res, 'dscGetmultipleCategoryCompanylist')
}

// 获取数据
async function getdscGetSearchAggregation(extra = {}, type) {
  let init = false // 初始化判断需要调用该聚合接口嘛
  filterConfig.value.forEach(item => {
    if (item === type) {
      init = true
    }
  })
  if (init === false) {
    return
  }
  const res = await useData("dscGetSearchAggregation", extra);

  if (res.data.code === 200) {
    
    
    if (type === 'city') {
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
      filterParam.city.list = cityArr;
    } else if (type === 'company') {
      // 登陆点列表
      // const companyList = res.data.data.itemMap !== null ? res.data.data.itemMap.SOU_COMPANY_ID : [];
      // const newcompanyList = []
      // companyList.forEach(item => {
      //   const companyobj = {
      //     count: '',
      //     name: '',
      //     code: '',
      //   }
      //   companyobj.count = item.count
      //   companyobj.name = JSON.parse(item.extend.companyInfo).orgName
      //   companyobj.code = JSON.parse(item.extend.companyInfo).orgId
      //   const summary = {...companyobj, ...JSON.parse(item.extend.companyInfo)}
      //   newcompanyList.push(summary)
      // })
      // filterParam.company.list = newcompanyList;
      const companyList = res.data.data.itemMap !== null ? (scene === 'cam' ? res.data.data.itemMap.SOU_XY_ORG_ID : res.data.data.itemMap.SOU_COMPANY_AUTOID) : []
      filterParam.company.list = companyList
    } else if (type === 'jobtype') {
      // 职位类别列表
      const jobtypeList = res.data.data.itemMap !== null ? res.data.data.itemMap.JD_JOB_LEVEL3 : []
      filterParam.jobtype.list = jobtypeList
    } else if (type === 'majors') {
      // 专业列表
      const majorsList = res.data.data.itemMap !== null ? res.data.data.itemMap.SOU_XY_PRIORITY_MAJORS : []
      filterParam.majors.list = majorsList
    } else if (type === 'tags') {
      // 专业列表
      const tagsList = res.data.data.itemMap !== null ? res.data.data.itemMap.JD_BUSINESS_TAG : []
      filterParam.tags.list = tagsList
    }  
  }
}

// 展示警告
function showWarnTips(msg) {
  let options = {
    msg: msg ? msg : `每个筛选条件最多只能选择${props.maxSelectedCount}个！`,
    duration: 1500,
  };
  toast.value.showTips(options);
}

function resizeHeigth() {
  uni.getSystemInfo({
    success: function (res) {
      const query = uni.createSelectorQuery();
      query
        .select(".job-filter-base__search-box")
        .boundingClientRect((data) => {
          filterInner.value.style.height =
            res.windowHeight - data.height + "px";
        })
        .exec();
    },
  });
}

function checkSelected(key, val) {
  const ary = filterPost[key];
  const index = ary.indexOf(val);
  if (index > -1) return true;
  else return false;
}

// 选中一个其他接口联动公共方法
async function getOtherData(key) {
  const dataNameArr = ['city', 'company', 'jobtype', 'majors', 'tags']
  let paramName = ''
  let paramNameTwo = ''
  if (key === 'city') {
    paramName = 'workRegionIds'
  } else if  (key === 'company') {
    if (scene === 'cam') {
      paramName = 'orgDepartmentIds'
    } else {
      if (isGroup.value === true) {
        paramName = 'orgIds'
      }
    }
  } else if  (key === 'jobtype') {
    paramName = 'jobTypes'
  } else if  (key === 'majors') {
    paramName = 'majors'
  } else if  (key === 'tags') {
    paramName = 'customTags'
  } else {
    return
  }
  
  // const normalArr = ['new_salary', 'education', 'working_time', 'employment_type', 'company_type', 'company_size']
  // if (key === 'education') {
  //   paramName = 'educations'
  // } else if  (key === 'employment_type') {
  //   paramName = 'employmentTypes'
  // } else if  (key === 'working_time') {
  //   paramName = 'workExperiences'
  // } else if  (key === 'company_size') {
  //   paramName = 'orgScales'
  // } else if  (key === 'new_salary') {
  //   paramName = 'minSalary'
  //   paramNameTwo = 'maxSalary'
  // } else if  (key === 'tags') {
  //   paramName = 'customTags'
  // }

  dataNameArr.forEach(item => {
    const newData = JSON.parse(JSON.stringify(allData[item]))
    if (item !== key) {
      // if (key === 'new_salary') {
      //   if (filterPost[key].length !== 0) {
      //     const salayData = filterPost[key][0].split(',')
      //     newData[paramName] = parseInt(salayData[0])
      //     newData[paramNameTwo] = parseInt(salayData[1])
      //   } else {
      //     delete newData[paramName]
      //     delete newData[paramNameTwo]
      //   }
      // } else {
        
      // }
      if (filterPost[key].length !== 0) {
        newData[paramName] = []
        filterPost[key].forEach(list => {
          newData[paramName].push(list)
        })
      } else {
        delete newData[paramName]
      }
      allData[item] = newData
      getdscGetSearchAggregation(newData, item);
    }
  })
  if (key === 'company') {
    deptParam.companyOrDepartmentId = ''
    deptParam.companyOrDepartmentId = filterPost['company'][0]
    getDeptList(deptParam)
  }
  // if (key === 'depts') {
  //   const newData = JSON.parse(JSON.stringify(allData['company']))
  //   if (filterPost[key].length !== 0) {
  //     newData['campusParentDepartmentIds'] = []
  //     filterPost[key].forEach(list => {
  //       newData['campusParentDepartmentIds'].push(list)
  //     })
  //   } else {
  //     delete newData['campusParentDepartmentIds']
  //   }
  //   allData['company'] = newData
  //   getdscGetSearchAggregation(newData, 'company');
  // }
}

// 选择选项
async function setSelected(key, val, name) {
  if (maxSelectedCount.value === 1) {
    const ary = filterPost[key];
    const index = ary.indexOf(val);
    if (index > -1) {
      //存在则删除
      filterPost[key].splice(index, 1);
      filterPostZhList[key].splice(index, 1);
    } else {
      if (filterPost[key].length === 1) {
        filterPost[key][0] = val
        filterPostZhList[key][0] = name
      } else {
        filterPost[key].push(val)
        filterPostZhList[key].push(name)
      }
    }
    
  } else {
    const ary = filterPost[key];
    const index = ary.indexOf(val);
    if (index > -1) {
      //存在则删除
      filterPost[key].splice(index, 1);
      filterPostZhList[key].splice(index, 1);
    } else {
      //不存在则添加
      if (ary.length < props.maxSelectedCount) {
        filterPost[key].push(val);
        filterPostZhList[key].push(name);
      } else {
        showWarnTips();
      }
    }
    filterPost[key] = filterPost[key];
    filterPostZhList[key] = filterPostZhList[key]
  }
  // 接口联动
  getOtherData(key)
}

// 清空历史
function clearHistory(){
  showConfirm_ClearHistory.value = false
  uni.setStorageSync("filter_history", "");
  filterHistory.value = [];
  setTimeout(resizeHeigth, 10);

}

// 部门列表
async function getDeptList(extra = {}) {
  let init = false // 初始化判断需要调用该聚合接口嘛
  filterConfig.value.forEach(item => {
    if (item === 'depts') {
      init = true
    }
  })
  if (init === false) {
    return
  }
  const res = await useData("dscGetSubCompanyAndDepartmentList", extra, app);
  const arr = []
  res.data.data.list.forEach(item => {
    const obj = {
      name: '',
      code: ''
    }
    obj.name = item.companyName
    obj.code = item.id
    arr.push(obj)
  })
  filterParam.depts.list = arr

  if (filterPost['depts'].length !== 0) {
    const arr = []
    filterPost['depts'].forEach(item => {
      filterParam['depts'].list.forEach(list => {
        if (item == list.code) {
          arr.push(item)
        }
      })
    })
    filterPost['depts'] = arr
  }
}


//新建历史记录
function setHistory(val) {

  if (val == null || val == "") return;
  let ary = [];
  const filter_history = uni.getStorageSync("filter_history");
  if (filter_history && filter_history != "") ary = JSON.parse(filter_history);

  //如果自己存在则先删除自己
  const index = ary.indexOf(val);
  if (index > -1) ary.splice(index, 1);

  ary.unshift(val);
  if (ary.length > 5) ary.length = 5;
  uni.setStorageSync("filter_history", JSON.stringify(ary));
}
function getHistory() {
  const filter_history = uni.getStorageSync("filter_history");
  if (filter_history && filter_history != "") return JSON.parse(filter_history);
  else return [];
}
function setKeyword(val) {
  filterPost.keyword = val;
}

/**
 * 切换当前显示的搜索类别
 */
function setFilterType(key) {
  if (key === 'depts') {
    if (filterConfig.value.includes('company') && filterPost['company'].length === 0) {
      let options = {
        msg: '请先选择一个分公司！',
        duration: 1500,
      };
      toast.value.showTips(options);
      return
    }
  }
  Object.keys(filterParam).forEach((item) => {
    if (item == key) filterParam[item].show = true;
    else filterParam[item].show = false;
  });
}

/**
 * 关键字搜索框失去焦点时触发更新filterPost数据
 */
function handleBlur(event) {
  filterPost.keyword = event.value;
}

/**
 * 打开搜索框
 */
function handleFilter(key) {
  filterDrawerShow.value = true;
  if (key !== "keyword") setFilterType(key);
}

function cancelBtn () {
  closeDrawer();
}

// 重置初始化
async function handleReset() {

  filterPost.keyword = ""
  filterPost.company = []
  filterPost.city = []
  filterPost.jobtype = []
  filterPost.majors = []
  filterPost.tags = []
  filterPost.depts = []
  filterPost.new_salary = []
  filterPost.education = []
  filterPost.working_time = []
  filterPost.employment_type = []
  filterPost.company_type = []
  filterPost.company_size = []
  closeDrawer();
  // 重置参数

  allData = scene === 'cam' ? JSON.parse(JSON.stringify(allParamXz)) : (isGroup.value === true ? JSON.parse(JSON.stringify(allParamSzJt)) : JSON.parse(JSON.stringify(allParamSz)))
  deptParam.companyOrDepartmentId = myCompanyOutId.length !== 0 ? myCompanyOutId[0] : ''
  // 调用城市数据
  getdscGetSearchAggregation(allData.city, 'city');
  // 调用登陆点数据
  getdscGetSearchAggregation(allData.company, 'company');
  // 职位类别数据
  getdscGetSearchAggregation(allData.jobtype, 'jobtype');
  // 专业数据
  getdscGetSearchAggregation(allData.majors, 'majors');
  // 自定义标签数据
  getdscGetSearchAggregation(allData.tags, 'tags');
  // 部门数据
  getDeptList(deptParam)
  // 获取部门列表参数


  uni.$emit("filterJobList", convertFilterPost(filterPost));
  filterZh(1)
}

// 确认按钮
function handleSubmit() {
  console.log(filterPost)
  setHistory(filterPost.keyword);
  uni.$emit("filterJobList", convertFilterPost(filterPost));
  filterZh()
  closeDrawer();
}

function closeDrawer() {
  filterDrawerShow.value = false;
}

function filterZh(type) {
  if (type === 1) {
    // type === 1 是重置
    filterPostZhList.company = []
    filterPostZhList.city = []
    filterPostZhList.jobtype = []
    filterPostZhList.majors = []
    filterPostZhList.tags = []
    filterPostZhList.depts = []
    filterPostZhList.new_salary = []
    filterPostZhList.education = []
    filterPostZhList.working_time = []
    filterPostZhList.employment_type = []
    filterPostZhList.company_type = []
    filterPostZhList.company_size = []
  }
  for (let key in filterPostZhList) {
    let word = ''
    filterPostZh[key] = ''
    filterPostZhList[key].forEach(item => {
      filterPostZh[key] = word + item
    })
  }
}
</script>

<style lang="scss">
$buttonColor: #eb5521; // 按钮颜色
$allColor: #54bbf0; // 总体颜色
$bgColor: #f3f3f3; // 背景颜色
.jia-select-list {
  width: 100%;
  display: flex;
  margin-top: 20rpx;
  justify-content: space-between;
  .jia-select {
    width: 100%;
    display: flex;
    background-color: #f5f5f5;
    border-radius: 40rpx;
    border: 1px solid #3b97e6;
    height: 80rpx;
    align-items: center;
    padding: 0 20rpx;
    margin: 0 10rpx;
    .jia-select-val {
      width: calc(100% - 40rpx);
      input {
        width: 100%;
        font-size: 26rpx;
      }
    }
  }
}

.reset-btn {
  width: 240rpx !important;
  background-color: #e4e4e4 !important;
  font-size: 26rpx;
  text-align: center;
  color: #3a3a3a;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 50rpx !important;
  margin-right: 10rpx;
}
.sumbit-btn {
  width: 460rpx !important;
  background-color: $allColor !important;
  font-size: 26rpx;
  text-align: center;
  color: #fff;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 50rpx !important;
}
.scroll-Y {
  background: #ffffff;
}
.real-search {
  width: 100%;
  display: flex;
  align-items: center;
  background: #54bbf0;
  padding-bottom: 10rpx;
  .real-search-input {
    flex: 1;
  }
  span {
    display: inline-block;
    font-size: 26rpx;
    color: #ffffff;
    padding-top: 20rpx;
    padding-right: 15rpx;
  }
}

.tui-searchbar__box {
  padding: 60rpx 20rpx 30rpx 20rpx !important;
  background: transparent !important;
}
.grace-dsc-job-filter-base {
  width: 650rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  background-color: #fff;
  margin: 0 auto;
  // display: flex;
  justify-content: space-evenly;

  .job-filter-base__button-text,
  .job-filter-base__button-text:after {
    background-color: transparent;
    border: none !important;
    font-size: 28rpx;
    color: #002d57;
    overflow: visible;
    padding-left: 4px;
    padding-right: 4px;
  }

  .job-filter-base__button-icon {
    line-height: normal;
    display: flex;
    align-items: center;
  }

  .button-text__active {
    background-color: #f5f5f5 !important;
  }

  .job-filter-base__button-menu {
    width: 710rpx;
    box-sizing: border-box;
    // background-color:red;
    border-radius: 20rpx;
  }
}

::v-deep .tui-sticky-fixed {
  width: 750rpx;
  margin: 0 auto;
  left: unset;
}
::v-deep .tui-selected-class {
  position: unset;
}
::v-deep .tui-dropdown-view {
  width: 710rpx;
  box-sizing: border-box;
  background-color: #f5f5f5 !important;
  border-radius: 20rpx;
  margin: 0 auto;
  // left:unset;
}

.tui-sticky-fixed {
  .grace-dsc-job-filter-base {
    border-radius: 0 0 20rpx 20rpx;
    width: 750rpx;
    margin-left: -10px;
    border-right: 1px solid #eaecef;
    border-left: 1px solid #eaecef;
    border-bottom: 1px solid #eaecef;
    box-shadow: 0 2px 5px 1px rgba(117, 110, 123, 0.16);
  }
}

.job-filter-base__container {
  width: 750rpx;
  height: 100%;
  background: $bgColor;
  overflow: hidden;
}
.job-filter-base__button-bar {
  width: 750rpx;
  height: 161rpx;
    margin: 0 auto;
    position: fixed;
    bottom: 0px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-top: 1rpx solid #e4e4e4;
    font-size: 20rpx;
}
.job-filter-base__history-inner {
  width: 750rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 8px 22px 8px 22px;
  border-radius: 30rpx;
  margin-top: -20rpx;
  margin-bottom: 20rpx;
}
.job-filter-base__history-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.job-filter-base__history-title {
  font-weight: bold;
  font-size: 30rpx;
}
.job-filter-base__history-clear {
  font-size: 30rpx;
  color: #9b9b9b !important;
}
.job-filter-base__history-item {
  margin-left: 4px;
  margin-right: 4px;
  background-color: $bgColor;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 22rpx;
  line-height: 70rpx;
}
.job-filter-base__filter-inner {
  display: flex;
  border-top-right-radius: 25rpx;
  overflow: hidden;
  background: #f5f5f5;
  
}
.job-filter-base__filter-type {
  width: 200rpx;
  box-sizing: border-box;
  background-color: #ededed;
  padding: 10px 0px !important;
  list-style: none;
  padding: 0;
  outline: 0;
}
.job-filter-base__filter-type-item {
  text-align: center;
  line-height: 80rpx;
  font-size: 26rpx;
  // font-weight: bold;
  position: relative;
}
.job-filter-base__filter-type-item.active {
  color: $allColor;
  font-size: 28rpx;
}
.job-filter-base__filter-list {
  width: 600rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 10px !important;
  line-height: 70rpx;
  list-style: none;
  padding: 0;
  outline: 0;
  display: none;
  overflow: hidden;
}
.job-filter-base__filter-list.show {
  display: unset;
  li {
    box-sizing: border-box;
    margin: 5rpx;
  }
  li.selected {
    background-color: #ebf1ff !important;
    border: 1rpx solid $allColor !important;
    color: $allColor !important;
  }
}
.job-filter-base__filter-list.city-list.show {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 200rpx !important;
  li {
    width: 22%;
    height: 61rpx;
    line-height: 61rpx;
    font-size: 22rpx;
    color: #3a3a3a;
    background-color: #f5f5f5;
    text-align: center;
    overflow: hidden;
    border-radius: 50rpx;
    margin-bottom: 20rpx;
    margin-right: 6rpx;
    box-sizing: content-box;
    border: 2rpx #f5f5f5 solid;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 10rpx;
    box-sizing: border-box;
  }
}
.job-filter-base__filter-list.jobtype-list.show {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  li {
    // width: 30%;
    width: 47%;
    height: 61rpx;
    line-height: 61rpx;
    font-size: 22rpx;
    color: #3a3a3a;
    background-color: #f5f5f5;
    text-align: center;
    overflow: hidden;
    border-radius: 50rpx;
    margin-bottom: 20rpx;
    margin-right: 6rpx;
    box-sizing: content-box;
    border: 2rpx #f5f5f5 solid;
  }
}
.job-filter-base__button-reset,
.job-filter-base__button-submit,
.job-filter-base__button-reset::after,
.job-filter-base__button-submit::after {
  border: unset;
  border-radius: unset;
}

.job-filter-base__button-reset {
  width: 50%;
  box-sizing: border-box;
}
.job-filter-base__button-submit {
  width: 50%;
  box-sizing: border-box;
}
.jia_sou {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inputm {
  width: 530rpx;
  height: 80rpx;
  background-color: #f5f5f5;
  border-radius: 50rpx;
  border: 1px solid #3b97e6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20rpx;
  margin-right: 20rpx;
  padding-right: 10rpx;
}

.input1 {
  background-color: #f5f5f5;
  border: none;
  appearance: none;
  outline: none;
  font-size: 26rpx;
  color: #bfbfc0;
  /* border-right: 2px solid #bfbfc0; */
  margin-left: 10rpx;
  width: 363rpx;
}

.inputm span {
  color: $allColor;
  font-size: 26rpx;
  width: 206rpx;
  text-align: center;
  display: inline-block;
}

.xuan {
  font-size: 26rpx;
  color: #3a3a3a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.xuan span {
  margin-right: 10rpx;
}
div {
  box-sizing: border-box;
}

</style>

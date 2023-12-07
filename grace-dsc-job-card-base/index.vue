<template>
  <div class="grace-dsc-job-card-base" :class="jobItem.number">
    <div class="job-card-base__title">
       <div class="job-card-base__job-title">{{ topMes === 'title' ? jobItem.job.title : (topMes === 'dept' ? (scene === 'cam' ? jobItem.company.campusOrgName + '-' + jobItem.company.campusDepartment.name : jobItem.company.slaveDisplayOrgName) : topMes === 'company' ? (scene === 'cam' ? jobItem.company.campusOrgName : jobItem.company.slaveDisplayOrgName) : null ) }}
       </div>
       <div class="job-card-base__job-city" v-if="isSalary !== 'none'">
          {{ isSalary !== 'none' ? jobItem.job[isSalary] : '' }}
        </div>
    </div>
    <div class="job-card-base__content" @click="handleClick(jobItem.job)">
      <div class="job-card-base__left">
       
        <ul>
          <li v-for="item in label" :key="item" v-show="jobItem.job[item] && jobItem.job[item] !== null && jobItem.job[item] !== '' || jobItem.job[item] === 0"
          >
            <span v-if="item !== 'skillTagInfos' && item !== 'jobCategories'">{{ item === 'quantity' ? (jobItem.job.quantity === 0 ? '若干' : jobItem.job[item] + '人') : jobItem.job[item] }} </span>
            <div style="display: inline-block" v-if="item === 'jobCategories' && jobItem.job[item] && jobItem.job[item].length !== 0">
              <span  v-for="list in jobItem.job[item]" :key="list">{{ list }}</span>
            </div>
            <div style="display: inline-block" v-if="item === 'skillTagInfos' && jobItem.job[item] && jobItem.job[item].length !== 0">
              <span v-for="list in jobItem.job[item]" :key="list.id">{{ list.name }}</span>
            </div>
          </li>
        </ul>
        <div class="job-card-base__company-name">{{ bottomMes === 'title' ? jobItem.job.title : (bottomMes === 'onlyDept' ? jobItem.company.campusDepartment.name : (bottomMes === 'dept' ? (scene === 'cam' ? jobItem.company.campusOrgName + '-' + jobItem.company.campusDepartment.name : jobItem.company.slaveDisplayOrgName) : bottomMes === 'company' ? (scene === 'cam' ? jobItem.company.campusOrgName : jobItem.company.slaveDisplayOrgName) : null )) }}</div>
      </div>
      <div class="job-card-base__right">
        <button class="job-card-base__job-apply" >
          立即投递
        </button>
      </div>
    </div>  
  </div>
  <!-- 职位详情弹窗 -->
  <tui-bottom-popup  :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="popup">
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="job-card-base__detail-hei">
      <div class="grace-dsc-job-card-base job-card-base__detail">
        <div class="job-card-base__title">
          <div class="job-card-base__job-title">{{ topMes === 'title' ? jobItem.job.title : (topMes === 'dept' ? (scene === 'cam' ? jobItem.company.campusOrgName + '-' + jobItem.company.campusDepartment.name : jobItem.company.slaveDisplayOrgName) : topMes === 'company' ? (scene === 'cam' ? jobItem.company.campusOrgName : jobItem.company.slaveDisplayOrgName) : null ) }}</div>
          <div class="job-card-base__job-city" v-if="isSalary !== 'none'">
            {{ isSalary !== 'none' ? jobItem.job[isSalary] : '' }}
          </div>
        </div>
        <div class="job-card-base__content" >
          <div class="job-card-base__left">
          
            <ul>
              <li v-for="item in label" :key="item" v-show="jobItem.job[item] && jobItem.job[item] !== null && jobItem.job[item] !== '' || jobItem.job[item] === 0"
              >
                <span v-if="item !== 'skillTagInfos' && item !== 'jobCategories'">{{ item === 'quantity' ? (jobItem.job.quantity === 0 ? '若干' : jobItem.job[item] + '人') : jobItem.job[item] }} </span>
                <div style="display: inline-block" v-if="item === 'jobCategories' && jobItem.job[item] && jobItem.job[item].length !== 0">
                  <span  v-for="list in jobItem.job[item]" :key="list">{{ list }}</span>
                </div>
                <div style="display: inline-block" v-if="item === 'skillTagInfos' && jobItem.job[item] && jobItem.job[item].length !== 0">
                  <span v-for="list in jobItem.job[item]" :key="list.id">{{ list.name }}</span>
                </div>
              </li>
            </ul>
            <div class="job-card-base__company-name">{{ bottomMes === 'title' ? jobItem.job.title : (bottomMes === 'onlyDept' ? jobItem.company.campusDepartment.name : (bottomMes === 'dept' ? (scene === 'cam' ? jobItem.company.campusOrgName + '-' + jobItem.company.campusDepartment.name : jobItem.company.slaveDisplayOrgName) : bottomMes === 'company' ? (scene === 'cam' ? jobItem.company.campusOrgName : jobItem.company.slaveDisplayOrgName) : null )) }}</div>
          </div>
        </div>
      </div>
      <div class="job-card-base__detail-content">
        <div class="job-card-base__job-title" v-if="jobDeatil && jobDeatil.job && jobDeatil.job.detail && jobDeatil.job.detail !== '' && jobDeatil.job.detail !== null">
          岗位描述
        </div>
        <div v-html="jobDeatil && jobDeatil.job ? jobDeatil.job.detail : ''">
        </div>
        <div class="job-card-base__detail-btn">
          <span @click="toJob">
              投递简历
          </span>
        </div>
      </div>
    </scroll-view>
  </tui-bottom-popup>
  <tui-modal :show="modal" custom padding="15rpx 15rpx" @cancel="colseIt">
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="job-card-base__detail-hei">
      <div class="grace-dsc-job-card-base job-card-base__detail">
        <div class="job-card-base__title">
          <div class="job-card-base__job-title">{{ topMes === 'title' ? jobItem.job.title : (topMes === 'dept' ? (scene === 'cam' ? jobItem.company.campusOrgName + '-' + jobItem.company.campusDepartment.name : jobItem.company.slaveDisplayOrgName) : topMes === 'company' ? (scene === 'cam' ? jobItem.company.campusOrgName : jobItem.company.slaveDisplayOrgName) : null ) }}</div>
          <div class="job-card-base__job-city" v-if="isSalary !== 'none'">
            {{ isSalary !== 'none' ? jobItem.job[isSalary] : '' }}
          </div>
        </div>
        <div class="job-card-base__content" >
          <div class="job-card-base__left">
          
            <ul>
              <li v-for="item in label" :key="item" v-show="jobItem.job[item] && jobItem.job[item] !== null && jobItem.job[item] !== '' || jobItem.job[item] === 0"
              >
                <span v-if="item !== 'skillTagInfos' && item !== 'jobCategories'">{{ item === 'quantity' ? (jobItem.job.quantity === 0 ? '若干' : jobItem.job[item] + '人') : jobItem.job[item] }} </span>
                <div style="display: inline-block" v-if="item === 'jobCategories' && jobItem.job[item] && jobItem.job[item].length !== 0">
                  <span  v-for="list in jobItem.job[item]" :key="list">{{ list }}</span>
                </div>
                <div style="display: inline-block" v-if="item === 'skillTagInfos' && jobItem.job[item] && jobItem.job[item].length !== 0">
                  <span v-for="list in jobItem.job[item]" :key="list.id">{{ list.name }}</span>
                </div>
              </li>
            </ul>
            <div class="job-card-base__company-name">{{ bottomMes === 'title' ? jobItem.job.title : (bottomMes === 'onlyDept' ? jobItem.company.campusDepartment.name : (bottomMes === 'dept' ? (scene === 'cam' ? jobItem.company.campusOrgName + '-' + jobItem.company.campusDepartment.name : jobItem.company.slaveDisplayOrgName) : bottomMes === 'company' ? (scene === 'cam' ? jobItem.company.campusOrgName : jobItem.company.slaveDisplayOrgName) : null )) }}</div>
          </div>
        </div>
      </div>
      <div class="job-card-base__detail-content">
        <div class="job-card-base__job-title" v-if="jobDeatil && jobDeatil.job && jobDeatil.job.detail && jobDeatil.job.detail !== '' && jobDeatil.job.detail !== null">
          岗位描述
        </div>
        <div v-html="jobDeatil && jobDeatil.job ? jobDeatil.job.detail : ''">
        </div>
        <div class="job-card-base__detail-btn-s">
          <span @click="toJob">
              投递简历
          </span>
        </div>
      </div>
    </scroll-view>
  </tui-modal>
</template>

<script setup>
import { toRefs, ref, onMounted, computed, getCurrentInstance } from "vue";

const app = getCurrentInstance();
const { useData, usePageData, useRouter, useSensorsTrick } = app.appContext.config.globalProperties.grace;

const props = defineProps({
  jobItem: Object,
  label: {
    type: Array,
    default: () => ['cityName', 'quantity', 'needMajor'] // 中间标签显示内容
  },
  topMes: {
    type: String,
    default: 'title' // 顶部显示信息
  },
  bottomMes: {
    type: String,
    default: 'company' // 底部显示信息
  },
  isSalary: {
    type: String,
    default: 'salary60' // 显示地址还是薪资
  },
  isShowDetail: {
    type: Boolean,
    default: false // 是否显示职位详情
  },
  isTc: {
    type: String,
    default: 'bot' // 是否显示职位详情
  },
  isCam: {
    type: String,
    default: '' // 
  }
});

const { jobItem, label, topMes, bottomMes, isSalary, isShowDetail, isCam, isTc } = toRefs(props);

const scene = isCam.value === '' ? app.appContext.app._component.globalData.scene : isCam.value  // 社招还是校招

const modal = ref(false)

const openIt = () => {
  modal.value = true
}

const colseIt = () => {
  modal.value = false
}

async function handleClick({ jobNumber }) {
  await useSensorsTrick ('$AppClick',{}); 
  if (isShowDetail.value === true) {
    getJobDetail({ jobNumber })
  } else {
    const h5Url = `https://m.zhaopin.com/jobs/${jobNumber}`;

    await useRouter(h5Url, {
      target: "outer",
      nativeHref: `/position/native/positiondetail?number=${jobNumber}&srccode=502001&businessPlatformLabel=4&businessTagId=special`,
    });
  }
  
}

const popupShow =  ref(false)
const jobDeatil = ref()
const scrollTop = ref(0)
const isShowDept = (jobItem, type) => {
  let title
  if (jobItem.company.campusDepartment && jobItem.company.campusDepartment.name && jobItem.company.campusDepartment.name !== null && jobItem.company.campusDepartment.name !== '') {
    if (type === 'onlyDept') {
      title = jobItem.company.campusDepartment.name
    } else {
      title = jobItem.company.campusOrgName + '-' + jobItem.company.campusDepartment.name
    }
    
  } else {
    title = jobItem.company.campusOrgName
  }
  return title
}
// 获取职位详情数据
async function getJobDetail({ jobNumber }) {
  if (isTc.value === 'center') {
    modal.value = true
  } else {
    popupShow.value = true
  }
  
  const data = {
    jobNumber: jobNumber,
    pc: false
  }
  const res = await useData("dscGetJobDetail", data)
  jobDeatil.value = res.data.data
}

// 投递简历
const toJob = () => {
  const h5Url = scene === 'cam' ? jobDeatil.value.job.deliveryPath : jobDeatil.value.job.url
  useRouter(h5Url, {
      target: "outer"
  });
}

// 关闭详情弹窗
const popup = () =>{
  if (isTc.value === 'center') {
    modal.value = false
  } else {
    popupShow.value = false
  }
}

/**
 * 职位标签展示统一处理函数
 */
function showLabel(name) {
  let res = props.jobItem[name];
  if (name === "recruitNumber") {
    //招聘人数
    if (res === 999) res = "若干";
    else res = `${res}人`;
  }
  return res;
}

onMounted(() => {

});
</script>

<style lang="scss">
$buttonTextColor: #ffffff; // 按钮文字颜色
$allColor: #54bbf0; // 总体颜色


.grace-dsc-job-card-base { 
  border-radius: 20rpx;
  background-color: #fff;
  padding: 44rpx 0rpx;
  margin-bottom: 20rpx;
  border-bottom: 1px solid #eeeeee;
  .job-card-base__title {
    width: 100%;
    display: flex;
    .job-card-base__job-title {
      font-size: 32rpx;
      width: 400rpx; //职位名称最大显示宽度
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
    .job-card-base__job-city {
      font-size: 26rpx;
      color: $allColor;
    }
  }
  .job-card-base__content {
    display: flex;
    justify-content: space-between;
    .job-card-base__left {
      flex: 1;
      
      ul {
        font-size: 20rpx;
        color: #717171;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 22rpx;
        list-style: none;
        padding: 0;
        outline: 0;
        flex-wrap: wrap;
        
        li {
          margin-bottom: 3px;
          span {
            display: inline-block;
            padding: 10rpx;
            background-color: #f5f5f5;
            border-radius: 12rpx;
            margin-right: 8rpx;
          }
        }

        li:nth-child(n + 2) {
          // margin-left: 8rpx;
        }
      }

      .job-card-base__company-name {
        font-size: 26rpx;
        color: #717171;
        margin-top: 22rpx;
      }
    }

    .job-card-base__right {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 20rpx;

      .job-card-base__job-apply {
        background-color: $allColor;
        border-radius: 50px;
        color: $buttonTextColor;
        border-radius: 30rpx;
        padding: 0 26rpx;
        font-size: 24rpx;
        line-height:65rpx;
        margin-top: 25px;
      }
    }
  }
  
}
// 职位详情弹窗样式
.job-card-base__detail {
  padding: 40rpx 25rpx 20rpx 25rpx;
  border-radius: 0;
}
.job-card-base__detail-hei {
  height: 1300rpx;
}
.job-card-base__detail-content {
  width: 100%;
  padding: 10rpx 25rpx 200rpx 25rpx;
  font-size: 26rpx;
  color: #666666;
  text-align: justify;
  .job-card-base__job-title {
    font-size: 32rpx;
    width: 400rpx; //职位名称最大显示宽度
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 20rpx;
  }
  .job-card-base__detail-btn {
    width: 750rpx;
    position: fixed;
    left:0;
    bottom: 0;
    box-shadow: 2px -4px 12px#d9d9d9 ;
    -moz-box-shadow: 2px -4px 12px #d9d9d9 ;
    -webkit-box-shadow: 2px -4px 12px #d9d9d9 ;
    border-top-left-radius: 25rpx;
    border-top-right-radius: 25rpx;
    padding: 30rpx;
    z-index: 1222;
    background: #ffffff;
    span {
      background-color: $allColor;
      border-radius: 50px;
      color: $buttonTextColor;
      border-radius: 30rpx;
      font-size: 28rpx;
      line-height:65rpx;
      margin-top: 25px;
      display: block;
      width: 100%;
      text-align: center;
    }
  }
  .job-card-base__detail-btn-s {
    width: 100%;
    position: fixed;
    left:0;
    bottom: 0;
    border-top-left-radius: 25rpx;
    border-top-right-radius: 25rpx;
    padding: 30rpx;
    z-index: 1222;
    background: #ffffff;
    text-align: center;
    border-radius: 0.75rem;
    span {
      background-color: $allColor;
      border-radius: 50px;
      color: $buttonTextColor;
      border-radius: 30rpx;
      font-size: 28rpx;
      line-height:65rpx;
      margin-top: 25px;
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}
div {
  box-sizing: border-box;
}
</style>

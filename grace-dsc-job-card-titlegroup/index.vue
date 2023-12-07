<template>
  <div class="grace-dsc-job-card-titlegroup">
    <tui-collapse :current="currentIndex" :disabled="disabled" @click="change" :bgColor="bgColor" :hdBgColor="hdBgColor" :bdBgColor="bdBgColor" :height="height" :arrow="arrow" :arrowColor="arrowColor">
  		<template v-slot:title>
  			<tui-list-cell>{{ jobItem.jobTitle }}</tui-list-cell>
  		</template>
  		<template v-slot:content>
  			<div class="grace-dsc-function-spread-right__cont-jobdetail">
          <div>
            <p v-html="jobDetail"></p>
          </div>
        </div>
        <div class="grace-dsc-function-spread-right__cont-joblist">
          <span v-for="(item,i) in jobItem.multipleJobCitys" :key="i" @click="handleClick(item.jobNumber)">{{ item.cityName }}</span>
        </div>
  		</template>
  	</tui-collapse>
  </div>
</template>

<script setup>
import { toRefs, ref, onMounted, computed, getCurrentInstance, reactive } from "vue";

const app = getCurrentInstance();
const {
  useData,
  useRouter,
  useSensorsTrick
} = app.appContext.config.globalProperties.grace;

const props = defineProps({
  jobItem: Object,
  current: {
    type: Number,
    default: -1
  },
  bgColor: String,
  hdBgColor: String,
  bdBgColor: String,
  height: String,
  disabled: Boolean,
  arrow: {
    type: Boolean,
    default: true
  },
  arrowColor: String,
  fieldTitle: String
});

const { jobItem, current, bgColor, hdBgColor, height, disabled, arrow, arrowColor, fieldTitle } = toRefs(props);
const scene = app.appContext.app._component.globalData.scene; // 社招还是校招
async function handleClick({ jobNumber }) {
  await useSensorsTrick ('$AppClick',{}); 
  const h5Url = null;
  
  if(scene !== 'cam') h5Url = `https://m.zhaopin.com/jobs/${jobNumber}`;
  else h5Url = `https://campus1.zhaopin.com/resume/checkintoapp?pid=${jobNumber}`;

  await useRouter(h5Url, {
    target: "outer",
    nativeHref: `/position/native/positiondetail?number=${jobNumber}&srccode=502001&businessPlatformLabel=4&businessTagId=special`,
  });
}

const jobFilter = reactive({ jobNumber: null, pc: false});
const jobDetail = ref(null);
// const jobDetail1 = ref(null);
// const jobDetail2 = ref(null);
async function getJobDetail(extra = {}) {
  const res = await useData("dscGetJobDetail", extra);
  const list = res.data.data.job.detail;
  jobDetail.value = list
  // jobDetail1.value = list.substring(list.indexOf("职位描述") + 8,list.indexOf("职位要求"));  // 拆出对应内容
  // jobDetail2.value = list.substring(list.indexOf("职位要求") + 8);
}
const currentIndex = ref(current.value);
if(jobItem.value.jobTitle == fieldTitle.value){
  currentIndex.value = 0
  jobFilter.jobNumber = jobItem.value.multipleJobCitys[0].jobNumber;
  if(!jobDetail.value){
    getJobDetail(jobFilter);
  }
}
function change(e) {
  jobFilter.jobNumber = jobItem.value.multipleJobCitys[0].jobNumber;
  if(!jobDetail.value){
    getJobDetail(jobFilter);
  }
  currentIndex.value = currentIndex.value == e.index ? -1 : e.index
}
</script>

<style lang="scss">
$buttonTextColor: rgb(149, 103, 64); // 按钮文字颜色

.grace-dsc-job-card-titlegroup {
  .grace-dsc-function-spread-right__cont-jobdetail{
    padding: 25rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 15rpx;
    img{
      width: 32rpx;
      margin-right: 10rpx;
      margin-top: 3rpx;
    }
    p{
      font-size: 28rpx;
      line-height: 40rpx;
    }
    span{
      font-size: 28rpx;
      color: $buttonTextColor;
      font-weight: bold;
      line-height: 40rpx;
    }
  }
  .grace-dsc-function-spread-right__cont-joblist{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 40rpx;
    span{
      border-radius: 4px;
      border-color: $buttonTextColor;
      border-style: solid;
      border-width: 1px;
      position: relative;
      flex-shrink: 0;
      transform-origin: 0% 0% 0px;
      margin-right: 12px;
      margin-bottom: 10px;
      padding: 0px 15rpx;
      height: 60rpx;
      font-size: 30rpx;
      color: $buttonTextColor;
      justify-content: center;
      text-align: center;
      align-items: center;
      white-space: pre-wrap;
      word-break: normal;
      line-height: normal;
      display: flex;
    }
  }
}
</style>

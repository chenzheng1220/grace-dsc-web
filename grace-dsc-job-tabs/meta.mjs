export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '职位-选项卡',
  categories: ['职位'], 
  screenshot: 'https://webapp.zhaopin.com/2023/shh/marti0307ZL21287/job_tabcards.png',
  slots: [{
    name: 'item',
    data: 'jobItem',
    maxCount: 1
  }],
  props: {
    tabType: {
      label: '聚合数据类型',
      type: 'string',
      default: 'JD_JOB_LEVEL3',
      options: [
        {
          name: '职位类别',
          value: 'JD_JOB_LEVEL3'
        },
        {
          name: '公司列表',
          value: 'SOU_COMPANY_ID'
        },
        {
          name: '优选专业',
          value: 'SOU_XY_PRIORITY_MAJORS'
        },
        {
          name: '工作地点',
          value: 'JD_WORK_CITY_CODE'
        },
        {
          name: '标签列表',
          value: 'JD_BUSINESS_TAG'
        }
      ]
    },
    isMore: {
      label: '是否显示更多按钮',
      type: 'boolean',
      required: false,
      default: false
    },
    firstList:{
      type: 'memberType[]',
      label: '优先字段',
      memberType: {
        name: {
          label: '字段名称',
          type: 'string',
          required: true
        }
      }
    }
  }
}

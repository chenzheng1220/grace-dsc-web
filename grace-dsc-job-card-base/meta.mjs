export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '职位卡片',
  categories: ['职位'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/jobcard.30148ac6.png',
  dependencies: [],
  parent: ['grace-dsc-job-list-base:item','grace-dsc-job-tabs:item'],
  slotData: ['jobItem', 'isCam'],
  props: {
    label:{
      type: 'string[]', // 类型为 array 时，并且可枚举时展示多选选择器
      label: '职位标签',
      default:['cityName', 'quantity', 'needMajor'],
      options: [{
        name: '工作地点',
        value: 'cityName'
      },{
        name: '招聘人数',
        value: 'quantity'
      },{
        name: '优选专业',
        value: 'needMajor'
      },{
        name: '学历',
        value: 'minEducationName'
      },{
        name: '岗位类型',
        value: 'jobTypeName'
      },{
        name: '工作经验',
        value: 'workingExpName'
      },{
        name: '薪资',
        value: 'salary'
      },{
        name: '技能标签',
        value: 'skillTagInfos'
      }]
    },
    topMes: {
      label: '第一行内容显示',
      type: 'string',
      default: 'title',
      options: [
        {
          name: '职位标题',
          value: 'title'
        },
        {
          name: '公司名称',
          value: 'company'
        },
        {
          name: '公司名称+部门名称',
          value: 'dept'
        }
      ]
    },
    bottomMes: {
      label: '最后一行内容显示',
      type: 'string',
      default: 'company',
      options: [
        {
          name: '职位标题',
          value: 'title'
        },
        {
          name: '公司名称',
          value: 'company'
        },
        {
          name: '公司名称+部门名称',
          value: 'dept'
        },
        {
          name: '部门名称',
          value: 'onlyDept'
        }
      ]
    },
    isSalary: {
      label: '显示薪资或地点',
      type: 'string',
      default: 'salary60',
      options: [
        {
          name: '薪资',
          value: 'salary60'
        },
        {
          name: '地点',
          value: 'cityName'
        },
        {
          name: '都不显示',
          value: 'none'
        }
      ]
    },
    isShowDetail: {
      label: '是否显示职位详情',
      type: 'boolean',
      default: false
    },
    isTc:  {
      label: '弹窗位置',
      type: 'string',
      default: 'bot',
      options: [
        {
          name: '底部',
          value: 'bot'
        },
        {
          name: '中间',
          value: 'center'
        }
      ]
    }
  }
}

export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '职位标题分组',
  categories: ['职位'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/titlegroup.4edc1d94.png',
  parent: ['grace-dsc-job-list-base:item'],
  slotData: ['jobItem'],
  dependencies: [],
  props: {
    title: {
      label: '默认打开的职位名称',
      type: 'string',
      default: ''
    },
    bgColor: {
      label: 'collapse背景颜色',
      type: 'string',
      default: 'transparent'
    },
    hdBgColor: {
      label: 'collapse-head 背景颜色',
      type: 'string',
      default: '#fff'
    },
    bdBgColor: {
      label: 'collapse-body 背景颜色',
      type: 'string',
      default: 'transparent'
    },
    height: {
      label: 'collapse-body实际高度 open时使用',
      type: 'string',
      default: 'auto'
    },
    current: {
      label: '当前索引',
      type: 'number',
      default: -1
    },
    disabled: {
      label: '是否禁用',
      type: 'boolean',
      default: false
    },
    arrow: {
      label: '是否带箭头',
      type: 'boolean',
      default: true
    },
    arrowColor: {
      label: '箭头颜色',
      type: 'string',
      default: '#333'
    }
  }
}

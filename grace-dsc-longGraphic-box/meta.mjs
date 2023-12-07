export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '长图框',
  categories: ['布局'], 
  dependencies: ['grace-dsc-function-loading'],
  slots: [{
    name: 'loading',
    data: 'ifCurrent'
  }],
  props: {
    bgImgSrc: {
      type: 'image',
      label: '背景图链接',
      default: ''
    },
    height: {
      type: 'string',
      label: '高度',
      default: 'auto'
    },
  }
}
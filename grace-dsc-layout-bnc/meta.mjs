export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '布局-BNC ',
  categories: ['布局'], 
  screenshot:'https://webapp.zhaopin.com/2022/shh/jsjct1130ZL21287/BNC.png',
  dependencies:['grace-dsc-content-copyright'],
  parent: [], 
  slotData: [],
  slots: [{
    name: 'banner',
    maxCount:1
  }, {
    name:'nav',
    maxCount:1
  }, {
      name:'content'
  }]
}

export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '布局-BCN',
  categories: ['布局'], 
  screenshot:'https://webapp.zhaopin.com/2022/shh/jsjct1130ZL21287/BCN.png',
  dependencies: ['grace-dsc-content-copyright'],
  parent: [], //只能放在跟上
  slotData: [],
  slots: [{
    name: 'banner',
    maxCount: 1
  }, {
    name: 'content',
  }, {
    name: 'nav',
    maxCount: 1
  }]
}

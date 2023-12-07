export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '特殊功能-新闻详情',
  categories: ['特殊功能'], 
  screenshot: 'https://webapp.zhaopin.com/2023/shh/marti0307ZL21287/news.png',
  props: { 
    newsCode: {
      label: ' 新闻编号',
      type: 'string',
      default: ''
    },
    isShowTitle: {
      label: ' 是否显示新闻标题',
      type: 'boolean',
      default: false
    }
  }
  
}
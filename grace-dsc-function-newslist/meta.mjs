export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '特殊功能-新闻列表',
  categories: ['特殊功能'], 
  screenshot: 'https://webapp.zhaopin.com/2023/shh/marti0307ZL21287/new_list.png',
  props: {
    newsType: {
      label: '新闻类型（用英文逗号分隔）',
      type: 'string',
      default: ''
    },
    newsCode: {
      label: '新闻编号（用英文逗号分隔）',
      type: 'string',
      default: ''
    },
    isOutUrl: {
      label: '详情是否跳转新路由',
      type: 'boolean',
      default: false
    },
    href: {
      label: '跳转路由地址',
      type: 'string',
      default: ''
    }
  }
 
}
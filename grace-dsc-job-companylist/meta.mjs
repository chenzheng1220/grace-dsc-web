export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '公司列表',
  categories: ['职位'], 
  screenshot: 'https://webapp.zhaopin.com/2023/shh/marti0307ZL21287/job_com.png',
  slots: [{
    name: 'default'
  }],
  props: {
    opslist: {
      type: 'string[]', // 类型为 array 时，并且可枚举时展示多选选择器
      label: '标签显示',
      default:['orgTypeName', 'orgSizeName', 'smallName'],
      options: [{
        name: '公司性质',
        value: 'orgTypeName'
      },{
        name: '公司规模',
        value: 'orgSizeName'
      },{
        name: '所属行业',
        value: 'smallName'
      }]
    },
    isOutUrl: {
      label: '详情是否跳转新路由',
      type: 'boolean',
      default: true
    },
    href: {
      label: ' 跳转路由地址',
      type: 'string',
      default: ''
    }
  }
}

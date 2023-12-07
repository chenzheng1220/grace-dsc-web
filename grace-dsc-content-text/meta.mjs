export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '内容-文本框',
  categories: ['内容'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/cont.a6504803.png',
  props: {
    text: {
      label: '文本',
      type: 'string',
      default:'',
      required: true
    }
  }
}

export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '布局-盒子',
  categories: ['布局'],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/box.fd1fe3ca.png',
  slots: [{
    name: 'default'
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

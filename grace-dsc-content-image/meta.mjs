export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '图片',
  categories: ['内容'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/images.b9fd90b5.png',
  dependencies: [],
  props: {
    imgSrc: {
      type: 'image',
      label: '链接',
      default: ''
    },
    marginTop: {
      type: 'number',
      label: '顶部距离',
      default: 0
    },
    width: {
      type: 'number',
      label: '图片宽度',
      default: 0
    },
    marginLeft: {
      type: 'number',
      label: '左侧距离',
      default: 0
    },
    marginRight: {
      type: 'number',
      label: '右侧距离',
      default: 0
    },
    marginBottom: {
      type: 'number',
      label: '底部距离',
      default: 0
    },
    link: {
      type: 'string',
      label: '跳转链接',
      default: ''
    },
    target: {
      label: '跳转方式',
      type: 'string',
      default: 'inner',
      options: [{
        name: '内部跳转',
        value: 'inner'
      }, {
        name: '外部跳转',
        value: 'outer'
      }]
    },
    opacity: {
      type: 'number',
      label: '透明度',
      default: 1
    }
  }
}
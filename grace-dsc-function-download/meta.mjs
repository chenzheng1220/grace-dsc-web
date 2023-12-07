export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '特殊功能-下载',
  categories: ['特殊功能'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/download.2485a9f6.png',
  dependencies: [],
  props: {
    downloadWord: {
      label: '下载文字',
      type: 'string',
      default: ''
    },
    downloadUrl: {
      label: '下载链接',
      type: 'string',
      default: '',
      required: true
    },
    fileName: {
      label: '文件名',
      type: 'string',
      default: ''
    }
  }
}
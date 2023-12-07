export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '视频组件',
  categories: ['内容'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/video.7a8a1a36.png',
  dependencies: [],
  props: {
    videoSrc: {
      label: "视频链接",
      type: "string",
      default: "",
    },
    image: {
      label: "封面图链接",
      type: "image",
      default: "",
    }
  }
}
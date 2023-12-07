export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '音乐组件',
  categories: ['特殊功能'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/music.58234c11.png',
  dependencies: [],
  props: {
    audioSrc: {
      label: "mp3链接地址",
      type: "string",
      default: "",
    },
    imageSrc: {
      label: "icon链接地址",
      type: "image",
      default: "",
    }
  }
}
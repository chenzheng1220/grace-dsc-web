export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '视频直播',
  categories: ['内容'], 
  dependencies: [],
  props: {
    videoSrc: {
      label: "直播链接",
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
export default {
  type: "uni-app",
  author: "chenzheng.chen",
  description: "标题-单行标题",
  categories: ["标题"],
  dependencies: [],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/title.4505d0c1.png',
  props: {
    content: {
      label: "标题内容",
      type: "string",
      default: "",
      required: true
    },
    background: {
      label: "标题背景色",
      type: "string",
      default: "#ccc",
    },
    backgroundImage: {
      label: "标题背景图",
      type: "image",
      default: "",
    }
  },
};

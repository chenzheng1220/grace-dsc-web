export default {
  type: "uni-app",
  author: "chenzheng.chen",
  description: "标题-中英文标题",
  categories: ["标题"],
  dependencies: [],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/title_1.c2adaf15.png',
  props: {
    title_icon: {
      label: "标题小icon",
      type: "image",
      default: "",
    },
    title_icon_show: {
      label: "是否显示标题小icon",
      type: "boolean",
      default: false,
    },
    title_text_z: {
      label: "标题中文内容",
      type: "string",
      default: "",
      required: true
    },
    title_text_e: {
      label: "标题英文内容",
      type: "string",
      default: "",
      required: true
    },
    background: {
      label: "标题背景色",
      type: "string",
      default: "#fff",
    },
    bgImg: {
      label: "标题背景图",
      type: "image",
      default: "",
    },
    title_way: {
      label: "标题显示方式",
      type: "string",
      default: "left_right",
      options: [
        {
          name: "左右两端对齐",
          value: "left_right",
        },
        {
          name: "靠左对齐",
          value: "left_",
        },
        {
          name: "文字两行居中对齐",
          value: "center_",
        },
        {
          name: "文字叠加居中对齐",
          value: "overlap_",
        },
      ],
    }
  }
};

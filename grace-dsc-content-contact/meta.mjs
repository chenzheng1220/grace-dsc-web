export default {
  type: "uni-app",
  author: "chenzheng.chen",
  description: "内容-联系方式",
  categories: ["内容"],
  dependencies: [],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/contact.19e308a9.png',
  slots: [{
    name: '地图'
  }],
  props: {
    contacts: {
      type: "memberType[]",
      label: "联系方式内容",
      memberType: {
        contactImage: {
          label: "图标",
          type: "image",
          default: "",
          required: true,
        },
        contactCont: {
          label: "内容",
          type: "string",
          default: "",
          required: true,
        },
      },
    },
    erweimas: {
      type: "memberType[]",
      label: "二维码图片",
      memberType: {
        erweimasImage: {
          label: "图标",
          type: "image",
          default: "",
        },
      },
    },
  },
};

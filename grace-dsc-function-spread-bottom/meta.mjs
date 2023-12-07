export default {
  type: "uni-app",
  author: "chenzheng.chen",
  description: "特殊功能-点击下拉-下",
  categories: ["特殊功能"],
  dependencies: [],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/develop_bum.7906c18c.png',
  slots (props) {
    const count = props.unfold_bottom_data.length

    const newArr = Array.from({ length: count }, (_, i) => ({
      name: props.unfold_bottom_data[i].id
    }))
    return newArr
  },
  props: {
    maxHeight_cont: {
      label: "内容框未展开高度",
      type: "string",
      default: "125rpx",
    },
    transition_on: {
      label: "展开动画",
      type: "boolean",
      default: false,
    },
    unfold_bottom_data: {
      type: "memberType[]",
      label: "下拉框内容",
      memberType: {
        id: {
          label: "插槽id",
          type: "string",
          required: true
        }
      },
    },
  },
};

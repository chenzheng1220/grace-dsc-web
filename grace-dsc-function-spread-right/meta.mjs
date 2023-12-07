export default {
  type: "uni-app",
  author: "chenzheng.chen",
  description: "特殊功能-点击下拉-右",
  categories: ["特殊功能"],
  dependencies: [],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/develop_right.99699761.png',
  slots (props) {
    const count = props.spread_right_data.length

    const newArr = Array.from({ length: count }, (_, i) => ({
      name: props.spread_right_data[i].id
    }))
    return newArr
  },
  props: {
    transition_on: {
      label: "展开动画",
      type: "boolean",
      default: false,
    },
    spread_right_data: {
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

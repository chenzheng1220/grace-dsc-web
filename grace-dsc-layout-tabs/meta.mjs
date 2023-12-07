export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '布局-选项卡',
  categories: ['布局'],
  screenshot: 'https://webapp.zhaopin.com/2023/shh/marti0307ZL21287/tab.png',
  slots (props) {
    const count = props.tabs.length

    return Array.from({ length: count }, (_, i) => ({
      name: props.tabs[i].id
    }))
  },
  props: {
    tabType: {
      label: '选项卡类型',
      type: 'string',
      default: 'all',
      options: [
        {
          name: '全部展示',
          value: 'title'
        },
        {
          name: '滚动展示',
          value: 'scroll'
        },
        {
          name: '弹窗展示',
          value: 'dailog'
        }
      ]
    },
    tabs: {
      label: '选项卡',
      type: 'memberType[]',
      memberType: {
        id: {
          label: '选项卡id',
          type: 'string',
          required: true
        },
        name: {
          label: '选项卡标题',
          type: 'string',
          required: true
        }
      },
      default: []
    },
    defaultTabId: {
      label: '默认选项卡id',
      type: 'string',
      required: false,
      default: ''
    }
  }
}

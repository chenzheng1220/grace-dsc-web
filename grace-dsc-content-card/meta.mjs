export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '内容-图片轮播',
  categories: ['内容'],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/swiper.3528805e.png',
  props: {
    imglist: {
      label: '轮播数据',
      type: 'memberType[]',
      memberType: {
        image: {
          label: '图片数据',
          type: 'image',
          required: true,
        },
        url: {
          label: '跳转链接',
          type: 'string'
        }
      },
      required: true
    },
    indicatorDots: {
      label: '是否展示面板指示点',
      type: 'boolean',
      default: false
    },
    indicatorColor: {
      label: '指示点颜色',
      type: 'color',
      default: 'rgba(0, 0, 0, .3)'
    },
    indicatorActiveColor: {
      label: '当前选中指示点颜色',
      type: 'color',
      default: '#000000'
    },
    autoplay: {
      label: '是否自动切换',
      type: 'boolean',
      default: true
    },
    current: {
      label: '当前所在滑块的 index',
      type: 'number',
      default: 0
    },
    interval: {
      label: '自动切换时间间隔',
      type: 'number',
      default: 5000
    },
    duration: {
      label: '滑动动画时长',
      type: 'number',
      default: 500
    },
    circular: {
      label: '是否循环衔接滑动',
      type: 'boolean',
      default: true
    },
    vertical: {
      label: '是否纵向滑动',
      type: 'boolean',
      default: false
    },
    previousMargin: {
      label: '前边距(可用于露出前一项的一小部分)',
      type: 'string',
      default: '145rpx'
    },
    nextMargin: {
      label: '后边距(可用于露出后一项的一小部分)',
      type: 'string',
      default: '145rpx'
    },
    displayMultipleItems: {
      label: '同时显示的滑块数量',
      type: 'number',
      default: 1
    },
    disableTouch: {
      label: '是否禁止用户touch操作',
      type: 'boolean',
      default: false
    },
    middleWidth: {
      label: '中间项的宽度',
      type: 'number',
      default: 630
    }
  }
}

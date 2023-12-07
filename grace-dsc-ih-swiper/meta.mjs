export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: 'ih5框架',
  categories: ['布局'], 
  dependencies: ['grace-dsc-function-loading'],
  slots (props) {
    const count = props.swiperList.length

    return Array.from({ length: count }, (_, i) => ({
      name: props.swiperList[i].id,
      data: 'ifCurrent',
    }))
  },
  props: {
    swiperList: {
      label: '轮播数据',
      type: 'memberType[]',
      memberType: {
        id: {
          label: '模块id',
          type: 'string',
          default: ''
        },
        bgImage: {
          label: '背景图',
          type: 'image',
          default: ''
        },
        disableTouch: {
          label: '是否禁止用户 touch 操作',
          type: 'boolean',
          default: false
        }
      }
    },
    autoplay: {
      label: '是否自动切换',
      type: 'boolean',
      default: false
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
      default: false
    },
    vertical: {
      label: '是否纵向滑动',
      type: 'boolean',
      default: true
    }
  }
}
export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '动画',
  categories: ['特殊功能'], 
  dependencies: [],
  slotData: ['ifCurrent'],
  slots: [{
    name: 'default'
  }],
  props: {
    isIh5: {
      label: '是否是翻页h5',
      type: 'boolean',
      default: true
    },
    domName: {
      label: '元素名称',
      type: 'string',
      default: ''
    },
    position: {
      label: '定位',
      type: 'string',
      default: 'absolute',
      options: [{
        name: 'absolute',
        value: 'absolute'
      }, {
        name: 'relative',
        value: 'relative'
      }]
    },
    top: {
      label: '顶部距离',
      type: 'string',
      default: 'auto'
    },
    bottom: {
      label: '底部距离',
      type: 'string',
      default: 'auto'
    },
    left: {
      label: '左侧距离',
      type: 'string',
      default: 'auto'
    },
    right: {
      label: '右侧距离',
      type: 'string',
      default: 'auto'
    },
    animation: {
      label: '动画数据',
      type: 'memberType[]',
      memberType: {
        mode: {
          label: '效果模式',
          type: 'string',
          default: 'fadeIn',
          options: [{
            name: '放大缩小',
            value: 'pulse'
          },{
            name: '心跳',
            value: 'heartBeat'
          },{
            name: '果冻',
            value: 'jello'
          },{
            name: '摇晃',
            value: 'wobble'
          }, {
            name: '淡入',
            value: 'fadeIn'
          }, {
            name: '上滑淡入',
            value: 'fadeInUp'
          }, {
            name: '下滑淡入',
            value: 'fadeInDown'
          }, {
            name: '左滑淡入',
            value: 'fadeInLeft'
          }, {
            name: '右滑淡入',
            value: 'fadeInRight'
          }, {
            name: '左上角淡入',
            value: 'fadeInTopLeft'
          }, {
            name: '右上角淡入',
            value: 'fadeInTopRight'
          }, {
            name: '左下角淡入',
            value: 'fadeInBottomLeft'
          }, {
            name: '右下角淡入',
            value: 'fadeInBottomRight'
          },{
            name: 'X轴翻转',
            value: 'flipInX'
          },{
            name: 'Y轴翻转',
            value: 'flipInY'
          },{
            name: '中心旋转',
            value: 'rotateIn'
          },{
            name: '从小放大',
            value: 'zoomIn'
          }]
        },
        duration: {
          label: '动画的执行时间(单位ms)',
          type: 'number',
          default: 1000
        },
        animationDelay: {
          label: '动画的延迟时间(单位ms)',
          type: 'number',
          default: 0
        },
        timingFunction: {
          label: '动画过渡函数',
          type: 'string',
          default: 'linear',
          options: [{
            name: 'ease',
            value: 'ease'
          }, {
            name: 'ease-in',
            value: 'ease-in'
          }, {
            name: 'ease-in-out',
            value: 'ease-in-out'
          }, {
            name: 'linear',
            value: 'linear'
          }, {
            name: 'step-start',
            value: 'step-start'
          }, {
            name: 'step-end',
            value: 'step-end'
          }]
        },
        delay: {
          label: '动画的执行次数',
          type: 'string',
          default: 1
        }
      }
    },
    offset: {
      label: '距离可视区域多少开始执行动画',
      type: 'number',
      default: 0
    },
    zIndex: {
      label: '当前层级',
      type: 'number',
      default: 1
    },
    isSwiperBtn: {
      label: '是否需要识别或点击',
      type: 'boolean',
      default: false
    },
    swiperBtn: {
      label: '进入上一页/下一页',
      type: 'string',
      default: '',
      options: [{
        label: '下一页',
        value: "next"
      }, {
        label: '上一页',
        value: "prev"
      }]
    }
  }
}
export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: 'ih5文字组件',
  categories: ['内容'], 
  dependencies: [],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/cont.a6504803.png',
  props: {
    textList: {
      type: 'memberType[]',
      label: '数据',
      memberType: {
        text: {
          label: '文本',
          type: 'string',
          required: ''
        },
        fontColor: {
          label: '字体颜色',
          type: 'string',
          required: ''
        },
        fontBold: {
          label: '是否加粗',
          type: 'boolean',
          required: false
        },
        fontSize: {
          label: '字体大小',
          type: 'number'
        },
        fontAlign: {
          label: '对齐方式',
          type: 'string',
          required: ''
        },
        fontStyle: {
          label: '字体样式',
          type: 'string',
          required: 'normal'
        },
        fontIndent: {
          label: '首行缩进字符',
          type: 'number',
          required: 0
        },
        fontLineHeight: {
          label: '字体行高',
          type: 'number'
        },
        opacity: {
          label: '透明度',
          type: 'number',
          required: 1
        }
      }
    }
  }
}